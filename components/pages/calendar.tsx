"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: "Meeting" | "Leave" | "Deadline" | "Reminder";
  people?: string[];
}

const today = new Date();
const yyyy = today.getFullYear();
const mm = today.getMonth();

const events: Event[] = [
  { id: "1", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-05`, title: "Design Review", type: "Meeting", people: ["A", "B"] },
  { id: "2", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-05`, title: "Payroll Lock", type: "Deadline" },
  { id: "3", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-12`, title: "Client Call", type: "Meeting", people: ["C"] },
  { id: "4", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-15`, title: "Annual Leave", type: "Leave" },
  { id: "5", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-22`, title: "Sprint Retro", type: "Meeting" },
  { id: "6", date: `${yyyy}-${String(mm + 1).padStart(2, "0")}-27`, title: "Invoice Reminder", type: "Reminder" },
];

const typeStyles: Record<string, string> = {
  Meeting: "bg-blue-600 text-white",
  Leave: "bg-amber-500 text-black",
  Deadline: "bg-red-600 text-white",
  Reminder: "bg-purple-600 text-white",
};

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const weeks: Date[][] = [];
  let current = new Date(first);
  current.setDate(current.getDate() - current.getDay()); // start Sunday
  while (current <= last || current.getDay() !== 0) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
    if (current > last && current.getDay() === 0) break;
  }
  return weeks;
}

export default function CalendarPage() {
  const [viewYear, setViewYear] = useState(yyyy);
  const [viewMonth, setViewMonth] = useState(mm);

  const weeks = buildCalendar(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const monthEvents = events.filter((e) => e.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`));
  const todaysEvents = monthEvents.filter((e) => e.date === todayKey);

  function changeMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Calendar */}
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" aria-label="Previous month" onClick={() => changeMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Next month" onClick={() => changeMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <CardTitle className="text-base">{monthLabel}</CardTitle>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="px-2 py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-border rounded-md overflow-hidden">
            {weeks.map((w, wi) =>
              w.map((d, di) => {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                const inMonth = d.getMonth() === viewMonth;
                const dayEvents = events.filter((e) => e.date === key);
                const isToday = key === todayKey;
                return (
                  <div
                    key={`${wi}-${di}`}
                    className={cn(
                      "min-h-[90px] flex flex-col gap-1 p-1 border border-border bg-card/40 hover:bg-muted transition-colors",
                      !inMonth && "text-muted-foreground opacity-60",
                      isToday && "bg-primary text-primary-foreground hover:bg-primary"
                    )}
                  >
                    <div className="text-[10px] font-medium">{d.getDate()}</div>
                    <div className="flex flex-col gap-0.5">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <Badge
                          key={ev.id}
                          className={cn(
                            "truncate w-full text-[10px] px-1 py-0.5 font-medium",
                            typeStyles[ev.type]
                          )}
                        >
                          {ev.title}
                        </Badge>
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 3} more</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Side panel */}
      <div className="w-full xl:w-80 flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Today&apos;s Events</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {todaysEvents.length === 0 && (
              <p className="text-xs text-muted-foreground">No events today.</p>
            )}
            {todaysEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 rounded-md border border-border p-2 hover:bg-muted/60"
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full mt-1",
                    {
                      Meeting: "bg-blue-500",
                      Leave: "bg-amber-400",
                      Deadline: "bg-red-500",
                      Reminder: "bg-purple-500",
                    }[ev.type]
                  )}
                />
                <div className="flex-1">
                  <div className="text-xs font-medium">{ev.title}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    All day
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {monthEvents.slice(0, 8).map((ev) => (
              <div
                key={ev.id}
                className="flex items-center gap-3 rounded-md border border-border p-2 hover:bg-muted/60"
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    {
                      Meeting: "bg-blue-500",
                      Leave: "bg-amber-400",
                      Deadline: "bg-red-500",
                      Reminder: "bg-purple-500",
                    }[ev.type]
                  )}
                />
                <div className="flex-1">
                  <div className="text-xs font-medium">{ev.title}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {ev.date.slice(5)}
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {ev.people?.map((p) => (
                    <Avatar key={p} className="h-6 w-6 ring-2 ring-background bg-muted">
                      <AvatarFallback>{p}</AvatarFallback>
                    </Avatar>
                  )) || (
                    <Avatar className="h-6 w-6 ring-2 ring-background bg-muted">
                      <AvatarFallback>
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}