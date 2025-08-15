"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, X, Eye } from "lucide-react";

const stats = [
  { label: "Requests (Month)", value: 42 },
  { label: "Approved", value: 30 },
  { label: "Pending", value: 8 },
  { label: "Rejected", value: 4 },
];

const requests = [
  {
    emp: "Alice Johnson",
    avatar: "A",
    type: "Vacation",
    duration: "Jul 10 - Jul 14",
    days: 5,
    status: "Approved",
    applied: "2025-06-18",
  },
  {
    emp: "Bob Lee",
    avatar: "B",
    type: "Sick Leave",
    duration: "Jul 03 - Jul 04",
    days: 2,
    status: "Pending",
    applied: "2025-06-30",
  },
  {
    emp: "Carla Diaz",
    avatar: "C",
    type: "Personal",
    duration: "Jul 20",
    days: 1,
    status: "Rejected",
    applied: "2025-06-29",
  },
  {
    emp: "David Kim",
    avatar: "D",
    type: "Vacation",
    duration: "Jul 25 - Jul 31",
    days: 7,
    status: "Pending",
    applied: "2025-07-01",
  },
];

const statusStyles: Record<string, string> = {
  Approved: "bg-green-600 text-white",
  Pending: "bg-amber-500 text-black",
  Rejected: "bg-red-600 text-white",
};

export default function LeaveManagementPage() {
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
          <CardTitle className="text-base">Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.emp + r.applied}>
                  <TableCell className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium">
                      {r.avatar}
                    </span>
                    {r.emp}
                  </TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell className="text-xs">{r.duration}</TableCell>
                  <TableCell>{r.days}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[r.status] || "bg-neutral-600 text-white"}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{r.applied}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" aria-label="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {r.status === "Pending" && (
                      <>
                        <Button size="icon" variant="ghost" aria-label="Approve">
                          <Check className="h-4 w-4 text-green-400" />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Reject">
                          <X className="h-4 w-4 text-red-400" />
                        </Button>
                      </>
                    )}
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