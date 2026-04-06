import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import { Chatbot } from '@/components/chatbot'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Civic Trust Portal - Empowering Citizens Through Transparency & Access',
  description: 'A citizen-first digital platform for legal awareness, government schemes, scholarships, internships, jobs, and transparency dashboards.',
}

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Chatbot />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
