"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
} from "recharts";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Avg Performance Score", value: 87, delta: "+3.5%", trend: "up" },
  { label: "Goal Completion", value: 74, delta: "-1.2%", trend: "down" },
  { label: "High Performers", value: 24, delta: "+2", trend: "up" },
  { label: "Low Performers", value: 5, delta: "-1", trend: "down" },
];

const perfTrend = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 78 },
  { month: "May", value: 83 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 85 },
  { month: "Aug", value: 87 },
];

const goalsProgress = [
  { name: "Q1", progress: 68 },
  { name: "Q2", progress: 75 },
  { name: "Q3", progress: 82 },
  { name: "Q4", progress: 50 },
];

const teamPerformance = [
  { avatar: "A", name: "Alice Johnson", role: "PM", score: 93, trend: "up", grade: "Excellent", goals: 88 },
  { avatar: "B", name: "Bob Lee", role: "Developer", score: 85, trend: "up", grade: "Good", goals: 74 },
  { avatar: "C", name: "Carla Diaz", role: "Designer", score: 70, trend: "down", grade: "Needs Improvement", goals: 60 },
  { avatar: "D", name: "David Kim", role: "HR Lead", score: 80, trend: "up", grade: "Good", goals: 69 },
];

const gradeStyles: Record<string, string> = {
  Excellent: "bg-green-600 text-white",
  Good: "bg-blue-600 text-white",
  "Needs Improvement": "bg-amber-500 text-black",
};

function ThemedTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-popover px-3 py-2 border border-border text-popover-foreground text-xs">
      <div className="font-mono text-muted-foreground">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">{m.label}</CardTitle>
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-mono",
                  m.trend === "up" ? "text-green-400" : "text-red-400"
                )}
              >
                {m.delta}
                {m.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={perfTrend}>
                <defs>
                  <linearGradient id="perfArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-area-2)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--chart-area-2)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <ReTooltip content={<ThemedTooltip />} />
                <Area dataKey="value" stroke="var(--chart-line-2)" fill="url(#perfArea)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Goals Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={goalsProgress}>
                <defs>
                  <linearGradient id="goalBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-bar)" />
                    <stop offset="100%" stopColor="var(--chart-bar-accent)" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <ReTooltip content={<ThemedTooltip />} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="progress" fill="url(#goalBar)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Performance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {teamPerformance.map((t) => (
            <div
              key={t.name}
              className="flex flex-col md:flex-row md:items-center gap-3 border border-border rounded-md p-3 hover:bg-muted/50"
            >
              <div className="flex items-center gap-2 w-full md:w-64">
                <Avatar>
                  <AvatarFallback>{t.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-32">
                <span className="text-xs text-muted-foreground">Score:</span>
                <span className="font-mono text-sm">{t.score}</span>
                {t.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="w-full md:w-36">
                <Badge className={cn("text-xs", gradeStyles[t.grade])}>{t.grade}</Badge>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Goals</span>
                  <span>{t.goals}%</span>
                </div>
                <Progress value={t.goals} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}