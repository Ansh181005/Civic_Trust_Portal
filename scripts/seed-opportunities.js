/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")
const vm = require("vm")
const { createClient } = require("@supabase/supabase-js")

function loadDotEnvLocalIfPresent(repoRoot) {
  const envPaths = [".env.local", ".env"]

  let content = null
  let envPathUsed = null
  for (const p of envPaths) {
    const candidate = path.join(repoRoot, p)
    if (fs.existsSync(candidate)) {
      envPathUsed = candidate
      content = fs.readFileSync(candidate, "utf8")
      break
    }
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

    // Strip surrounding quotes: KEY="value"
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) process.env[key] = value
  }
}

function getArg(name, defaultValue) {
  const idx = process.argv.indexOf(name)
  if (idx === -1) return defaultValue
  const next = process.argv[idx + 1]
  if (!next || next.startsWith("--")) return true
  return next
}

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function assertNonEmpty(value, label) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`Missing required value for ${label}`)
  }
  return value
}

function extractScholarshipsArrayFromTS(tsContent) {
  // We only need the exported array literal. The file also contains an interface above.
  const re = /export const scholarships[\s\S]*?=\s*(\[[\s\S]*?\]);/m
  const m = tsContent.match(re)
  if (!m?.[1]) throw new Error("Could not extract scholarships array literal from scholarships.ts")
  return m[1] // string like: [ { ... }, { ... } ]
}

function mapScholarshipToRow(s) {
  const categoryTags = Array.isArray(s.category) ? s.category : []
  const primaryCategory = categoryTags[0] || "General"

  // Your DB doesn't currently store description/amount/status/applyLink separately.
  // We pack amount + description into `benefits` so you don't lose it.
  const benefits = [s.amount, s.description].filter(Boolean).join("\n")

  return {
    title: assertNonEmpty(s.name, "scholarship.name"),
    provider: assertNonEmpty(s.provider, "scholarship.provider"),
    benefits: assertNonEmpty(benefits, "scholarship.benefits"),
    eligibility: assertNonEmpty(s.eligibility, "scholarship.eligibility"),
    category: assertNonEmpty(primaryCategory, "scholarship.category"),
    state: "All India",
    deadline: assertNonEmpty(s.deadline, "scholarship.deadline"),
  }
}

function mapJobToRow(j) {
  const rawTitle = String(j.title || "").trim()
  const rawCompany = String(j.organization || "").trim()
  const rawDescription = String(j.description_text || "")

  const employmentType0 = Array.isArray(j.employment_type)
    ? j.employment_type[0]
    : j.employment_type

  const jobType = employmentType0
    ? String(employmentType0)
        .replaceAll("_", " ")
        .replace(/\s+/g, " ")
        .trim()
    : "FULL TIME"

  const titleLower = rawTitle.toLowerCase()
  const jobTypeLower = jobType.toLowerCase()
  const isIntern = titleLower.includes("intern") || jobTypeLower.includes("intern")

  const location = Array.isArray(j.locations_derived) && j.locations_derived[0]
    ? String(j.locations_derived[0]).trim()
    : "Remote"

  const salary = j.salary_raw ? String(j.salary_raw).trim() : "Not Disclosed"
  const source = j.source_domain ? String(j.source_domain).trim() : "linkedin.com"
  const snippet = (rawDescription.trim().slice(0, 180) || rawTitle || "No description available") + "..."

  return {
    type: isIntern ? "internship" : "job",
    title: assertNonEmpty(rawTitle || "Untitled role", "job.title"),
    company: assertNonEmpty(rawCompany || "Company", "job.organization"),
    location: assertNonEmpty(location, "job.location"),
    salary: assertNonEmpty(salary, "job.salary"),
    job_type: assertNonEmpty(jobType, "job.job_type"),
    source: assertNonEmpty(source, "job.source"),
    snippet: assertNonEmpty(snippet, "job.snippet"),
  }
}

async function main() {
  const repoRoot = path.join(__dirname, "..")
  loadDotEnvLocalIfPresent(repoRoot)

  const resetScholarships = Boolean(getArg("--reset-scholarships", false))
  const resetJobs = Boolean(getArg("--reset-jobs", false))
  const dryRun = Boolean(getArg("--dry-run", false))
  const chunkSize = Number(getArg("--chunk-size", 200))

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error("Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL).")
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in env.")

  const supabase = createClient(url, serviceRoleKey)

  const scholarshipsPath = path.join(__dirname, "..", "app", "data", "scholarships.ts")
  const jobsPath = path.join(__dirname, "..", "app", "data", "jobs.json")

  console.log("Reading datasets...")
  const scholarshipsTS = fs.readFileSync(scholarshipsPath, "utf8")
  const scholarshipsArrayLiteral = extractScholarshipsArrayFromTS(scholarshipsTS)
  const scholarships = vm.runInNewContext(scholarshipsArrayLiteral, {})

  const jobsJson = fs.readFileSync(jobsPath, "utf8")
  const localJobs = JSON.parse(jobsJson)

  console.log(`Loaded scholarships: ${scholarships.length}`)
  console.log(`Loaded jobs: ${localJobs.length}`)

  // ----------------------------
  // Scholarships
  // ----------------------------
  if (resetScholarships) {
    console.log("Resetting public.scholarships (DELETE ALL)...")
    if (!dryRun) await supabase.from("scholarships").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  }

  console.log("Fetching existing scholarships for dedupe...")
  const { data: existingSchols, error: schErr } = await supabase
    .from("scholarships")
    .select("title,provider,deadline,category")

  if (schErr) throw schErr

  const existingScholKeys = new Set(
    (existingSchols || []).map((r) => `${r.title}|${r.provider}|${r.deadline}|${r.category}`)
  )

  const mappedSchols = scholarships.map(mapScholarshipToRow)

  const toInsertSchols = mappedSchols.filter((r) => {
    const key = `${r.title}|${r.provider}|${r.deadline}|${r.category}`
    return !existingScholKeys.has(key)
  })

  console.log(`Scholarships to insert: ${toInsertSchols.length}`)

  if (!dryRun) {
    for (const [i, batch] of chunkArray(toInsertSchols, chunkSize).entries()) {
      const res = await supabase.from("scholarships").insert(batch)
      if (res.error) throw res.error
      console.log(`Inserted scholarships batch ${i + 1}/${Math.ceil(toInsertSchols.length / chunkSize)}`)
    }
  }

  // ----------------------------
  // Jobs
  // ----------------------------
  if (resetJobs) {
    console.log("Resetting public.jobs (DELETE ALL)...")
    if (!dryRun) await supabase.from("jobs").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  }

  console.log("Fetching existing jobs for dedupe...")
  const { data: existingJobs, error: jobErr } = await supabase
    .from("jobs")
    .select("type,title,company,job_type,source")

  if (jobErr) throw jobErr

  const existingJobKeys = new Set(
    (existingJobs || []).map((r) => `${r.type}|${r.title}|${r.company}|${r.job_type}|${r.source}`)
  )

  const mappedJobs = localJobs.map(mapJobToRow)
  const toInsertJobs = mappedJobs.filter((r) => {
    const key = `${r.type}|${r.title}|${r.company}|${r.job_type}|${r.source}`
    return !existingJobKeys.has(key)
  })

  console.log(`Jobs to insert: ${toInsertJobs.length}`)

  if (!dryRun) {
    const batches = chunkArray(toInsertJobs, chunkSize)
    for (const [i, batch] of batches.entries()) {
      const res = await supabase.from("jobs").insert(batch)
      if (res.error) throw res.error
      console.log(`Inserted jobs batch ${i + 1}/${batches.length}`)

      // Small delay to avoid rate limiting (especially when jobs.json is large)
      await new Promise((r) => setTimeout(r, 250))
    }
  }

  console.log("Seeding complete.")
}

main().catch((err) => {
  console.error("Seeding failed:", err)
  process.exit(1)
})

