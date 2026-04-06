/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")
const vm = require("vm")
const { createClient } = require("@supabase/supabase-js")

function loadDotEnvIfPresent(repoRoot) {
  const envPaths = [".env.local", ".env"]
  let content = null
  for (const p of envPaths) {
    const candidate = path.join(repoRoot, p)
    if (!fs.existsSync(candidate)) continue
    content = fs.readFileSync(candidate, "utf8")
    break
  }
  if (!content) return

  const lines = content.split(/\r?\n/g)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    let value = trimmed.slice(eqIdx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

function extractExportArray(tsContent, exportConstName) {
  const marker = `export const ${exportConstName}`
  const startIdx = tsContent.indexOf(marker)
  if (startIdx === -1) throw new Error(`Could not find ${marker}`)

  const eqIdx = tsContent.indexOf("=", startIdx)
  if (eqIdx === -1) throw new Error(`Could not find '=' for ${exportConstName}`)

  const firstBracketIdx = tsContent.indexOf("[", eqIdx)
  if (firstBracketIdx === -1) throw new Error(`Could not find '[' for ${exportConstName}`)

  let depth = 0
  let inString = null // ", ', `
  let escaped = false

  for (let i = firstBracketIdx; i < tsContent.length; i++) {
    const ch = tsContent[i]
    if (inString) {
      if (escaped) {
        escaped = false
        continue
      }
      if (ch === "\\") {
        escaped = true
        continue
      }
      if (ch === inString) {
        inString = null
      }
      continue
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch
      continue
    }

    if (ch === "[") depth++
    if (ch === "]") {
      depth--
      if (depth === 0) {
        return tsContent.slice(firstBracketIdx, i + 1)
      }
    }
  }

  throw new Error(`Could not extract array literal for ${exportConstName}`)
}

function getArg(flag, defaultValue) {
  const idx = process.argv.indexOf(flag)
  if (idx === -1) return defaultValue
  return true
}

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function mapSchemeToRow(s) {
  // Your DB schema:
  // public.schemes (name, benefits, eligibility, category, beneficiary, state, how_to_apply, created_at)
  // Map dataset fields -> schema columns.
  return {
    name: s.name,
    benefits: s.benefit,
    eligibility: s.eligibility,
    category: s.badge || (Array.isArray(s.category) ? s.category[0] : "General"),
    beneficiary: s.ministry || "Citizen",
    state: "All India",
    how_to_apply: `Portal: ${s.portal}\nDocuments: ${s.documents}\nApply: ${s.applyLink}`,
  }
}

async function main() {
  const repoRoot = path.join(__dirname, "..")
  loadDotEnvIfPresent(repoRoot)

  const dryRun = getArg("--dry-run", false)
  const countOnly = getArg("--count-only", false)
  const chunkSize = Number(process.argv.includes("--chunk-size") ? process.argv[process.argv.indexOf("--chunk-size") + 1] : 100)

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) throw new Error("Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL).")
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in env.")

  const supabase = createClient(url, serviceRoleKey)

  if (countOnly) {
    const { data, count, error } = await supabase
      .from("schemes")
      .select("id", { count: "exact", head: true })
    if (error) throw error
    console.log(`schemes_count=${count ?? 0}`)
    return
  }

  const schemesPath = path.join(repoRoot, "app", "data", "governmentSchemes.ts")
  const tsContent = fs.readFileSync(schemesPath, "utf8")
  const arrayLiteral = extractExportArray(tsContent, "governmentSchemes")
  const schemes = vm.runInNewContext(arrayLiteral, {})

  if (!Array.isArray(schemes)) throw new Error("Parsed schemes is not an array")
  console.log(`Loaded government schemes: ${schemes.length}`)

  console.log("Fetching existing schemes (dedupe by name)...")
  const { data: existing, error: exErr } = await supabase
    .from("schemes")
    .select("name")

  if (exErr) throw exErr

  const existingNames = new Set((existing || []).map((r) => r.name))

  const mapped = schemes.map(mapSchemeToRow)
  const toInsert = mapped.filter((r) => !existingNames.has(r.name))

  console.log(`Schemes to insert: ${toInsert.length} (dryRun=${dryRun})`)
  if (toInsert.length === 0) {
    console.log("Nothing to insert.")
    return
  }

  if (dryRun) return

  const batches = chunkArray(toInsert, chunkSize)
  for (const [i, batch] of batches.entries()) {
    const res = await supabase.from("schemes").insert(batch)
    if (res.error) throw res.error
    console.log(`Inserted schemes batch ${i + 1}/${batches.length}`)
  }
}

main()
  .catch((err) => {
    console.error("Seed failed:", err)
    process.exit(1)
  })

