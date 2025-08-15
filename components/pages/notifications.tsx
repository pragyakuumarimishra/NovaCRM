"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  MessageSquare,
  Calendar,
  Settings,
  User,
  AlertTriangle,
  Eye,
  Check,
} from "lucide-react";

const stats = [
  { label: "Unread", value: 18 },
  { label: "Read", value: 342 },
  { label: "High Priority", value: 5 },
  { label: "Total", value: 360 },
];

interface Notification {
  id: string;
  type: "message" | "calendar" | "system" | "user" | "alert";
  title: string;
  description: string;
  high?: boolean;
  unread?: boolean;
  time: string;
}

const list: Notification[] = [
  {
    id: "n1",
    type: "message",
    title: "New message from Sales",
    description: "Quarter report update",
    unread: true,
    time: "2m ago",
  },
  {
    id: "n2",
    type: "calendar",
    title: "Meeting Reminder",
    description: "Design review at 15:00",
    time: "10m ago",
  },
  {
    id: "n3",
    type: "alert",
    title: "Overdue Invoice",
    description: "Invoice INV-1003 is overdue",
    high: true,
    unread: true,
    time: "25m ago",
  },
  {
    id: "n4",
    type: "system",
    title: "Deployment Complete",
    description: "Version 1.2.0 live",
    time: "1h ago",
  },
  {
    id: "n5",
    type: "user",
    title: "New Employee Added",
    description: "Emma Stone joined Engineering",
    time: "3h ago",
  },
];

const typeStyles: Record<string, string> = {
  message: "bg-blue-600 text-white",
  calendar: "bg-purple-600 text-white",
  system: "bg-neutral-600 text-white",
  user: "bg-amber-500 text-black",
  alert: "bg-red-600 text-white",
};

const typeIcons: Record<string, any> = {
  message: MessageSquare,
  calendar: Calendar,
  system: Settings,
  user: User,
  alert: AlertTriangle,
};

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats small cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col divide-y divide-border">
            {list.map((n) => {
              const Icon = typeIcons[n.type];
              return (
                <div
                  key={n.id}
                  className="flex flex-col md:flex-row md:items-center gap-3 py-3"
                >
                  <div className="flex items-center gap-3 w-full md:w-72">
                    <span
                      className={`h-8 w-8 inline-flex items-center justify-center rounded-md ${typeStyles[n.type]} relative`}
                    >
                      <Icon className="h-4 w-4" />
                      {n.unread && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                      )}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {n.high && <Badge className="bg-red-600 text-white text-[10px]">High</Badge>}
                  </div>
                  <div className="text-[10px] text-muted-foreground ml-auto">{n.time}</div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label="Mark as read">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="View notification">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}