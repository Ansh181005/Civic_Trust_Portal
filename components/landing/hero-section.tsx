import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,58,95,0.04),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">Citizen-first digital platform</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            Empowering Citizens Through Transparency & Access
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Your one-stop platform for legal awareness, government schemes, scholarships,
            internships, jobs, and public accountability dashboards.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Explore Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/rights">
              <Button variant="outline" size="lg" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Know Your Rights
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "500+", label: "Government Schemes" },
            { value: "1,200+", label: "Scholarships" },
            { value: "10K+", label: "Job Listings" },
            { value: "50+", label: "Legal Resources" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary lg:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
