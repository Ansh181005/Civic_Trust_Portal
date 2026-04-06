import { Scale, GraduationCap, Briefcase, Landmark, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    icon: Scale,
    title: "Legal Rights",
    description: "Understand your fundamental rights across consumer, cyber, labour, and student laws.",
    href: "/rights",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    description: "Discover scholarships from government and private institutions filtered by eligibility.",
    href: "/scholarships",
  },
  {
    icon: Briefcase,
    title: "Internships & Jobs",
    description: "Browse curated job and internship listings from verified sources nationwide.",
    href: "/jobs",
  },
  {
    icon: Landmark,
    title: "Government Schemes",
    description: "Access a comprehensive directory of schemes with eligibility and application guides.",
    href: "/schemes",
  },
  {
    icon: BarChart3,
    title: "Transparency Dashboard",
    description: "Track scheme progress, budget utilization, and department performance metrics.",
    href: "/transparency",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground">
            Everything You Need, In One Place
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Access critical civic resources designed to empower every citizen.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="group h-full border border-border bg-card transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
