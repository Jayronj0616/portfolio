# Portfolio Screenshot Guide

Purpose: for each project below, capture the screenshots listed so they're ready to drop into `portfolioData.js` (`images` array per project). Use real data where possible (not empty states) — screenshots should show the system actually working.

General rules:
- Use consistent browser window size across all screenshots for visual consistency on the portfolio (suggest 1440x900 or similar).
- Blur/redact any real client names, phone numbers, amounts, or personal data before using publicly — several of these systems have real business/client data in them (lending_system, cabinet-billing, employee-timekeeping, payroll_system).
- Prefer light mode or dark mode consistently — whichever matches your portfolio's dark theme aesthetic, unless the system only has one.
- Save into each project's own screenshots folder first, then move final picks into the portfolio's `public/images/<project>/` folder (matching the pattern already used for Airline System, QR Pass System, Caffeine Co.).

---

## 1. Lending System
*(C:\Users\Jayro\OneDrive\Desktop\lending_system — React + Node/Express + MySQL)*

- [ ] Dashboard / client list overview
- [ ] Add Client form
- [ ] Payment Schedule page (weekly/bi-weekly/custom frequency selector)
- [ ] Collections tracker (summary cards + due-today view)
- [ ] Client Details page showing balance/payment history

---

## 2. AgentPro
*(C:\Users\Jayro\OneDrive\Desktop\agentpro — React 19 + Vite + Supabase, real estate agent portfolio SaaS)*

- [ ] Public-facing agent portfolio page — "classic" layout
- [ ] Public-facing agent portfolio page — "editorial" layout (shows layout-switching capability)
- [ ] Admin portal — listings management
- [ ] Admin portal — applicants view
- [ ] Theme/layout switcher UI (shows the dynamic theming feature)

---

## 3. Claude Tracker
*(C:\Users\Jayro\OneDrive\Desktop\claude-tracker — Next.js + Supabase)*

- [ ] Login screen (shows the password-gate UI/design)
- [ ] Dashboard — account cards grid (shows multiple tracked accounts + availability status)
- [ ] Add/Edit Account modal

---

## 4. Cabinet Billing
*(C:\Users\Jayro\OneDrive\Desktop\cabinet-billing — Next.js 16 + Supabase, PDF invoicing)*

- [ ] Dashboard overview
- [ ] Billing/invoice creation screen
- [ ] Generated PDF invoice (the actual jsPDF output — this is the standout feature, don't skip it)
- [ ] History/past invoices list
- [ ] Admin section (if distinct from dashboard)

---

## 5. Employee Timekeeping
*(C:\Users\Jayro\OneDrive\Desktop\employee-timekeeping — Next.js + Supabase + bcrypt auth)*

- [ ] Login screen
- [ ] Main timekeeping/clock-in-out view
- [ ] Employee records/list view
- [ ] Any reports or summary view (if one exists — check app/ folder structure first)

---

## 6. Payroll Management System (Laravel)
*(C:\laragon\www\payroll_system — Laravel, PHP)*

- [ ] Employee management (create/edit, showing BASE 3 / MF group assignment)
- [ ] Payroll entry screen — this is the standout feature, capture it mid-entry with the **voice input active/listening** if possible (or at minimum show the voice command UI element)
- [ ] Payroll computation result (base salary + overtime auto-calculated)
- [ ] Payroll history view with grouped totals

---

## 7. Payroll System (Next.js port, deployed)
*(C:\Users\Jayro\OneDrive\Desktop\payroll-system-deployed — Next.js + Supabase, 1:1 port of #6)*

- [ ] Same core screens as the Laravel version, captured from the deployed Next.js version — useful to show side-by-side if you want to demonstrate you rebuilt/ported a system across stacks (worth a decision: do you want this as its own portfolio entry, or a "also available as a Next.js/Supabase build" note on the Laravel entry? Flag for later.)

---

## 8. Trucking Management System
*(C:\laragon\www\trucking_system / C:\xampp\htdocs\trucking_system — plain PHP + Tailwind via CDN, capstone project)*

- [ ] Home/landing dashboard
- [ ] Timesheet view
- [ ] Payroll section
- [ ] Admin panel view
- [ ] Dark/light mode toggle — capture both states side by side (this is a distinguishing feature worth showing off)

---

## 9. PassItOn
*(C:\Users\Jayro\OneDrive\Desktop\pass-it-on — Next.js + Supabase, donation marketplace)*

- [ ] Landing page (should show the "Don't throw it away. Pass it on." branding/motto)
- [ ] Browse/listings view
- [ ] Item detail page
- [ ] Consumer dashboard
- [ ] Upload/donate-an-item flow (Supabase Storage upload in action)

---

## 10. QuickBooks Automation
*(C:\Users\Jayro\OneDrive\Desktop\qb-automation — Python, Shopee → QuickBooks automation script)*

- [ ] Terminal/console output showing the script running (order data being pulled)
- [ ] QuickBooks Desktop with fields auto-filled by the script (before the manual save step — this is the actual proof-of-concept moment)
- [ ] Note: this is a script, not a web UI — a short GIF/screen recording may actually sell this better than static screenshots. Consider that instead if the portfolio can embed one.

---

## Not included
- **Portfolio site itself** — no screenshots needed, it's the site displaying these.
- `projects.js` (dead code, deleted) — n/a.
