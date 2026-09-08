import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/jobs(.*)',
  '/scholarships(.*)',
  '/schemes(.*)',
  '/rights(.*)',
  '/notifications(.*)',
  '/profile(.*)',
  '/transparency(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // If it's a protected route and user is not signed in, redirect to sign-in
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

