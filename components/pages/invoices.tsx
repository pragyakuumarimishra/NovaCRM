"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, Download, MoreVertical, FileText } from "lucide-react";

const stats = [
  { label: "Total Invoices", value: 240 },
  { label: "Paid", value: 182 },
  { label: "Pending", value: 42 },
  { label: "Overdue", value: 16 },
];

const invoices = [
  {
    id: "INV-1001",
    client: "Acme Corp",
    amount: 12000,
    issue: "2025-07-01",
    due: "2025-07-15",
    status: "Paid",
  },
  {
    id: "INV-1002",
    client: "Globex",
    amount: 24000,
    issue: "2025-07-03",
    due: "2025-07-17",
    status: "Pending",
  },
  {
    id: "INV-1003",
    client: "Initech",
    amount: 8500,
    issue: "2025-06-25",
    due: "2025-07-05",
    status: "Overdue",
  },
  {
    id: "INV-1004",
    client: "Umbrella",
    amount: 32000,
    issue: "2025-07-05",
    due: "2025-07-20",
    status: "Sent",
  },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-green-600 text-white",
  Pending: "bg-amber-500 text-black",
  Overdue: "bg-red-600 text-white",
  Sent: "bg-blue-600 text-white",
};

function money(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function InvoicesPage() {
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
          <CardTitle className="text-base">All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {inv.id}
                  </TableCell>
                  <TableCell>{inv.client}</TableCell>
                  <TableCell className="font-mono">{money(inv.amount)}</TableCell>
                  <TableCell className="text-xs">{inv.issue}</TableCell>
                  <TableCell className="text-xs">{inv.due}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[inv.status] || "bg-neutral-600 text-white"}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" aria-label="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="More">
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