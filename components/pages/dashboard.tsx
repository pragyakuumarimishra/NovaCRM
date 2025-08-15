"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Eye, MoreVertical } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const kpis = [
  { title: "Payrolls Cost", value: "$120,400", delta: "+4.2%", type: "positive", subtitle: "This month" },
  { title: "Total Expense", value: "$550,800", delta: "-1.8%", type: "negative", subtitle: "All departments" },
  { title: "Pending Payments", value: "$37,200", delta: "+1.1%", type: "neutral", subtitle: "Across teams" },
  { title: "Total Payrolls", value: "728", delta: "+0.6%", type: "positive", subtitle: "This year" },
];

const salesData = [
  { month: "Jan", sales: 23000 },
  { month: "Feb", sales: 27500 },
  { month: "Mar", sales: 22000 },
  { month: "Apr", sales: 34000 },
  { month: "May", sales: 42000 },
  { month: "Jun", sales: 38000 },
  { month: "Jul", sales: 47000 },
  { month: "Aug", sales: 45000 },
  { month: "Sep", sales: 50000 },
  { month: "Oct", sales: 52000 },
  { month: "Nov", sales: 48000 },
  { month: "Dec", sales: 57000 },
];

const emailMetrics = [
  { month: "Jan", ctr: 11, open: 25 },
  { month: "Feb", ctr: 12, open: 27 },
  { month: "Mar", ctr: 10, open: 23 },
  { month: "Apr", ctr: 13, open: 30 },
  { month: "May", ctr: 14, open: 32 },
  { month: "Jun", ctr: 15, open: 35 },
  { month: "Jul", ctr: 13, open: 31 },
  { month: "Aug", ctr: 12, open: 29 },
  { month: "Sep", ctr: 16, open: 37 },
  { month: "Oct", ctr: 14, open: 34 },
  { month: "Nov", ctr: 13, open: 33 },
  { month: "Dec", ctr: 15, open: 38 },
];

const teamDirectory = [
  { avatar: "A", name: "Alice Johnson", email: "alice@novacrm.com", role: "Project Manager", dept: "Projects", status: "Active" },
  { avatar: "B", name: "Bob Lee", email: "bob@novacrm.com", role: "Developer", dept: "Engineering", status: "Active" },
  { avatar: "C", name: "Carla Diaz", email: "carla@novacrm.com", role: "Designer", dept: "Product", status: "On Leave" },
  { avatar: "D", name: "David Kim", email: "david@novacrm.com", role: "HR Lead", dept: "People", status: "Inactive" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-600 text-white",
  "On Leave": "bg-amber-500 text-black",
  Inactive: "bg-neutral-700 text-white",
};

function KPI({ kpi }: { kpi: typeof kpis[number] }) {
  let color = "text-green-400";
  if (kpi.type === "negative") color = "text-red-400";
  if (kpi.type === "neutral") color = "text-amber-400";
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.title}</CardTitle>
        <span className={cn("text-xs font-mono font-semibold", color)}>{kpi.delta}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
        <div className="text-xs text-muted-foreground">{kpi.subtitle}</div>
      </CardContent>
    </Card>
  );
}

function ThemedTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-popover text-popover-foreground px-3 py-2 shadow border border-border">
      <div className="font-mono text-xs text-muted-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-xs">{p.name}</span>
          <span className="ml-auto text-xs font-mono">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KPI key={k.title} kpi={k} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salesData}>
                <defs>
                  <linearGradient id="barGradientDash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-bar)" />
                    <stop offset="100%" stopColor="var(--chart-bar-accent)" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <ReTooltip content={<ThemedTooltip />} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="sales" fill="url(#barGradientDash)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Email Metrics</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={emailMetrics}>
                <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={{ stroke: "var(--border)" }} />
                <ReTooltip content={<ThemedTooltip />} />
                <Legend />
                <Line dataKey="ctr" name="Click Through Rate" stroke="var(--chart-line)" strokeWidth={2.2} dot={{ r: 4, fill: "var(--chart-line)" }} />
                <Line dataKey="open" name="Open Rate" stroke="var(--chart-line-2)" strokeWidth={2.2} dot={{ r: 4, fill: "var(--chart-line-2)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamDirectory.map((m) => (
                <TableRow key={m.email}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{m.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{m.email}</TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>{m.dept}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs px-2 py-1", statusStyles[m.status])}>{m.status}</Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" aria-label="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="More">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}