"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { cn, formatCurrency } from "@/lib/utils";
import { Plus, Filter, CalendarDays, Users } from "lucide-react";

const stats = [
  { label: "Total Projects", value: 54, delta: "+3" },
  { label: "Active Projects", value: 21, delta: "+1" },
  { label: "Completed", value: 28, delta: "+2" },
  { label: "On Hold", value: 5, delta: "-1" },
];

const projects = [
  {
    name: "Website Redesign",
    description: "Revamping corporate presence",
    status: "Active",
    priority: "High",
    progress: 68,
    due: "2025-09-10",
    spend: 42000,
    budget: 60000,
    team: ["A", "B", "C", "D"],
  },
  {
    name: "Mobile App MVP",
    description: "Initial MVP for iOS/Android",
    status: "On Hold",
    priority: "Medium",
    progress: 35,
    due: "2025-11-02",
    spend: 18000,
    budget: 50000,
    team: ["E", "F", "G"],
  },
  {
    name: "Data Migration",
    description: "Legacy system to cloud provider",
    status: "Active",
    priority: "High",
    progress: 82,
    due: "2025-08-30",
    spend: 51000,
    budget: 70000,
    team: ["H", "I", "J", "K", "L"],
  },
  {
    name: "Marketing Automation",
    description: "Integrate new automation flows",
    status: "Completed",
    priority: "Low",
    progress: 100,
    due: "2025-06-20",
    spend: 30000,
    budget: 30000,
    team: ["M", "N"],
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-blue-600 text-white",
  Completed: "bg-green-600 text-white",
  "On Hold": "bg-amber-500 text-black",
};

const priorityStyles: Record<string, string> = {
  High: "border-red-500 text-red-400",
  Medium: "border-amber-400 text-amber-400",
  Low: "border-blue-400 text-blue-400",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
              <span className="text-xs font-mono text-green-400">{s.delta}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <Input placeholder="Search projects…" className="md:max-w-xs" aria-label="Search projects" />
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        <div className="flex-1" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p) => {
          const spendPct = Math.min(100, Math.round((p.spend / p.budget) * 100));
          return (
            <Card key={p.name} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={cn("text-xs px-2 py-0.5", statusStyles[p.status])}>{p.status}</Badge>
                    <Badge
                      className={cn(
                        "text-xs px-2 py-0.5 border bg-transparent",
                        priorityStyles[p.priority]
                      )}
                    >
                      {p.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due:</span>
                    <span>{p.due}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{p.team.length} members</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-mono">{formatCurrency(p.budget)}</span>
                    <span className="text-muted-foreground">Spend:</span>
                    <span className="font-mono">{formatCurrency(p.spend)}</span>
                    <span className="ml-auto text-muted-foreground">{spendPct}% used</span>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {p.team.slice(0, 6).map((m, i) => (
                    <Avatar
                      key={i}
                      className="h-8 w-8 bg-muted ring-2 ring-background text-xs"
                    >
                      <AvatarFallback>{m}</AvatarFallback>
                    </Avatar>
                  ))}
                  {p.team.length > 6 && (
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground ring-2 ring-background text-xs">
                      <AvatarFallback>+{p.team.length - 6}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}