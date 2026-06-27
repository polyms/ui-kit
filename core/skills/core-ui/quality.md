---
description: >-
  @polyms/core-ui product UI quality — task read, anti-slop, copy tells, visual consistency, list primitives,
  output completeness, pre-flight. Read for shipped UI, demos, -views/, field label tone. Not marketing landing pages.
---

# Product UI Quality

Adapted from [Taste Skill](https://www.tasteskill.dev/) ideas for **dashboards, forms, tables, toolbars, overlays, and docs demos** — not landing-page marketing.

`@polyms/core-ui` is the design system. Do not install shadcn/ui, Fluent, Carbon, or parallel component libraries in the same app tree.

## Task Read (Before Generating)

Infer the task before writing code. State one line:

**"Reading this as: \<surface> for \<audience>, using @polyms/core-ui, \<density> density."**

| Signal | Surface | What to do |
| --- | --- | --- |
| Form, field, validation | App screen | [field.md](field.md) + [quality.md#field-label-copy](quality.md#field-label-copy) |
| Button, CTA, icon button | App screen | [components.md#button](components.md#button) |
| Toast, notification | App screen | [setup.md#toast](setup.md#toast) · [components.md#toast](components.md#toast) |
| Modal, Offcanvas, dialog, drawer, delete confirm | App screen | [modal.md](modal.md) — not Toast for blocking confirm |
| Form in modal/offcanvas, modal form, filter panel, side panel with form | App screen | [field.md](field.md) + [modal.md](modal.md); `scrollable` on `Modal.Content` when long |
| Switch, Popover, Tooltip | App screen | [components.md#switch](components.md#switch) · [popover](components.md#popover) · [tooltip](components.md#tooltip) |
| Table, tabular data | App screen | [css-utilities.md#table](css-utilities.md#table) |
| Select, Tabs, Menu, Toolbar, nav, settings | App screen | [components.md](components.md) · [select](components.md#select) · [tabs](components.md#tabs) |
| Accordion, FAQ, expand/collapse sections | App screen | [components.md#accordion](components.md#accordion) · single unit → [collapsible](components.md#collapsible) |
| Alert, banner, inline status | App screen | [components.md#alert](components.md#alert) |
| NumberField, quantity, stepper | App screen | [components.md#numberfield](components.md#numberfield) |
| Spinner, loading, pending fetch | App screen | [components.md#spinner](components.md#spinner) · `.skeleton` → [css-utilities.md](css-utilities.md) |
| Code split, lazy import, federated remote | App setup | [components.md#dynamic-import](components.md#dynamic-import) |
| New consumer app shell | App setup | Read [setup.md](setup.md); mount overlay containers once |
| New consumer app / brand theming | Brand kit | Read [brandkit.md](brandkit.md); map accent to `primary-*` |
| Docs live demo (`-views/`) | Docs demo | Real compound trees; `@polyms/core-ui` barrel — [Sample Data and Docs Demos](#sample-data-and-docs-demos) |
| Extend or restyle existing screen | Redesign | Read [redesign.md](redesign.md); run Scan → Diagnose → Fix |
| Library component or CSS in the package source | Maintainer | [Maintainer](#maintainer) |

## Maintainer

**@polyms/core-ui library source only** — skip in consumer app repos. When changing package primitives, styles, or compound APIs:

1. **Conventions:** Biome format/lint; TS/TSX use 110-character `// ── Section ─` separators (Types before Components when types exist); colocated Vitest tests; when public API or shipped CSS utilities change, update the matching file in **this skill pack** (and [css-utilities.md](css-utilities.md) when utilities are consumer-facing).
2. Do not break compound trees for one-off styling; update skill files when consumption changes.
3. **Live docs demos:** complete compound trees; `@polyms/core-ui` barrel imports (library monorepo demos often live in `-views/` preview folders beside MDX).
4. Docs-only accordion overrides (API Reference table grid) must stay scoped under **`.api-reference`** — never global `.accordion-trigger` rules that break live demos.
5. **CSS section comments** in package and docs-site `styles/_*.css` — short block headers (e.g. `/* Trigger button styling */`, `/* Panel styling */`). Do not delete when refactoring, scoping selectors, or formatting; add the same style of comment for new distinct blocks; remove a section comment only when removing the rule block it labels.

If the task is ambiguous between **preserve existing UI** vs **visual overhaul**, ask once: *"Giữ layout/brand hiện tại hay làm lại visual từ đầu?"*

## Visual Density

Product UI does not use marketing "variance" dials. Pick density intentionally:

| Density | When | Spacing | Data display |
| --- | --- | --- | --- |
| **Comfortable** (default) | Settings, onboarding, marketing-in-app | `py-6`–`py-8` sections, readable line length | Cards and grouped fields OK |
| **Compact** | Tables, admin lists, toolbars | Tighter `gap-2`/`gap-3`, less wrapper padding | Prefer `.table`, plain rows, `Toolbar` — avoid nested card boxes |
| **Dense cockpit** | Dashboards, monitoring | Minimal chrome between metrics | `font-mono` for numbers; 1px `border-line` separators instead of card-per-metric |

High-density screens: **do not** wrap every metric in identical card boxes. Let data breathe with spacing and dividers.

## Visual consistency

One screen = one visual system. Do not mix ad-hoc Tailwind with library defaults on the same surface.

### Shape (corners)

- Pick **one** radius family per screen: library defaults (`Button`, `Field.Control`, shells) **or** your app wrapper — not both randomly.
- Prefer **`Button rounded`**, **`Field.Control rounded`**, and component props over one-off `rounded-lg` / `rounded-2xl` / `rounded-xl` on the same flow.
- Do not restyle `Modal.Content`, `Menu.Content`, or `Offcanvas.Content` corner geometry unless documented.

### Typography (headings)

- Same heading **level** → same utility across the screen (`.h1`–`.h6` from [css-utilities.md](css-utilities.md#typography)).
- Do not mix `.h2` on one card and `text-2xl` on another for the same hierarchy.
- Body copy: readable line length (~65ch) on prose blocks; tables and forms can be full width.

### Color (accent)

- **One** brand accent via `primary-*` on a screen — see [brandkit.md](brandkit.md). Status stays `success` / `warning` / `danger`, not a second accent hue per section.

## Lists and collections

Do not default to a tall `divide-y` stack of `<div>`s when a library primitive fits. See [css-utilities.md — Lists and collections](css-utilities.md#lists-and-collections).

| Situation | Use |
| --- | --- |
| Tabular / sortable data | `.table` (+ `table-hover`, `table-striped` as needed) |
| 5+ homogeneous rows with columns | `.table`, not repeated flex rows |
| Grouped sections of content | `Tabs` or `Accordion` |
| Single show/hide block | `Collapsible` |
| Row actions menu | `Menu` on each row or `Toolbar` above table |
| Filterable long list | `Field.Floating` + `.table` (or `Select` for enum filters) |
| Avoid | 20+ `border-b` div rows; fake tables from styled `<div>` grids |

## Anti-Slop (Product UI)

Avoid LLM-default patterns that fight this design system:

### Components and markup

- **No ad-hoc primitives** when `Button`, `Field`, `Modal`, `Select`, `Menu`, `Tabs`, `Alert`, `NumberField`, or `Toolbar` already fit.
- **No div-based fake UI** — do not simulate a modal, dropdown, or data table with styled `<div>`s when the library provides the real component.
- **No parallel button/input styles** — use **`Button`** / `Field.*` / `item-*`, not one-off `rounded-lg bg-blue-600 px-4` or hand-written `btn size-xl`.
- **No invented Button props** — there is no `content` prop; use `size`, `variant`, `rounded`, `outlined`.
- **No `className='btn …'` on `Modal.Trigger` / footer `Modal.Close` / `Offcanvas.Trigger` / body `Offcanvas.Close`** — use `render={<Button … />}` (built-in offcanvas icon chrome is library-owned; see [modal.md](modal.md), [components.md#compose-button-through-render](components.md#compose-button-through-render)).
- **No large Tailwind bundles on library shells** — `Modal.Content`, `Menu.Content`, `Select.Content`, etc. are already styled.
- **No hand-rolled SVG icons** — use `@hugeicons/react` + `@hugeicons/core-free-icons` (same as docs demos). One icon family per screen.
- **No arbitrary z-index spam** — use `.z-modal`, `.z-dropdown`, `.z-tooltip`, `.z-toast` from [css-utilities.md](css-utilities.md).

### Color and theme

- **No raw palette drift** — `rose-*`, `emerald-*`, `zinc-*`, `blue-*` for semantic roles (see [theming.md](theming.md)).
- **No purple-gradient AI aesthetic** on app chrome unless the brand explicitly requires it.
- **No section-level theme flips** — one light/dark mode for the whole app shell; toggle `.dark` at root.
- **No pure `#000` / `#fff` surfaces** — use `bg-body`, `bg-surface`, `text-fg`, `text-muted`.

### Layout and content

- **No three identical feature cards** as the default pattern for in-app empty states or settings — vary layout or use a single focused empty state.
- **No filler copy** — avoid "Seamless", "Elevate", "Next-Gen", "Revolutionize". Use concrete labels tied to the action.
- **No generic demo names by default** — prefer realistic sample data (`Tifa Lockhart`, `tifa.lockhart@polyms.dev`, `47.2%`) over `John Doe` / `jane@example.com` unless the demo explicitly tests validation messages.
- **No round fake metrics** — avoid `99.99%`, `$100.00`, `1,000,000 users` when believable uneven values are easy (`47.2%`, `$1,284.50`).
- **No placeholder sections** — `// TODO`, `Lorem ipsum` blocks, or skipped empty/loading/error states in shipped UI.

### Copy tells (product UI)

Adapted from [Taste Skill](https://www.tasteskill.dev/) §9 — **labels, buttons, errors, empty states**, not marketing heroes.

- **No em-dashes (`—`)** in default UI copy — use a short second sentence, a hyphen (`-`), or restructure (`Save draft` not `Save — draft`).
- **No cute error voice** — avoid `Oops!`, `Something went wrong`, `Uh oh` as the whole message. State what failed and the next step (`Could not save changes. Check your connection and try again.`).
- **No vague empty states** — `No items yet` + one action beats `Nothing to see here`.
- Marketing-only tells (scroll cues, version footers, section-number eyebrows, logo walls) apply to **landing pages outside** this skill — not in-app product chrome.

### Motion

- Prefer **CSS transitions** on library components and `transform`/`opacity` for app-specific motion.
- Respect `prefers-reduced-motion` — disable non-essential animation when set.
- **Do not** add `window.addEventListener('scroll', ...)` for reveals; use Intersection Observer or CSS if needed.
- Do not add heavy animation libraries (Motion, GSAP) unless the user asks and the bundle cost is acceptable.

## Sample Data and Docs Demos

Live component-library demos should:

1. Show **complete compound trees** (e.g. `Modal.Header` + `Modal.Body` + `Modal.Footer`, not a bare `Modal.Content`).
2. Use **interactive state** where the component expects it (`open`, `invalid`, `disabled`, `checked`).
3. Use **natural field labels** on user-facing forms (see [Field label copy](#field-label-copy)); keep descriptions and feedback concrete, not marketing prose.
4. Match **import style** of sibling demos (`@polyms/core-ui` barrel).
5. Style overlay/menu triggers with **`render={<Button … />}`** — not `className='btn …'` on primitives (see [components.md#compose-button-through-render](components.md#compose-button-through-render)).
6. **Accordion demos:** plain text in `Accordion.Panel` — no extra `<p>` for padding; do not override core `accordion-*` with unscoped docs CSS.
7. **Collapsible demos:** custom padding on trigger/panel is OK — unlike `Accordion.Panel`, there is no built-in body wrapper.
8. **New demos:** `@hugeicons/react` for icons — avoid new inline SVG chevrons in `-views/`.

## Field Label Copy

`Field.Label` should sound like a person, not a database column — unless the screen is dense admin or data-entry.

| Surface | Label tone | Examples |
| --- | --- | --- |
| Onboarding, signup, settings, profile | Conversational question or invite | `Let me know your email?`, `What should we call you?`, `When should we remind you?` |
| Checkout, short flows | Friendly but direct | `Where should we send the receipt?`, `Cardholder name` |
| Admin tables, filters, ERP-style forms | Terse noun or noun phrase | `Email`, `Status`, `SKU`, `Owner` |

**Prefer**

- Warm, specific wording tied to the user's goal.
- Questions when it fits the moment (`?` is fine).
- `Field.Description` for policy, format hints, and reassurance — not the label.

**Avoid as default**

- Stiff CMS labels: `Work email`, `Email Address`, `Full Name`, `Phone Number`, `User Input`.
- Redundant label + placeholder (`Email` + placeholder `Enter email`).
- Marketing filler in labels (`Unlock your potential`, `Supercharge your workflow`).

```tsx
<Field required>
  <Field.Label>Let me know your email?</Field.Label>
  <Field.Control placeholder='tifa.lockhart@polyms.dev' type='email' />
  <Field.Description>We'll only use this for account updates.</Field.Description>
</Field>
```

For validation-only demos, a short noun label (`Email`) is acceptable when the MDX section focuses on `invalid` / `Field.Feedback`, not copy tone.

## Redesign

Migrating or refreshing **existing app screens** is documented in **[redesign.md](redesign.md)** — Scan → Detect mode → Diagnose → Fix → Redesign pre-flight. Do not duplicate that workflow here.

## Output Completeness

Before finishing, confirm the deliverable is **shippable**, not a sketch. Adapted from Taste Skill `output-skill` for **full implementations** (screens, demos, migrations).

### Banned output patterns (hard fail)

Do not ship or paste these in deliverables:

**In code:** `// ...`, `// rest of code`, `// implement here`, `// TODO`, `/* ... */`, `// similar to above`, `// continue pattern`, bare `...` standing in for omitted code.

**In prose:** "Let me know if you want me to continue", "for brevity", "the rest follows the same pattern", "I'll leave that as an exercise" — when the user asked for a **complete** file or screen.

**Structural:** Skeleton when the request was full implementation; first + last section with skipped middle; one example replacing repeated logic.

If output hits a token limit, stop at a **clean breakpoint** (end of file / component) and say what remains — do not compress the rest into `// ...`.

### Shippable checklist

- [ ] All user-visible strings are final (no `TODO`, `...`, lorem).
- [ ] **Empty state** when a list/table can be empty.
- [ ] **Loading state** when data is async (skeleton `.skeleton` or disabled + spinner pattern).
- [ ] **Error state** on forms (`Field invalid` + `Field.Feedback`) and failed fetches where relevant.
- [ ] **Disabled / read-only** paths shown when the demo covers them.
- [ ] Overlay containers mounted if using programmatic `showModal` / `showOffcanvas`.
- [ ] `aria-label` on icon-only `Button` and `Toolbar` roots.
- [ ] Every file / component the user requested is present — count deliverables before sending.

## Pre-Flight Check

Run before shipping UI. If any item fails, fix before delivering.

### Design system

- [ ] Components imported from `@polyms/core-ui` barrel only.
- [ ] Closest library primitive used before custom markup.
- [ ] Compound tree intact (no invented `ModalHeader`-style imports).
- [ ] Gray chrome uses `slate`; intent uses semantic tones (`primary`, `danger`, …).
- [ ] Ghost/hover surfaces use `item-*`, not hand-written `hover:bg-*`.

### Accessibility and contrast

- [ ] **Button contrast**: label readable on `btn-*` background (WCAG AA ~4.5:1).
- [ ] **Form contrast**: `Field` labels, placeholders, focus rings, and `Field.Feedback` readable on `bg-body` / `bg-input`.
- [ ] Icon-only controls have accessible names.
- [ ] Focus order sane in modals, menus, and toolbars.

### Theme

- [ ] Semantic tokens (`bg-body`, `text-fg`, `bg-surface`, `border-line`) instead of one-off hex.
- [ ] Dark mode tested when `.dark` is used — hierarchy parity in both modes.
- [ ] `dark:` overrides are rare and intentional.

### Layout and polish

- [ ] Spacing rhythm consistent (`gap-*`, section padding not random).
- [ ] **One shape system** — library `rounded` props / defaults; no random `rounded-*` mix on the same screen ([Visual consistency](#visual-consistency)).
- [ ] **Heading levels** use `.h1`–`.h6` consistently ([css-utilities.md#typography](css-utilities.md#typography)).
- [ ] Long lists use `.table`, `Tabs`, or `Menu` — not a lazy `divide-y` div stack ([Lists and collections](#lists-and-collections)).
- [ ] Mobile layout collapses cleanly (no horizontal overflow on forms/tables without scroll intent).
- [ ] Tables use `.table` utilities when showing tabular data.
- [ ] No duplicate primary actions with the same intent on one screen.

### Docs demos (when applicable)

- [ ] Demo compiles and reflects public API from `index.d.ts`.
- [ ] Sample data believable; states demonstrated match the MDX section topic.
- [ ] Hugeicons (or existing demo icon pattern), not inline SVG paths.
