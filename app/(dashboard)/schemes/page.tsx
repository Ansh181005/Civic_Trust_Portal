"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink } from "lucide-react"
import { governmentSchemes } from "@/app/data/governmentSchemes"

const categoryFilters = [
  "All",
  "Housing",
  "Healthcare",
  "Education",
  "Farmers",
  "Women & Girls",
  "Finance & Banking",
  "Employment & Skills",
  "Business & MSME",
  "Social Security",
  "Digital India",
  "Environment & Energy",
]

export default function SchemesPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = [...governmentSchemes]

    if (activeCategory !== "All") {
      list = list.filter((s) => s.category.includes(activeCategory))
    }

    if (q) {
      list = list.filter((s) => {
        const haystack = [
          s.name,
          s.ministry,
          s.description,
          s.benefit,
          s.eligibility,
          s.badge,
        ]
        return haystack.some((t) => t.toLowerCase().includes(q))
      })
    }

    return list
  }, [search, activeCategory])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Government Schemes</h1>
        <p className="mt-1 text-muted-foreground">
          Discover central and state government schemes you are eligible for.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search schemes by name, benefit, or ministry..."
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
          Showing{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          <span className="font-semibold text-foreground">{governmentSchemes.length}</span>{" "}
          Schemes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Card
            key={s.id}
            className="border border-border bg-card hover:bg-muted/50 transition-all hover:shadow-md animate-in fade-in-0 zoom-in-95"
          >
            <CardContent className="flex flex-col justify-between h-full gap-3 p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-foreground leading-tight">{s.name}</h3>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      variant="default"
                      className="text-[10px] bg-[#1e293b] hover:bg-[#1e293b] text-white capitalize whitespace-nowrap"
                    >
                      {s.badge}
                    </Badge>
                    {s.isNew && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] whitespace-nowrap">
                        🆕 NEW 2026
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                  <span>🏛️</span> {s.ministry}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {s.description}
                </p>

                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-1">
                  <span className="flex items-start gap-1.5">
                    ✅{" "}
                    <span className="font-medium text-foreground shrink-0">
                      Who can apply:
                    </span>{" "}
                    <span className="line-clamp-2">{s.eligibility}</span>
                  </span>
                  <span className="flex items-start gap-1.5">
                    💰{" "}
                    <span className="font-medium text-foreground shrink-0">
                      Benefit:
                    </span>{" "}
                    <span className="line-clamp-2">{s.benefit}</span>
                  </span>
                  <span className="flex items-start gap-1.5">
                    📋{" "}
                    <span className="font-medium text-foreground shrink-0">
                      Documents Required:
                    </span>{" "}
                    <span className="line-clamp-2">{s.documents}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between mt-4">
                <Badge variant="outline" className="text-[10px] bg-background">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  {s.portal}
                </Badge>

                <Button size="sm" asChild className="shrink-0 font-medium">
                  <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                    Learn More →
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-8 text-center col-span-full">
            <p className="text-muted-foreground">No schemes found matching your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
