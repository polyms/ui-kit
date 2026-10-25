---
description: >-
  CSS-only utility rules — table, badge, card, link, item-*, skeleton, typography.
  Use when no React component fits.
---

# CSS utilities

When no React component exists, use the class page linked from https://ui.polyms.dev/llms.txt.

| Need              | Doc                                    | Rule                                                                                     |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| Table             | https://ui.polyms.dev/docs/table.md    | Semantic `<table>` plus `.table`. There is no `Table` component.                         |
| Badge             | https://ui.polyms.dev/docs/badge.md    | Static label. Not an interactive row.                                                    |
| Card              | https://ui.polyms.dev/docs/card.md     | `.card` and `.card-body`.                                                                |
| Link              | https://ui.polyms.dev/docs/link.md     | `.link` plus a tone. `.stretched-link` needs a positioned parent.                        |
| Ghost row or chip | https://ui.polyms.dev/docs/item.md     | `.item-*`. Selected state is `.active`. Do not hand-write `hover:bg-*` for the same job. |
| Skeleton          | https://ui.polyms.dev/docs/skeleton.md | `.skeleton` for layout placeholders.                                                     |
| Heading scale     | https://ui.polyms.dev/typography.md    | `.h1` through `.h6`, not a mix of `text-2xl` for the same level.                         |
| Stacking          | https://ui.polyms.dev/docs/z-index.md  | `.z-modal`, `.z-toast`, and the other named layers.                                      |

If `Button`, `Menu`, `Toolbar`, or another component fits, use the component instead of the class.
