---
name: core-ui
description: >-
  Build and review UI with @polyms/core-ui (React 19, compound components, semantic theming, CSS utilities).
  Entry skill — open routing table below before coding. Sub-files: redesign, brandkit, setup, field, modal,
  components, theming, css-utilities, quality. Form in overlay → field.md + modal.md.
---

# @polyms/core-ui

`@polyms/core-ui` **is** the design system — no shadcn/ui, Fluent, Carbon, or parallel libraries for the same surfaces.

## Skill routing

Load **every** matched file before generating code.

| Triggers (keywords / intent)                                                                                                               | Read                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| migrate, migration, redesign, refresh, modernise, legacy, overhaul, re-skin, preserve brand, swap to core-ui, existing screen, visual debt | [redesign.md](redesign.md)                                                                                                                                              |
| brand, rebrand, BRAND.md, theme.css, primary color, accent, identity                                                                       | [brandkit.md](brandkit.md)                                                                                                                                              |
| new app, install, styles import, app shell, containers                                                                                     | [setup.md](setup.md)                                                                                                                                                    |
| toast, notification, snackbar, Toast.useToastManager                                                                                       | [setup.md](setup.md#toast) · [components.md](components.md#toast)                                                                                                       |
| form, field, Field.Floating, textarea, debounce, validation                                                                                | [field.md](field.md) · label tone [quality.md#field-label-copy](quality.md#field-label-copy)                                                                            |
| modal, dialog, offcanvas, drawer, showModal, showOffcanvas, blocking confirmation, delete confirm                                          | [modal.md](modal.md) — not Toast / Popover / Tooltip                                                                                                                    |
| form in modal/offcanvas, modal form, filter panel, side panel with form, create/edit in dialog                                             | [field.md](field.md) + [modal.md](modal.md)                                                                                                                             |
| Button, CTA, icon button, btn styling, render prop                                                                                         | [components.md#button](components.md#button) · [compose through render](components.md#compose-button-through-render)                                                    |
| Menu, NavigationMenu, Toolbar, Checkbox, Radio, Select, Tabs, listbox, tab panel                                                           | [components.md](components.md) · [select](components.md#select) · [tabs](components.md#tabs)                                                                            |
| Switch, Popover, Tooltip, Toggle, ToggleGroup                                                                                              | [components.md#switch](components.md#switch) · [popover](components.md#popover) · [tooltip](components.md#tooltip) · [toggle](components.md#toggle)                     |
| Avatar, Breadcrumb, Accordion, FAQ, expand/collapse                                                                                        | [components.md#avatar](components.md#avatar) · [breadcrumb](components.md#breadcrumb) · [accordion](components.md#accordion) · [collapsible](components.md#collapsible) |
| Alert, banner, inline status, dismissible feedback                                                                                         | [components.md#alert](components.md#alert)                                                                                                                              |
| NumberField, quantity, stepper, numeric input                                                                                              | [components.md#numberfield](components.md#numberfield)                                                                                                                  |
| Spinner, loading indicator, async pending                                                                                                  | [components.md#spinner](components.md#spinner) · layout placeholders → [css-utilities.md](css-utilities.md)                                                             |
| dynamic import, React.lazy, code split, lazy route, module federation                                                                      | [components.md#dynamic-import](components.md#dynamic-import)                                                                                                            |
| dark mode, slate, semantic tones, bg-body, text-fg                                                                                         | [theming.md](theming.md)                                                                                                                                                |
| table, badge, item-*, link utilities                                                                                                       | [css-utilities.md](css-utilities.md)                                                                                                                                    |
| anti-slop, copy tells, output completeness, pre-flight, field label tone                                                                   | [quality.md](quality.md)                                                                                                                                                |
| docs demo, `-views/`, MDX live preview                                                                                                     | [quality.md#sample-data-and-docs-demos](quality.md#sample-data-and-docs-demos)                                                                                          |
| library component, maintainer, change compound API                                                                                         | [quality.md#maintainer](quality.md#maintainer)                                                                                                                          |

**Pairs:** rebrand existing app → **redesign.md** then **brandkit.md**. Form in overlay → **field.md** + **modal.md** (both pre-flights).

**Disambiguation:** blocking **confirmation** (delete, irreversible) → **Modal** + `Modal.Close`, not Toast. `side panel` / `filter panel` **with form fields** → [field.md](field.md) + [modal.md](modal.md). `panel` as page layout chrome → your layout, not necessarily an overlay.

## Hard rules (always)

1. Barrel import only — `import { … } from '@polyms/core-ui'`; trust `index.d.ts` over memory.
2. `slate` chrome + semantic tones (`primary`, `danger`, …) — [theming.md](theming.md).
3. Compound trees intact — no `ModalHeader`-style invented imports.
4. `item-*` for ghost hover surfaces; library shells are not Tailwind rewrite targets.
5. `@hugeicons/react` for icons — no hand-rolled SVG paths.
6. Ship complete UI — [quality.md](quality.md) (copy tells, output completeness, pre-flight).

**Frequent mistakes:** conversational `Field.Label` ([quality.md#field-label-copy](quality.md#field-label-copy)); `Modal.Trigger` / footer `Modal.Close` / `Offcanvas.Trigger` / body `Offcanvas.Close` via `render={<Button … />}` ([components.md#compose-button-through-render](components.md#compose-button-through-render), [modal.md](modal.md)); no invented `content` prop on `Button`.

## Workflow

1. Match [routing](#skill-routing) → open every file for the task.
2. One-line **task read** — [quality.md#task-read-before-generating](quality.md#task-read-before-generating).
3. Confirm symbols in `index.d.ts`.
4. Run [pre-flight](quality.md#pre-flight-check) + topical pre-flight when triggered: [field](field.md#pre-flight) · [modal](modal.md#pre-flight) · [redesign](redesign.md#redesign-pre-flight) · [brandkit](brandkit.md#brand-pre-flight).

App shell (styles, Toast, overlay containers, `zustand`): [setup.md#app-shell](setup.md#app-shell).
