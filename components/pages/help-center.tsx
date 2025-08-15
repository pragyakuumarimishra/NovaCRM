"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const categories = [
  { name: "Getting Started", articles: 8 },
  { name: "Account Management", articles: 12 },
  { name: "Projects & Tasks", articles: 15 },
  { name: "Reports & Analytics", articles: 10 },
];

const popular = [
  "How to invite new users",
  "Setting up your first project",
  "Generating performance reports",
  "Managing invoice workflows",
  "Configuring email notifications",
];

const quickLinks = [
  "API Documentation",
  "Status Page",
  "Release Notes",
  "Security & Privacy",
  "Community Forum",
];

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Search hero */}
      <Card className="bg-gradient-to-br from-muted/60 to-muted">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">How can we help?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Input
            placeholder="Search help articles..."
            className="max-w-lg w-full"
            aria-label="Search help center"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <Badge key={c.name} className="bg-primary/20 text-primary">
                {c.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Card key={c.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{c.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {c.articles} articles
              </p>
              <Button variant="ghost" className="text-xs mt-2 px-0">
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular + Contact + Quick Links */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {popular.map((p) => (
              <button
                key={p}
                className="text-xs text-left text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              >
                {p}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs">
              <span>Live Chat</span>
              <Button size="sm" variant="outline" className="text-xs">
                Open
              </Button>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Email Support</span>
              <Button size="sm" variant="outline" className="text-xs">
                Send
              </Button>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between items-center">
                <span>Phone Support</span>
                <Badge className="bg-neutral-600 text-white text-[10px]">Disabled</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Phone support is only available for Enterprise plans.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {quickLinks.map((q) => (
              <Button
                key={q}
                variant="ghost"
                className="justify-start h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                {q}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}