"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, MoreVertical, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Payrolls", value: 728 },
  { label: "Processed", value: 690 },
  { label: "Pending", value: 26 },
  { label: "Errors", value: 12 },
];

const payrolls = [
  {
    emp: "Alice Johnson",
    avatar: "A",
    base: 7500,
    overtime: 600,
    bonus: 500,
    deductions: 400,
    net: 8200,
    status: "Processed",
  },
  {
    emp: "Bob Lee",
    avatar: "B",
    base: 8800,
    overtime: 0,
    bonus: 900,
    deductions: 500,
    net: 9200,
    status: "Processed",
  },
  {
    emp: "Carla Diaz",
    avatar: "C",
    base: 6400,
    overtime: 300,
    bonus: 0,
    deductions: 200,
    net: 6500,
    status: "Pending",
  },
  {
    emp: "David Kim",
    avatar: "D",
    base: 7000,
    overtime: 0,
    bonus: 300,
    deductions: 250,
    net: 7050,
    status: "Pending",
  },
];

const statusStyles: Record<string, string> = {
  Processed: "bg-green-600 text-white",
  Pending: "bg-amber-500 text-black",
  Error: "bg-red-600 text-white",
};

function money(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function PayrollsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
              <span className="h-6 w-6 inline-flex items-center justify-center rounded-md bg-primary/20">
                <DollarSign className="h-4 w-4 text-primary" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payroll Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((p) => (
                <TableRow key={p.emp}>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                      {p.avatar}
                    </span>
                    <span>{p.emp}</span>
                  </TableCell>
                  <TableCell className="font-mono">{money(p.base)}</TableCell>
                  <TableCell className="font-mono">{money(p.overtime)}</TableCell>
                  <TableCell className="font-mono">{money(p.bonus)}</TableCell>
                  <TableCell className="font-mono text-red-400">-{money(p.deductions)}</TableCell>
                  <TableCell className="font-mono font-semibold">{money(p.net)}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[p.status] || "bg-neutral-600 text-white"}>{p.status}</Badge>
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