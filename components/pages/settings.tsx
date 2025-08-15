"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organization Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Brand Name</label>
            <Input defaultValue="NovaCRM" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Support Email</label>
            <Input defaultValue="support@novacrm.com" />
          </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-medium">Default Reply-To</label>
              <Input defaultValue="noreply@novacrm.com" />
            </div>
          <div className="flex items-center justify-between border border-border rounded-md p-3 md:col-span-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Enable Beta Features</span>
              <span className="text-[11px] text-muted-foreground">
                Gain early access to experimental modules.
              </span>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between border border-border rounded-md p-3 md:col-span-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Email Notifications</span>
              <span className="text-[11px] text-muted-foreground">
                Receive summary emails.
              </span>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">API Keys</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between border border-border rounded-md p-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Public Key</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                pk_live_1234567890abcdef
              </span>
            </div>
            <Badge className="bg-blue-600 text-white text-[10px]">Live</Badge>
          </div>
          <div className="flex items-center justify-between border border-border rounded-md p-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Secret Key</span>
              <span className="text-[11px] font-mono text-muted-foreground">
                sk_live_****************
              </span>
            </div>
            <Button variant="outline" className="text-xs h-8">
              Reveal
            </Button>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="text-xs">
              Generate New Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}