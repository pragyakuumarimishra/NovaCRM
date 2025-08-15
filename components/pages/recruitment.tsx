"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const openings = [
  { title: "Senior Frontend Engineer", status: "Open", department: "Engineering", applicants: 24 },
  { title: "Product Designer", status: "Open", department: "Product", applicants: 15 },
  { title: "Data Analyst", status: "Closed", department: "Data", applicants: 32 },
  { title: "HR Generalist", status: "Open", department: "People", applicants: 9 },
];

const candidates = [
  { name: "Anna Smith", score: 92, stage: "Offer", status: "Offer" },
  { name: "Brian Lee", score: 81, stage: "Interview", status: "Interview" },
  { name: "Chloe Zhao", score: 75, stage: "Review", status: "Review" },
  { name: "Daniel Wu", score: 68, stage: "Interview", status: "Interview" },
  { name: "Eve Torres", score: 55, stage: "Review", status: "Rejected" },
];

const statusStyles: Record<string, string> = {
  Offer: "bg-green-600 text-white",
  Interview: "bg-blue-600 text-white",
  Review: "bg-amber-500 text-black",
  Rejected: "bg-red-600 text-white",
  Open: "bg-green-600 text-white",
  Closed: "bg-neutral-600 text-white",
};

export default function RecruitmentPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left: Job Openings */}
      <div className="xl:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Job Openings</CardTitle>
          </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openings.map((o) => (
                <div
                  key={o.title}
                  className="border border-border rounded-md p-4 flex flex-col gap-3 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{o.title}</h4>
                      <p className="text-[11px] text-muted-foreground">{o.department}</p>
                    </div>
                    <Badge className={cn("text-xs", statusStyles[o.status])}>{o.status}</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Applicants: <span className="font-mono">{o.applicants}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
        </Card>
      </div>

      {/* Right: Recent Candidates */}
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search candidates" className="pl-8" />
            </div>
            <div className="flex flex-col gap-3">
              {candidates.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col gap-2 border border-border rounded-md p-3 hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{c.name}</span>
                    <Badge className={cn("text-xs", statusStyles[c.status])}>{c.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span>Score: {c.score}</span>
                    <span>Stage: {c.stage}</span>
                  </div>
                  {c.status === "Interview" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs flex items-center gap-1">
                        <Check className="h-3 w-3" /> Accept
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs flex items-center gap-1 text-red-400">
                        <X className="h-3 w-3" /> Reject
                      </Button>
                    </div>
                  )}
                  {c.status !== "Interview" && (
                    <Button size="sm" variant="ghost" className="self-start text-xs">
                      View
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}