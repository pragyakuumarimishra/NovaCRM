"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, MoreVertical, Phone } from "lucide-react";
import { useEmployees } from "@/hooks/use-employees";

const stats = [
  { label: "Total Employees", value: 132 },
  { label: "Active", value: 118 },
  { label: "New This Month", value: 6 },
  { label: "On Leave", value: 8 },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-600 text-white",
  "On Leave": "bg-amber-500 text-black",
  Inactive: "bg-neutral-600 text-white",
};

function formatMoney(n: number) {
  return `$${(n / 1000).toFixed(1)}k`;
}

export default function EmployeesPage() {
  const { employees, loading, error } = useEmployees();

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="text-center py-8">Loading employees...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name / ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{e.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm">{e.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{e.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-mono">{e.email}</span>
                      <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {e.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell>{e.dept}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[e.status] || "bg-neutral-600 text-white"}>{e.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{e.joined}</TableCell>
                  <TableCell className="font-mono">{formatMoney(e.salary)}</TableCell>
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