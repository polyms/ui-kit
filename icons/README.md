# @polyms/icons

Tree-shakeable **Solar BoldDuotone** icon components for the **Polyms ecosystem**. Every export is a
plain React 19 function component generated from an SVG source — no icon-data-object API, no
Context provider for defaults.

Built with Nx + Vite. Distributed via **GitHub Packages**, released **in lockstep with
`@polyms/ui-kit`** (same version number, same release pipeline).

## Install

```ini
@polyms:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

```bash
pnpm add @polyms/icons zustand
```

## Peer dependencies

- `react` >= 19.0.0
- `react-dom` >= 19.0.0

`zustand` ships as a regular dependency (icon defaults store) — no extra setup required.

## Usage

v1 ships a single entry, `@polyms/icons/bold-duotone`. Export names are short — the style already
lives in the subpath, so it's `Home`, never `HomeBoldDuotone`.

```tsx
import { Home, Sun } from '@polyms/icons/bold-duotone'

;<Home />
;<Sun size={20} color='var(--color-primary-600)' />
```

Each icon is its own module (`preserveModules` build) so importing one icon never pulls in the
other ~1400 glyphs.

### Props

```ts
type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'color'> & {
  size?: number | string // default 24
  color?: string // default 'currentColor' — primary layer
  strokeWidth?: number | string // default 1.5 (inherits to stroked children)
  secondaryColor?: string // default 'currentColor' — duotone secondary layer
  secondaryOpacity?: number // default 0.5 — overrides secondary layer opacity
}
```

- `size` sets both `width`/`height`.
- `color` is applied via inline `style.color`; primary glyph paths use `fill="currentColor"`.
- `strokeWidth` is set on the root `<svg>` (useful for stroked styles; BoldDuotone is mostly fill).
- Duotone secondary layers bind to CSS variables:
  - `--icon-secondary-color` (from `secondaryColor` / store)
  - `--icon-secondary-opacity` (from `secondaryOpacity` / store; per-path opacity is the CSS fallback)
- Any other prop (`className`, `onClick`, `aria-*`, …) spreads onto the root `<svg>`.

### Accessibility (decorative by default)

Every icon renders `aria-hidden="true"` and `focusable="false"`. There is **no** `alt`/`title` prop
— icons are always decorative by contract.

- **Icon next to visible text:** ship as-is: decorative default is correct.
- **Standalone / icon-only control** (e.g. an icon button): put the accessible name on the
  **parent control** (`<Button aria-label="Close">`, a `title`, etc.) — never on the icon itself.
  This is enforced by the `ui-kit` skill's pre-flight quality checks.
- Escape hatch: spread SVG props to override the decorative default (`<Home aria-hidden={false} />`)
  if you have a real one-off reason — not documented as the primary API.

### Global defaults — Zustand store, not Context

Defaults (`size`, `color`, `strokeWidth`, `secondaryColor`, `secondaryOpacity`) live in a Zustand
store exported from the same entry. There is **no** `SolarProvider`/Context — call the setter once
(e.g. app bootstrap) and every icon that omits those props picks them up. An explicit prop on an
icon always wins over the store default.

```tsx
import { setIconDefaults, useIconStore } from '@polyms/icons/bold-duotone'

setIconDefaults({ size: 20, strokeWidth: 1.5, secondaryOpacity: 0.4 })

// Or subscribe reactively:
const size = useIconStore((state) => state.defaults.size)
```

## Adding / overriding a glyph (maintainer)

Source of truth is SVG under `svg/`, split by provenance:

```text
icons/
  svg/
    solar/    # CC BY 4.0 — 480 Design, full BoldDuotone catalog (committed source of truth)
    polyms/   # Polyms-designed UI glyphs / overrides (not brand logos — keep marks in app assets)
  src/
    createIcon.tsx    # hand-written runtime shared by every glyph
    icon-store.ts     # Zustand defaults store
  plugins/
    icon-source.mjs           # pure SVG -> module text, unit-tested
    icons-virtual.plugin.ts   # Vite plugin: serves the entry as virtual modules, emits dist types
  types/
    bold-duotone.d.ts   # generated declarations (Nx `types` target) — the only generated file in the repo
  scripts/
    generate-types.mjs     # svg/ -> types/bold-duotone.d.ts
    *.test.mjs             # layout / provenance / migrate / dist smoke gates
```

**No glyph component is generated into `src/`.** During dev and tests the Vite plugin serves
`@polyms/icons/bold-duotone` (and each glyph) as a virtual module read straight from `svg/`; the
library build turns the same graph into real `dist/icons/bold-duotone/<Name>.mjs` files, so
published consumers need nothing but the tarball.

1. Drop a valid **UI icon** SVG into `svg/polyms/<Name>.svg` (PascalCase filename = export name).
   Do **not** put brand logos / wordmarks here — `polyms/` is for Polyms-designed glyphs that
   belong in the icon set (gap-fill or Solar overrides), same visual role as `solar/`.
2. Run `pnpm exec nx run icons:types` so TypeScript and editors know the new export name. Dev,
   tests and `nx build icons` pick the SVG up on their own.
3. `polyms/` always wins on a name clash with `svg/solar/` — use this to override a Solar glyph
   without touching vendored files.
4. An SVG parse error or non-identifier filename fails the build (non-zero exit) — no partial
   output is ever published.

## License

- Package code: MIT (see `LICENSE`).
- `svg/solar/` glyphs + the components built from them: **Solar Icons** by 480 Design, **CC BY 4.0**.
  See `LICENSE` for the full attribution notice.
- `svg/polyms/` glyphs: Polyms-owned, MIT.
- No `@hugeicons/*` assets or code are vendored anywhere in this package.
