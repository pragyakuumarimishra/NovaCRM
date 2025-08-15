# NovaCRM

Modern, dark-first CRM + Operations dashboard built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **shadcn-style UI primitives**, **Recharts**, and **lucide-react**.  
Focuses on unified visibility and internal productivity across projects, people, finance, performance, scheduling, recruitment, and support.

> Dark mode only by design. All colors flow through design tokens / CSS variables — no inline hex usage for UI styling (only dynamic widths in progress bars & chart runtime rendering).

---

## ✨ Core Features

| Domain | Highlights |
| ------ | ---------- |
| Dashboard | KPIs, Sales bar chart, Email metrics line chart, Team directory table |
| Projects | Status/priority badges, progress tracking, budget vs spend, team avatars |
| Calendar | Month grid with events (meetings, deadlines, leave, reminders), "Today" + "Upcoming" panels |
| Employees | Directory with role, dept, status, join date, salary |
| Performance | Metrics KPIs, Area + Bar charts, team performance list with grading & trends |
| Invoices | Invoice lifecycle table (Paid/Pending/Overdue/Sent) |
| Payrolls | Payroll breakdown (base, overtime, bonus, deductions, net) |
| Leave Management | Requests table with approve/reject actions for pending entries |
| Recruitment | Job openings & candidate pipeline (Offer / Interview / Review / Rejected) |
| Notifications | Typed activity feed with prioritization and unread markers |
| Help Center | Search hero, categories, popular articles, support contact, quick links |
| Settings | Branding & organization settings, toggles, sample API keys |

---

## 🧱 Tech Stack

| Layer | Choice | Notes |
| ----- | ------ | ----- |
| Framework | Next.js (App Router) | SSR + RSC ready; pages under `/app` |
| Language | TypeScript | Strict typing & util helpers |
| Styling | Tailwind CSS | Utility-first; dark mode enforced via `<html class="dark">` |
| UI Components | Custom lightweight shadcn-style primitives | Cards, Buttons, Tables, Avatar, Progress, Switch, Sheet |
| Icons | lucide-react | All icons token-colored |
| Charts | Recharts | Themed via CSS custom properties |
| Fonts | Geist / Geist Mono | Self-host (replace if needed) |
| State | Local (demo) | Replace with Server Components / SWR / React Query as you integrate data |
| Deployment | Vercel / Docker | Config examples included |

---

## 🌑 Dark Theme & Tokens

All colors are defined in `app/globals.css`:

```css
--background
--foreground
--muted / --muted-foreground
--card / --card-foreground
--popover / --popover-foreground
--primary / --primary-foreground
--destructive
--border
--ring
--input
/* Charts */
--chart-bar
--chart-bar-accent
--chart-line
--chart-line-2
--chart-line-3
--chart-area
--chart-area-2
--chart-grid
--chart-tooltip-bg
--chart-tooltip-fg
```

Change branding (name & favicon, etc.) in:
```ts
lib/constants.ts
```

---

## 📁 Project Structure

```
app/
  layout.tsx
  globals.css
  page.tsx (Dashboard)
  <feature>/page.tsx (other modules)
components/
  crm-layout.tsx
  pages/
    *.tsx (module pages)
  ui/
    button.tsx, card.tsx, badge.tsx, table.tsx, progress.tsx, switch.tsx, sheet.tsx, avatar.tsx, input.tsx, sidebar.tsx
hooks/
  use-mobile.ts
lib/
  constants.ts
  utils.ts
public/
  fonts/ (GeistVariable.woff2, GeistMonoVariable.woff2)
tailwind.config.js
postcss.config.js
tsconfig.json
Dockerfile
```

---

## 🚀 Getting Started

### 1. Install

```bash
npm install
```

### 2. Dev Server

```bash
npm run dev
# http://localhost:3000
```

### 3. Production Build

```bash
npm run build
npm start
```

### 4. Lint (if you later add ESLint rules)

```bash
npm run lint
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| -------- | ------ |
| Cmd/Ctrl + B | Toggle sidebar (mobile sheet / desktop presence) |

---

## 📊 Charts Theming

All chart elements (axes, grid, tooltips, fills, strokes) reference CSS variables.  
To adjust palette globally, update the chart variables in `globals.css`.

Example gradient usage:

```xml
<linearGradient id="barGradient">
  <stop offset="0%" stop-color="var(--chart-bar)" />
  <stop offset="100%" stop-color="var(--chart-bar-accent)" />
</linearGradient>
```

---

## 🧪 Extending / Adding a Module

1. Create directory: `app/reports/page.tsx`
2. Wrap content:
```tsx
import { CRMLayout } from "@/components/crm-layout";

export default function Page() {
  return (
    <CRMLayout>
      {/* Your module content */}
    </CRMLayout>
  );
}
```
3. Add entry to `menuItems` array inside `components/crm-layout.tsx`.

---

## 🧩 Integrating Real Data (Roadmap Guidance)

| Layer | Suggested Approach |
| ----- | ------------------ |
| Auth | NextAuth.js / custom JWT + middleware guarding routes |
| Data Layer | Prisma + PostgreSQL (or external APIs via edge functions) |
| Fetching | Server Components for static-ish data; SWR/React Query for live lists |
| Realtime | WebSockets / SSE / Pusher for notifications & dashboard KPIs |
| RBAC | Role claims stored in session, conditional nav entries |
| Auditing | Append structured events (userId, action, resource, timestamp) |

---

## 📐 Conceptual Data Model (High Level)

```
Employee(id, name, email, dept, role, status, salary, joinedAt)
Project(id, name, status, priority, progress, budget, spend, dueDate)
ProjectMember(projectId, employeeId)
Invoice(id, client, amount, issueDate, dueDate, status)
Payroll(id, employeeId, period, base, overtime, bonus, deductions, net, status)
LeaveRequest(id, employeeId, type, startDate, endDate, days, status, appliedAt)
JobOpening(id, title, department, status, applicantCount)
Candidate(id, openingId, name, score, stage, status)
Notification(id, type, title, body, high, unread, createdAt)
CalendarEvent(id, date, type, title, participants[])
PerformanceMetric(id, employeeId, period, score, goalsCompletion, trend)
```

---

## ♿ Accessibility Notes

- Focus-visible rings use `--ring`.
- Interactive elements sized for touch (≥ 40px height except icon buttons ~36–40).
- Semantic tables & headings.
- ARIA labels used in icon-only buttons (e.g., "Open notifications").
- Charts: tooltips rely on pointer; for full accessibility you could add an accessible data summary region.

---

## 🧪 Testing Suggestions (Not Included, Add as Needed)

| Type | Tool |
| ---- | ---- |
| Unit | Vitest / Jest |
| Component | Storybook + Testing Library |
| E2E | Playwright (recommended) |
| Performance | Lighthouse CI / WebPageTest |
| Accessibility | axe-core / pa11y |

Sample Playwright test:
```ts
import { test, expect } from "@playwright/test";

test("dashboard loads KPIs", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Payrolls Cost")).toBeVisible();
});
```

---

## 🛠 Customization

| Goal | Where |
| ---- | ----- |
| Rename brand | `lib/constants.ts` |
| Change palette | `app/globals.css` tokens |
| Modify sidebar | `components/crm-layout.tsx` |
| Swap font | Replace font-face or Tailwind `fontFamily` config |
| Add chart palette | Add new `--chart-*` vars, reference in components |

---

## 📦 Deployment

### Vercel (Recommended)
1. Push repo to GitHub.
2. Import in Vercel dashboard.
3. Build command: `next build`
4. Output: (auto) `.next`
5. Done.

### Docker

```bash
docker build -t novacrm .
docker run -p 3000:3000 novacrm
```

### Environment Variables

Currently none required. Once integrating a DB or auth, create `.env.local` and avoid committing it.

---

## 🔐 Security & Hardening Roadmap

| Area | Action |
| ---- | ------ |
| Auth | Add session checks & route middleware |
| Input | Sanitize any future form submissions |
| Headers | Configure strict CSP & security headers (`next.config.js` / middleware) |
| Secrets | Use `process.env.*` with Vercel / Docker secrets |
| Rate limiting | Edge middleware for write-heavy endpoints |
| Audit | Log mutation events to append-only store |

---

## 🧾 License

Choose a license (MIT recommended). Create `LICENSE` if open-sourcing.

Example (MIT):
```
MIT License – (c) 2025 Your Name
```

---

## 🤝 Contributing (Suggested Workflow)

1. Fork & branch: `feat/<module>`  
2. Keep components stateless and data-agnostic where possible.  
3. Add tests for new utility logic.  
4. Submit PR with screenshots (since dark-mode UI).  

---

## 🐞 Common Issues

| Symptom | Fix |
| ------- | --- |
| Blank charts | Ensure `recharts` installed & no SSR-only code referencing `window` |
| Fonts not loading | Verify `public/fonts` filenames & correct paths |
| No dark styling | Confirm `<html class="dark">` present (layout.tsx) |
| Sidebar not toggling | Check keyboard listener; ensure no React StrictMode double event side-effect (safe here) |

---

## 🧭 Future Enhancements

- Server Components data hydration
- Role-based navigation filtering
- Drag-and-drop Kanban for Projects
- Real-time notifications (WebSocket)
- Inline editing rows (Invoices / Payrolls)
- Multi-tenant theming (CSS variable namespace)
- Export / CSV actions in tables
- Skeleton loading & optimistic UI

---

## ✅ Quick Verification Checklist

- [ ] Dark mode enforced (no flash of light mode)
- [ ] KPIs responsive (1–4 columns)
- [ ] Charts themed (no raw hex)
- [ ] Sidebar keyboard toggle works
- [ ] Mobile sheet overlay appears & scroll locks
- [ ] All pages reachable via nav
- [ ] Focus ring visible on tab cycles
- [ ] No console errors after `npm run build && npm start`

---

## 💬 Questions / Next Steps

Need examples for:
- Adding authentication (NextAuth)  
- Prisma schema & migrations  
- Role-based guards  
- API route examples (REST or tRPC)  
- Storybook setup  

Open an issue or request a module scaffold — happy to help.

---

**Enjoy building on NovaCRM.**  
_Unify operations. Ship faster. Stay in the dark (theme)._
