"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Activity, Users, IndianRupee, Landmark } from "lucide-react"
import { getKPIs, getSchemeProgress, getDepartmentScores, getBudgetDistribution } from "@/services/transparency.service"
import type { TransparencyKPI, SchemeProgress, DepartmentScore } from "@/types/database"

const COLORS = ["#1E3A5F", "#2563eb", "#0891b2", "#059669", "#d97706"]

const iconMap: Record<string, typeof Activity> = {
  Landmark,
  Users,
  IndianRupee,
  Activity,
}

const beneficiaryTrendData = [
  { month: "Jul", beneficiaries: 42 },
  { month: "Aug", beneficiaries: 48 },
  { month: "Sep", beneficiaries: 55 },
  { month: "Oct", beneficiaries: 52 },
  { month: "Nov", beneficiaries: 61 },
  { month: "Dec", beneficiaries: 68 },
  { month: "Jan", beneficiaries: 74 },
  { month: "Feb", beneficiaries: 79 },
]

export default function TransparencyPage() {
  const [kpis, setKpis] = useState<TransparencyKPI[]>([])
  const [schemeProgress, setSchemeProgress] = useState<SchemeProgress[]>([])
  const [departmentScores, setDepartmentScores] = useState<DepartmentScore[]>([])
  const [budgetData, setBudgetData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    getKPIs().then(setKpis).catch(() => {})
    getSchemeProgress().then(setSchemeProgress).catch(() => {})
    getDepartmentScores().then(setDepartmentScores).catch(() => {})
    getBudgetDistribution().then(setBudgetData).catch(() => {})
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transparency Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Track scheme progress, beneficiary metrics, and department performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon_name] || Activity
          return (
            <Card key={kpi.id} className="border border-border bg-card">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Scheme Progress Bar Chart */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Scheme Progress (in Lakhs)</CardTitle>
            <CardDescription>Target vs achieved beneficiaries by scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {schemeProgress.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={schemeProgress.map((s) => ({ name: s.scheme_name, target: Number(s.target), achieved: Number(s.achieved) }))} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="target" fill="#1E3A5F" name="Target" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="achieved" fill="#2563eb" name="Achieved" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading chart data...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Beneficiary Trend Line Chart */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Beneficiary Growth Trend</CardTitle>
            <CardDescription>Monthly new beneficiaries (in Lakhs)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={beneficiaryTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="beneficiaries" stroke="#1E3A5F" strokeWidth={2} dot={{ fill: "#1E3A5F", r: 4 }} name="New Beneficiaries" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Distribution Pie Chart */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Budget Distribution by Department</CardTitle>
            <CardDescription>Share of total budget allocation (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {budgetData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={budgetData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                      {budgetData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading chart data...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Department Performance Scores</CardTitle>
            <CardDescription>Efficiency ratings based on Q4 2025 data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {departmentScores.length > 0 ? departmentScores.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="w-32 text-sm text-foreground">{item.department}</span>
                  <div className="flex-1">
                    <div className="h-2.5 w-full rounded-full bg-muted">
                      <div className="h-2.5 rounded-full bg-primary transition-all" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-foreground">{Number(item.score)}%</span>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">Loading scores...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
