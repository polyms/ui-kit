# Hướng dẫn cho AI agents và contributors

File **nguồn chính** cho Cursor, Claude, các IDE tích hợp AI, và bất kỳ agent nào làm việc trên repo này. (Không chỉ GitHub Copilot — tránh phụ thuộc vào `.github/copilot-instructions.md` làm bản duy nhất.)

**Core-UI** là thư viện UI React modular; monorepo **Nx** + **pnpm**; format/lint **Biome**.

---

## Tổng quan

| Khu vực | Vai trò                                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| `core/` | Component tái sử dụng + style; build Vite → `dist/core`, package **`@polyms/core-ui`** (theo metadata Nx). |
| `docs/` | Site tài liệu: **TanStack Router**, **MDX**, demo live.                                                    |

**Stack chính:** React 19, TypeScript (strict), Vite 8, Tailwind CSS 4, `@base-ui/react`, Floating UI, Vitest + Testing Library, Zustand (ví dụ modal), shiki (highlight trong docs).

---

## Cấu trúc & đường dẫn quan trọng

**Core**

- `core/src/<feature>/` — mỗi feature một thư mục (`button/`, `modal/`, …): `Component.tsx`, `index.ts`, test `*.test.tsx`.
- `core/src/styles/` — CSS theo component dạng **`_component-name.css`** (import/layer tập trung, không nhất thiết `styles/` con trong từng component).
- `core/plugins/module-federation.plugin.ts` — Module Federation / dynamic imports.
- `core/vite.config.mts` — cấu hình Vite cho library.

**Docs**

- `docs/src/pages/` — route file-based + **`.mdx`** (nhóm theo thư mục, ví dụ `pages/docs/button.mdx`).
- `docs/src/pages/docs/-views/` — demo/preview cho tài liệu.
- `docs/src/layouts/` — `AppSidebar.tsx`, `DocsToc.tsx`, `CodePreview.tsx`, …
- `docs/plugins/mdxNavigation.plugin.ts` — sinh module ảo **`virtual:mdx-navigation`** (scan MDX, frontmatter `title`, nhóm theo cây thư mục).
- `docs/src/mdx-navigation.d.ts` — khai báo TypeScript cho module ảo.
- `docs/vite.config.mts` — Vite cho site docs.
- **`routeTree.gen.ts`** — generate (TanStack Router); **không sửa tay**.

**Gốc repo**

- `nx.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `biome.json`

---

## Lệnh thường dùng

Ưu tiên **pnpm** (đồng bộ với `package.json`):

```bash
pnpm dev                    # nx serve docs — site tài liệu
pnpm exec nx serve core     # dev server trực tiếp cho core (nếu cần)
pnpm build                  # nx build
pnpm test                   # nx test core — Vitest
pnpm lint                   # biome lint .
pnpm check                  # biome check .
pnpm check:fix              # biome check --write .
pnpm release                # nx release … — project core (xem nx.json)
```

Tương đương: `pnpm exec nx build core`, `pnpm exec nx build docs`, `pnpm exec nx test core --watch`, `pnpm exec nx test core -- --coverage`.

Tra cứu target: `pnpm exec nx show project core`, `pnpm exec nx show project docs`, `pnpm exec nx graph`.

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
- Style component: file **`core/src/styles/_tên-component.css`** và pattern import hiện có.
- **Màu xám:** dùng **`--color-slate-*`**, không dùng `--color-neutral-*` (ví dụ `var(--color-slate-400)`).

### Component & state

- Chỉ **function components + hooks** (trừ khi có lý do đặc biệt).
- State chia sẻ: **React Context** (ví dụ offcanvas); hook đặt tên **`use<Feature>`** (`useValidation.ts`, …), đặt cạnh feature.

### Base UI — `useRender`

Khi dựng primitive với **`useRender`**:

```tsx
import { useRender } from '@base-ui/react/use-render'
import clsx from 'clsx'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type ComponentProps = useRender.ComponentProps<'div'>

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export function Component({ className, render, ...props }: ComponentProps) {
  const element = useRender({
    defaultTagName: 'div',
    ref: props.ref,
    render,
    props: {
      ...props,
      className: clsx('component-class', className),
    },
  })

  return element
}
```

- Typing: `useRender.ComponentProps<'tagname'>` (có sẵn prop `render`).
- React 19: `ref` truyền qua `props.ref` vào `useRender`; **không cần** `forwardRef` cho pattern này.

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

1. Thêm **`*.mdx`** dưới `docs/src/pages/` (ví dụ `docs/src/pages/docs/foo.mdx`).
2. **Frontmatter** có **`title`** để sidebar hiển thị.
3. Navigation do plugin quét file — không cần đăng ký tay; type trong **`docs/src/mdx-navigation.d.ts`**.
4. Khi đổi API component công khai: cập nhật trang MDX tương ứng và demo trong **`-views/`** nếu có.

Plugin/virtual module: dùng **`gray-matter`** cho frontmatter; virtual ID trong Vite thường resolve với prefix **`\\0`** — bám theo plugin hiện có.

---

## Tài liệu cho consumer (`AI.md`)

File **`core/AI.md`** được copy vào **`dist/core`** khi build (cùng cơ chế `*.md` trong Vite) và đi kèm package **`@polyms/core-ui`**. Khi đổi cách tiêu thụ công khai (import style, peer deps, quy ước compose UI), cập nhật **`core/AI.md`** và **`core/README.md`** cho đồng bộ.

---

## Liên kết local `core`

Trong app consumer thử nghiệm:

```json
"@polyms/core-ui": "file:./dist/core"
```

(Sau `nx build core`.)

---

## Ghi chú cho agent

- **TypeScript strict** — khai báo type đầy đủ; tránh `any` không cần thiết.
- Thêm virtual module mới trong docs → bổ sung **`.d.ts`** tương ứng trong `docs/src/`.
- Không chỉnh tay **`routeTree.gen.ts`**; để generator/router tool cập nhật.

**Editor (VS Code / Cursor):** format on save với Biome; organize imports / fixAll theo setting workspace nếu có.

---

## Release

`nx.json`: release độc lập cho `core` và `docs`; tag `{projectName}@{version}`; `preVersionCommand` chạy build — đảm bảo **build pass** trước khi release.

---

## Rule theo file (Cursor)

Chi tiết theo glob có thể đặt trong **`.cursor/rules/*.mdc`**. Nếu mâu thuẫn, ưu tiên quy ước đã chứng minh trong code và file này.

---

## Tài liệu tham khảo

- [Nx](https://nx.dev) · [pnpm](https://pnpm.io) · [Vitest](https://vitest.dev)
- [TanStack Router](https://tanstack.com/router) · [MDX](https://mdxjs.com) · [Vite](https://vitejs.dev)

Cập nhật file này khi kiến trúc hoặc quy trình repo thay đổi.
