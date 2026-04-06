import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold text-foreground">Civic Trust</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Empowering citizens through transparency, legal awareness, and access to opportunities.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/rights" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Know Your Rights</Link>
              <Link href="/scholarships" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Scholarships</Link>
              <Link href="/jobs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Jobs & Internships</Link>
              <Link href="/schemes" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Government Schemes</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/transparency" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Transparency Dashboard</Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">SDG-16 Initiative</Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact Us</Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            2026 Civic Trust Portal. Built for citizens, by citizens.
          </p>
        </div>
      </div>
    </footer>
  )
}
