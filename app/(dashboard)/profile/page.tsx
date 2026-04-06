"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { User, Bookmark, Loader2, Camera, Trash2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { updateProfile, uploadAvatar } from "@/services/profile.service"
import { getSavedOpportunities, removeSavedOpportunity } from "@/services/saved-opportunities.service"
import type { SavedOpportunity } from "@/types/database"

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [savedItems, setSavedItems] = useState<SavedOpportunity[]>([])
  const [success, setSuccess] = useState(false)

  // Form state
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("")
  const [category, setCategory] = useState("")
  const [dob, setDob] = useState("")
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [scholarshipAlerts, setScholarshipAlerts] = useState(true)
  const [jobAlerts, setJobAlerts] = useState(true)
  const [schemeAlerts, setSchemeAlerts] = useState(true)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setEmail(profile.email || "")
      setPhone(profile.phone || "")
      setState(profile.state || "")
      setCategory(profile.category || "")
      setDob(profile.date_of_birth || "")
      setEmailNotifs(profile.email_notifications)
      setScholarshipAlerts(profile.scholarship_alerts)
      setJobAlerts(profile.job_alerts)
      setSchemeAlerts(profile.scheme_alerts ?? true)
    }
  }, [profile])

  useEffect(() => {
    if (!user) return
    getSavedOpportunities(user.id).then(setSavedItems).catch(() => {})
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setSuccess(false)
    try {
      await updateProfile(user.id, {
        full_name: fullName,
        email,
        phone,
        state,
        category,
        date_of_birth: dob || null,
        email_notifications: emailNotifs,
        scholarship_alerts: scholarshipAlerts,
        job_alerts: jobAlerts,
        scheme_alerts: schemeAlerts,
      })
      await refreshProfile()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to update profile:", err)
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return
    try {
      await uploadAvatar(user.id, e.target.files[0])
      await refreshProfile()
    } catch (err) {
      console.error("Failed to upload avatar:", err)
    }
  }

  const handleRemoveSaved = async (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id))
    removeSavedOpportunity(id).catch(() => {})
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {success && (
        <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-700">
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-7 w-7 text-primary-foreground" />
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-card border border-border shadow-sm hover:bg-accent"
                >
                  <Camera className="h-3 w-3" />
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{fullName || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
            </div>

            <Button className="mt-6" onClick={handleSave} disabled={saving}>
              {saving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Email Notifications</span>
                  <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Scholarship Alerts</span>
                  <Switch checked={scholarshipAlerts} onCheckedChange={setScholarshipAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Job Alerts</span>
                  <Switch checked={jobAlerts} onCheckedChange={setJobAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Scheme Alerts</span>
                  <Switch checked={schemeAlerts} onCheckedChange={setSchemeAlerts} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Bookmark className="h-4 w-4" />
                Saved Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedItems.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Badge variant="outline" className="shrink-0 text-[10px]">{item.opportunity_type}</Badge>
                      <span className="flex-1 truncate text-sm text-foreground">{item.title}</span>
                      <button onClick={() => handleRemoveSaved(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No saved opportunities yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
