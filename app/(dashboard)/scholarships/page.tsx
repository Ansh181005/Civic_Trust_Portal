"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"
import { scholarships, type ScholarshipEntry } from "@/app/data/scholarships"

const categoryFilters = [
  "All", "Merit-based", "SC/ST", "OBC", "Women", "Government", "International", "Private"
]

function isClosingSoon(deadline: string): boolean {
  if (!deadline) return false
  const lower = deadline.toLowerCase()
  if (lower.includes("ongoing") || lower.includes("rolling") || lower.includes("varies") || lower.includes("admission") || lower.includes("multiple") || lower.includes("check") || lower.includes("closed")) return false
  const dl = new Date(deadline)
  if (isNaN(dl.getTime())) return false
  const now = new Date()
  const diff = dl.getTime() - now.getTime()
  return diff > 0 && diff <= 30 * 24 * 60 * 60 * 1000
}

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    let list = [...scholarships]

    if (activeCategory !== "All") {
      list = list.filter((s) => s.category.includes(activeCategory))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.provider.toLowerCase().includes(q) ||
          s.eligibility.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.some((c) => c.toLowerCase().includes(q))
      )
    }

    return list
  }, [search, activeCategory])

  const primaryCategory = (s: ScholarshipEntry) =>
    s.category.find((c) => ["Government", "International", "Private"].includes(c)) || s.category[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Scholarships</h1>
        <p className="mt-1 text-muted-foreground">
          Discover scholarships and financial aid matching your eligibility.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          <span className="font-semibold text-foreground">{scholarships.length}</span> Scholarships
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <Card key={s.id} className="border border-border bg-card hover:bg-muted/50 transition-all hover:shadow-md">
            <CardContent className="flex flex-col justify-between h-full gap-3 p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-foreground leading-tight">{s.name}</h3>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="default" className="text-[10px] capitalize whitespace-nowrap">
                      {primaryCategory(s)}
                    </Badge>
                    {s.status === "OPEN" && isClosingSoon(s.deadline) ? (
                      <Badge variant="destructive" className="text-[10px] whitespace-nowrap">
                        ⚠️ Closing Soon
                      </Badge>
                    ) : s.status === "OPEN" ? (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] whitespace-nowrap">
                        🟢 Apply Now
                      </Badge>
                    ) : s.status === "OPENING SOON" ? (
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] whitespace-nowrap">
                        🔵 Opens Soon
                      </Badge>
                    ) : s.status === "IN REVIEW" ? (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] whitespace-nowrap">
                        🔄 In Review
                      </Badge>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <span>🏛️</span> {s.provider}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{s.description}</p>
                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1.5">📅 <span className="font-medium text-foreground">Deadline:</span> {s.deadline}</span>
                  <span className="flex items-center gap-1.5">💰 <span className="font-medium text-foreground">Award:</span> {s.amount}</span>
                  <span className="flex items-start gap-1.5">✅ <span className="font-medium text-foreground shrink-0">Eligibility:</span> <span className="line-clamp-1">{s.eligibility}</span></span>
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <Badge variant="outline" className="text-[10px] bg-background">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  {new URL(s.applyLink).hostname.replace("www.", "")}
                </Badge>
                <Button size="sm" asChild className="shrink-0 font-medium">
                  <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No scholarships found matching your search or filter.</p>
        </div>
      )}
    </div>
  )
}
