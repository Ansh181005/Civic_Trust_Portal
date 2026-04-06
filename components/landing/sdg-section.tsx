import { Globe, Scale, Shield, Users } from "lucide-react"

const pillars = [
  { icon: Scale, label: "Justice for All" },
  { icon: Shield, label: "Strong Institutions" },
  { icon: Users, label: "Inclusive Societies" },
  { icon: Globe, label: "Accountable Governance" },
]

export function SdgSection() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground/80">
            Aligned with UN SDG-16
          </span>
          <h2 className="text-balance text-3xl font-bold text-primary-foreground">
            Peace, Justice & Strong Institutions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/70">
            Civic Trust Portal is designed to promote transparent, effective, and
            accountable institutions at all levels, aligning with the United Nations
            Sustainable Development Goal 16.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center"
            >
              <pillar.icon className="h-6 w-6 text-primary-foreground/80" />
              <span className="text-sm font-medium text-primary-foreground">{pillar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
