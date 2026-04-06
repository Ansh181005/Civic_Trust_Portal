"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { GraduationCap, ShoppingCart, Monitor, HardHat, ShieldCheck } from "lucide-react"
import { getRights } from "@/services/rights.service"
import type { Right } from "@/types/database"

const categories = [
  { key: "all", label: "All Rights", icon: null },
  { key: "student", label: "Student Rights", icon: GraduationCap },
  { key: "consumer", label: "Consumer Law", icon: ShoppingCart },
  { key: "cyber", label: "Cyber Law", icon: Monitor },
  { key: "labour", label: "Labour Law", icon: HardHat },
  { key: "women", label: "Women Safety", icon: ShieldCheck },
]

export default function RightsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedRight, setSelectedRight] = useState<Right | null>(null)
  const [rights, setRights] = useState<Right[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getRights(activeCategory !== "all" ? activeCategory : undefined)
      .then(setRights)
      .catch(() => setRights([]))
      .finally(() => setLoaded(true))
  }, [activeCategory])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Know Your Rights</h1>
        <p className="mt-1 text-muted-foreground">
          Understand your legal rights across different categories.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={activeCategory === cat.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.key)}
            className="gap-1.5"
          >
            {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rights.map((right) => (
          <Card key={right.id} className="border border-border bg-card">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] capitalize">
                  {right.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground">{right.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{right.summary}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => setSelectedRight(right)}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {loaded && rights.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No rights found. Make sure you have run the SQL migrations in Supabase.</p>
        </div>
      )}

      <Dialog open={!!selectedRight} onOpenChange={() => setSelectedRight(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedRight?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedRight?.category && (
                <Badge variant="secondary" className="mb-3 mt-1 capitalize text-[10px]">
                  {selectedRight.category}
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-foreground">{selectedRight?.details}</p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
