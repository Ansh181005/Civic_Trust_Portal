"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield, Eye, EyeOff, Loader2, Mail, KeyRound, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regState, setRegState] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // OTP states
  const [otpMode, setOtpMode] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpCooldown, setOtpCooldown] = useState(0)

  const { signInWithPassword, signInWithOtp, verifyOtp, signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signInWithPassword(loginEmail, loginPassword)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      router.push(redirectTo)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCooldown > 0) return
    setError(null)
    setLoading(true)
    const { error } = await signInWithOtp(otpEmail)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      setOtpSent(true)
      setSuccess("A code has been sent to your email. Check your inbox!")
      setLoading(false)

      // Start cooldown that matches Supabase "minimum interval per user"
      setOtpCooldown(60)
      const timer = setInterval(() => {
        setOtpCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    const { error } = await verifyOtp(otpEmail, otpCode)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      router.push(redirectTo)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signUp(regEmail, regPassword, {
      full_name: regName,
      state: regState,
    })
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      setSuccess("Account created! You are now signed in.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Civic Trust</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Access your civic dashboard</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
            {success}
          </div>
        )}

        <Card className="border border-border bg-card">
          <CardHeader className="pb-0">
            {/* OTP Mode */}
            {otpMode ? (
              <div className="space-y-4 pb-4">
                <button
                  onClick={() => { setOtpMode(false); setOtpSent(false); setOtpCode(""); setError(null); setSuccess(null) }}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to login
                </button>

                {!otpSent ? (
                  <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">Sign in with Email OTP</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {"We'll send a login code to your email address"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="otp-email">Email Address</Label>
                      <Input
                        id="otp-email"
                        type="email"
                        placeholder="you@example.com"
                        value={otpEmail}
                        onChange={(e) => setOtpEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button className="w-full" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending code...
                        </>
                      ) : otpCooldown > 0 ? (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          {`Resend in ${otpCooldown}s`}
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Send OTP Code
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <KeyRound className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">Enter Verification Code</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Enter the verification code sent to <span className="font-medium text-foreground">{otpEmail}</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="otp-code">Verification Code</Label>
                      <Input
                        id="otp-code"
                        type="text"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        maxLength={8}
                        className="text-center text-lg tracking-widest"
                        required
                      />
                    </div>
                    <Button className="w-full" type="submit" disabled={loading || otpCode.length < 6}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </Button>
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtpCode(""); setError(null); setSuccess(null) }}
                      className="text-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      {"Didn't receive the code? Send again"}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Normal Login/Register Tabs */
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="login" className="flex-1">Log In</TabsTrigger>
                  <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <CardContent className="px-0 pt-6">
                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                        </div>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Log In"
                        )}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => { setOtpMode(true); setError(null); setSuccess(null) }}
                    >
                      <Mail className="h-4 w-4" />
                      Sign in with Email OTP
                    </Button>
                  </CardContent>
                </TabsContent>

                <TabsContent value="register">
                  <CardContent className="px-0 pt-6">
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="reg-name">Full Name</Label>
                        <Input
                          id="reg-name"
                          placeholder="Your full name"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="you@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="reg-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password (min 6 chars)"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="reg-state">State</Label>
                        <Input
                          id="reg-state"
                          placeholder="Your state"
                          value={regState}
                          onChange={(e) => setRegState(e.target.value)}
                          required
                        />
                      </div>
                      <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => { setOtpMode(true); setError(null); setSuccess(null) }}
                    >
                      <Mail className="h-4 w-4" />
                      Quick signup with Email OTP
                    </Button>
                  </CardContent>
                </TabsContent>
              </Tabs>
            )}
          </CardHeader>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
          <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
