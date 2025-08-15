import "./globals.css";
import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: "Modern, dark-first CRM dashboard",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}