"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Banknote, Building, ExternalLink } from "lucide-react"
import { getJobs } from "@/services/jobs.service"
import localJobsData from "@/app/data/jobs.json"
import type { Job } from "@/types/database"

// Map RapidAPI LinkedIn jobs to match the existing UI data structure
const mappedLocalJobs: Job[] = (localJobsData as any[]).map((j: any) => ({
  id: j.id || Math.random().toString(),
  title: j.title || "Unknown Title",
  job_type: j.employment_type?.[0]?.replace("_", " ") || "FULL TIME",
  type: (j.employment_type?.[0] || "").toLowerCase().includes("intern") || (j.title || "").toLowerCase().includes("intern") ? "internship" : "job",
  company: j.organization || "Company",
  snippet: j.description_text?.substring(0, 180) + "...",
  location: j.locations_derived?.[0] || j.locations_raw?.[0]?.address?.addressLocality || "Remote",
  salary: j.salary_raw || "Not Disclosed",
  source: j.source_domain || "linkedin.com",
  created_at: j.date_created || new Date().toISOString(),
  url: j.url || "#",
}))

export default function JobsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const applyFilters = (rawJobs: Job[]) => {
      let filtered = [...rawJobs]
      if (search) {
        filtered = filtered.filter((j) => 
          j.title.toLowerCase().includes(search.toLowerCase()) || 
          j.company.toLowerCase().includes(search.toLowerCase())
        )
      }
      if (tab !== "all") {
        filtered = filtered.filter((j) => j.type === tab)
      }
      return filtered
    }

    const debounce = setTimeout(() => {
      getJobs(search || undefined, tab !== "all" ? tab : undefined)
        .then((dbJobs) => {
          // Combine DB jobs with our newly fetched JSON jobs
          const combined = [...mappedLocalJobs, ...dbJobs]
          setJobs(applyFilters(combined))
        })
        .catch(() => {
          // Fallback to only JSON jobs if DB fails (filter them successfully!)
          setJobs(applyFilters(mappedLocalJobs))
        })
        .finally(() => setLoaded(true))
    }, 300)
    return () => clearTimeout(debounce)
  }, [search, tab])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jobs & Internships</h1>
        <p className="mt-1 text-muted-foreground">
          Browse curated opportunities from verified government and institutional sources, plus real-time postings.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or company..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobs.map((j) => (
              <Card key={j.id} className="border border-border bg-card hover:bg-muted/50 transition-colors">
                <CardContent className="flex flex-col justify-between h-full gap-3 p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-foreground leading-tight">{j.title}</h3>
                      <Badge
                        variant={j.type === "job" ? "default" : "secondary"}
                        className="shrink-0 text-[10px] capitalize whitespace-nowrap"
                      >
                        {j.job_type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Building className="h-4 w-4" />
                      {j.company}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{j.snippet}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {j.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Banknote className="h-4 w-4" /> {j.salary}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between mt-4">
                    <Badge variant="outline" className="text-[10px] bg-background">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      {j.source}
                    </Badge>
                    
                    <Button size="sm" asChild className="shrink-0 font-medium">
                      <a href={(j as any).url || "#"} target="_blank" rel="noopener noreferrer">
                        Apply
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loaded && jobs.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center mt-4">
              <p className="text-muted-foreground">No listings found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
