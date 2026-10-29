# Hướng dẫn cho AI agents và contributors

File **nguồn chính** cho Cursor, Claude, các IDE tích hợp AI, và bất kỳ agent nào làm việc trên repo này. (Không chỉ GitHub Copilot — tránh phụ thuộc vào `.github/copilot-instructions.md` làm bản duy nhất.)

**UI Kit** là thư viện UI React modular; monorepo **Nx** + **pnpm**; format/lint **Biome**.

## Agent skills

### Documentation language

Written docs (`CONTEXT.md`, ADRs, PRDs, design specs, `docs/agents/*.md`) are in **Vietnamese**. Public end-user docs under `web/src/pages/` and their live demos stay in **English**, matching the site. Chat tone still matches whichever language the user writes in.

See `docs/agents/language.md`.

### Issue tracker

GitHub issues on **polyms/ui-kit** via `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

### Triage labels

Canonical roles mapped to tracker labels. See `docs/agents/triage-labels.md`.

### Design

UI specs and `@polyms/ui-kit` pointers; **Figma token board** link and page structure for new sessions. See `docs/agents/design.md`.

### Pipeline

Idea → `/align` → `/pm` or `/to-prd` → `/to-issues` → `/design` → `/dev`; raw issues via `/triage`. PRDs in `docs/prd/`; ADRs in `docs/adr/`; glossary in `CONTEXT.md`.

---

## Tổng quan

| Khu vực   | Vai trò                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| `ui-kit/` | Component tái sử dụng + style; build Vite → `dist/ui-kit`, package **`@polyms/ui-kit`** (theo metadata Nx). |
| `web/`    | Site công khai: **TanStack Router**, **MDX**, demo live (URL `/docs/...`).                                  |
| `docs/`   | Domain/ai-kit: `agents/`, `adr/`, `prd/` — không phải Nx app.                                               |

**Stack chính:** React 19, TypeScript (strict), Vite 8, Tailwind CSS 4, `@base-ui/react`, Floating UI, Vitest + Testing Library, Zustand (ví dụ modal), shiki (highlight trong docs).

---

## Cấu trúc & đường dẫn quan trọng

**UI Kit**

- `ui-kit/src/<feature>/` — mỗi feature một thư mục (`button/`, `modal/`, …): `Component.tsx`, `index.ts`, test `*.test.tsx`.
- `ui-kit/src/styles/` — CSS theo component dạng **`_component-name.css`** (import/layer tập trung, không nhất thiết `styles/` con trong từng component).
- `ui-kit/plugins/module-federation.plugin.ts` — Module Federation / dynamic imports.
- `ui-kit/vite.config.mts` — cấu hình Vite cho library.

**Web**

- `web/src/pages/` — route file-based + **`.mdx`** (nhóm theo thư mục, ví dụ `pages/docs/button.mdx` → URL `/docs/button`).
- `web/src/pages/docs/-views/` — demo/preview cho tài liệu.
- `web/src/layouts/` — `AppSidebar.tsx`, `DocsToc.tsx`, `CodePreview.tsx`, …
- `web/src/styles/` — CSS riêng site (ví dụ **`_details.css`** — API Reference accordion scoped `.api-reference`; giữ comment section trong file).
- `web/plugins/mdxNavigation.plugin.ts` — sinh module ảo **`virtual:mdx-navigation`** (scan MDX, frontmatter `title`, nhóm theo cây thư mục).
- `web/src/mdx-navigation.d.ts` — khai báo TypeScript cho module ảo.
- `web/vite.config.mts` — Vite cho site.
- **`routeTree.gen.ts`** — generate (TanStack Router); **không sửa tay**.

**Docs (ai-kit)**

- `docs/agents/` — language, issue-tracker, domain, design, triage-labels.
- `docs/adr/` — ADRs.
- `docs/prd/` — PRD mirrors.

**Gốc repo**

- `nx.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `biome.json`

---

## Lệnh thường dùng

Ưu tiên **pnpm** (đồng bộ với `package.json`):

```bash
pnpm dev                    # nx serve web — site tài liệu
pnpm exec nx serve ui-kit     # dev server trực tiếp cho ui-kit (nếu cần)
pnpm build                  # nx build
pnpm test                   # nx test ui-kit — Vitest
pnpm check                  # biome check --write . && prettier -l --write .
pnpm release                # nx release version patch — ui-kit + web, tag v{version}
```

Tương đương: `pnpm exec nx build ui-kit`, `pnpm exec nx build web`, `pnpm exec nx test ui-kit --watch`, `pnpm exec nx test ui-kit -- --coverage`.

Tra cứu target: `pnpm exec nx show project ui-kit`, `pnpm exec nx show project web`, `pnpm exec nx graph`.

---

## Quy ước code

### Phạm vi thay đổi

Chỉ sửa phần liên quan task; tránh refactor rộng không được yêu cầu. Tuân **Biome** (`biome.json`): quote đơn, `lineWidth` 110, `useSortedClasses` với `clsx`, v.v.

### Cấu trúc file TS/TSX — separator (bắt buộc)

Thứ tự: **import** → (optional) **Types** → **Components**.

Mỗi section có dòng phân cách đúng **110 ký tự** tổng cộng (kể cả `//` và khoảng trắng):

- Mẫu: `// ── SectionName ─` + nối `-` cho đủ 110 ký tự.
- Luôn dùng tiền tố `// ──` (hai gạch sau khoảng).
- Có type → section **Types** trước **Components**; không có type → bỏ hẳn section Types; file chỉ test/logic không component → chỉnh cho phù hợp (xem file hiện có).

Ví dụ rút gọn (độ dài dòng separator trong repo phải khớp 110):

```tsx
// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────
// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────
```

### Styling

- **Tailwind** + `clsx()`; class có thể bị sort bởi Biome.
- Style component: file **`ui-kit/src/styles/_tên-component.css`** và pattern import hiện có.
- **Màu xám:** dùng **`--color-neutral-*`** (ví dụ `var(--color-neutral-400)`). Không dùng `zinc-*`, `gray-*`, hay `stone-*` cho chrome.
- **Phối transparent (idle/hover/active):** mọi component có state kiểu _ghost_ (transparent idle + tinted hover) phải nhất quán với pattern **`.item-*`** trong **`ui-kit/src/styles/_utilities.css`** — đây là single source of truth cho phối transparent của design system. Trong CSS riêng của component, tokenize bằng CSS variables + **`color-mix(in oklab, var(--variant) 10%, transparent)`** (như `_button.css` và `_toolbar.css` đang làm). Không hardcode hex hay tự ý dùng các thang màu khác (`zinc-*`, `blue-*`, `rose-*`, …).
- **CSS-only classes mà consumer dùng được:** khi expose một utility CSS (badge/chip/link/item/...), nhớ cập nhật **`ui-kit/skills/ui-kit/css-utilities.md`** (section _CSS-Only Classes_ và _Interactive State Utilities_) để consumer agents biết.
- **Comment section trong file CSS:** `ui-kit/src/styles/_*.css`, `web/src/styles/_*.css`, … thường có comment phân vùng ngắn trước block rule (ví dụ `/* Trigger button styling */`, `/* Panel styling */` trong **`web/src/styles/_details.css`**). **Không tự ý xóa** các comment kiểu này khi refactor, scope selector, hay format — chúng giúp điều hướng file dài. Khi thêm block rule mới cùng file, tiếp tục pattern tương tự nếu block tách rõ concern; chỉ bỏ comment khi xóa hẳn block rule đi kèm.

### Component & state

- Chỉ **function components + hooks** (trừ khi có lý do đặc biệt).
- State chia sẻ: **React Context** (ví dụ offcanvas); hook đặt tên **`use<Feature>`** (`useValidation.ts`, …), đặt cạnh feature.

### Base UI — `useRender` + `mergeProps`

Khi dựng primitive với **`useRender`**, merge default props với consumer qua **`mergeProps`** (`className` / `style` / handlers chain đúng; **`ref` không** được `mergeProps` — truyền qua option `ref` của `useRender`, kể cả mảng):

```tsx
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ComponentProps = useRender.ComponentProps<'div'>

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Component({ className, render, ref, ...props }: ComponentProps) {
  return useRender({
    defaultTagName: 'div',
    ref,
    render,
    props: mergeProps<'div'>({ className: clsx('component-class', className) }, props),
  })
}
```

- Typing: `useRender.ComponentProps<'tagname'>` (có sẵn prop `render`).
- React 19: `ref` truyền vào `useRender({ ref })`; **không cần** `forwardRef` cho pattern này.
- Trong `ui-kit/`: import trực tiếp `@base-ui/react/…` như trên. Consumer app: import `mergeProps` / `useRender` từ barrel `@polyms/ui-kit`.

---

## Testing (Vitest + RTL)

Cấu trúc tham khảo:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('ComponentName', () => {
  it('should do something', async () => {
    const user = userEvent.setup()
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

- Import **`describe` / `it` / `expect` / `vi`** từ **`vitest`**.
- Ưu tiên **`screen`** (`getByRole`, `getByText`, `getByTestId`) thay vì truy container tùy tiện.
- **Portal / Floating UI:** dùng `document.querySelector(...)`, `getByTestId`, hoặc `getByRole(..., { hidden: true })` khi cần.
- Tên file: **`ComponentName.test.tsx`** cạnh component.
- Tương tác: **`userEvent.setup()`** cho thao tác gần với user.

---

## Tài liệu (MDX)

1. Thêm **`*.mdx`** dưới `web/src/pages/` (ví dụ `web/src/pages/docs/foo.mdx` → URL `/docs/foo`).
2. **Frontmatter** có **`title`** để sidebar hiển thị.
3. Navigation do plugin quét file — không cần đăng ký tay; type trong **`web/src/mdx-navigation.d.ts`**.
4. Khi đổi API component công khai: cập nhật trang MDX tương ứng và demo trong **`-views/`** nếu có.

**Giọng end-user (chỉ site `web/`):** trang hướng người **dùng** `@polyms/ui-kit` trong app — không mô tả monorepo, Base UI stack, đường dẫn `ui-kit/src/…`, hay wiring nội bộ site. Bảng so sánh dùng **JSX table** (GFM `| … |` không render trong MDX setup hiện tại). Chi tiết: **`.cursor/rules/docs-mdx-end-user-voice.mdc`** (kèm **`docs-mdx-heading-style.mdc`** cho heading).

Plugin/virtual module: dùng **`gray-matter`** cho frontmatter; virtual ID trong Vite thường resolve với prefix **`\\0`** — bám theo plugin hiện có.

---

## Tài liệu cho consumer agent (`ui-kit` skill)

Thư mục **`ui-kit/skills/ui-kit/`** là nguồn chính cho agent guidance consumer và được copy vào **`dist/ui-kit/skills/ui-kit`** khi build. Khi đổi cách tiêu thụ công khai (import style, peer deps, quy ước compose UI), cập nhật skill tương ứng trong **`ui-kit/skills/ui-kit/`** và **`ui-kit/README.md`** cho đồng bộ.

Repo này tự dùng cùng skill qua symlink **`.agents/skills/ui-kit`** trỏ về **`ui-kit/skills/ui-kit`**; không tạo bản copy thứ hai để tránh drift.

Mọi skill của repo nằm ở **`.agents/skills`**. **`.cursor/skills`**, **`.claude/skills`**, **`.github/skills`** và **`.gemini/skills`** là symlink cả folder tới đó (Codex đọc `.agents/skills` trực tiếp). Thêm skill mới chỉ cần tạo trong `.agents/skills` — không link từng skill sang từng tool.

---

## Component công khai — đủ ba artifact

Khi thêm component công khai (thư mục `ui-kit/src/<feature>/`, export trên barrel), **cùng một thay đổi** phải có đủ cả ba. Mục này là nguồn; bản canonical `.agents/rules/public-component-artifacts.mdc` chỉ trỏ về đây. `.cursor/rules/public-component-artifacts.mdc` là symlink tới bản đó.

1. **Feature map** — ghi route `/docs/<slug>` vào mục _How to get to it (user POV)_ của file khu vực khớp trong `.agents/skills/feature-map/references/features/` (index `README.md`; pointer `docs/agents/feature-map.md`). Trang guide chuẩn (TOC, Preview/Code, API Reference) thuộc `component-guides.md`. Không tạo area mới cho từng component, không sửa bản symlink, không sửa `routeTree.gen.ts`.
2. **Docs tiếng Anh** — `web/src/pages/docs/<slug>.mdx` với frontmatter `title`, cộng demo trong `web/src/pages/docs/-views/<slug>/` nếu component tương tác.
3. **Consumer skill** — một dòng trong bảng _Skill routing_ của `ui-kit/skills/ui-kit/SKILL.md`, cộng mục trong file topic khớp (`inputs.md` hoặc topic tương ứng). Chỉ sửa `ui-kit/skills/ui-kit/`; `.agents/skills/ui-kit` là symlink.

---

## Liên kết local `ui-kit`

Trong app consumer thử nghiệm:

```json
"@polyms/ui-kit": "file:./dist/ui-kit"
```

(Sau `nx build ui-kit`.)

---

## Ghi chú cho agent

- **TypeScript strict** — khai báo type đầy đủ; tránh `any` không cần thiết.
- Thêm virtual module mới trong `web/` → bổ sung **`.d.ts`** tương ứng trong `web/src/`.
- Không chỉnh tay **`routeTree.gen.ts`**; để generator/router tool cập nhật.

**Editor (VS Code / Cursor):** format on save với Biome; organize imports / fixAll theo setting workspace nếu có.

---

## Release

`nx.json`: release cố định cho `ui-kit` và `web` (cùng version); tag `v{version}` (ví dụ `v1.0.6-alpha.0`); `preVersionCommand` chạy build — đảm bảo **build pass** trước khi release.

---

## Rule theo file (Cursor)

Chi tiết theo glob có thể đặt trong **`.cursor/rules/*.mdc`**. Nếu mâu thuẫn, ưu tiên quy ước đã chứng minh trong code và file này.

---

## Tài liệu tham khảo

- [Nx](https://nx.dev) · [pnpm](https://pnpm.io) · [Vitest](https://vitest.dev)
- [TanStack Router](https://tanstack.com/router) · [MDX](https://mdxjs.com) · [Vite](https://vitejs.dev)

Cập nhật file này khi kiến trúc hoặc quy trình repo thay đổi.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
