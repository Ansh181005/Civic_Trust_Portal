import { UserPlus, Search, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description: "Sign up in seconds and personalize your profile with your state, category, and interests.",
  },
  {
    icon: Search,
    step: "02",
    title: "Explore Opportunities",
    description: "Browse scholarships, jobs, schemes, and legal resources all filtered to match your eligibility.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Apply & Stay Informed",
    description: "Apply directly through our platform and get notified of new opportunities and deadlines.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Get started in three simple steps.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Step {step.step}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
