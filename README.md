# Core UI

Modular React 19 UI component library for the **Polyms ecosystem** — compound components, semantic theming, programmatic overlays, and Tailwind CSS 4 utilities.

Open source, distributed via **GitHub Packages** as [`@polyms/core-ui`](./core/README.md).

Monorepo powered by **Nx** + **pnpm**, formatted and linted with **Biome**.

## Packages

| Path    | Package           | Description                                                           |
| ------- | ----------------- | --------------------------------------------------------------------- |
| `core/` | `@polyms/core-ui` | Reusable React components + styles. Built with Vite → `dist/core`.    |
| `docs/` | —                 | Documentation site (TanStack Router + MDX, live demos). GitHub Pages. |

## Tech stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · `@base-ui/react` · Floating UI · Zustand · Vitest + Testing Library.

## Getting started

```bash
pnpm install
```

```bash
pnpm dev          # serve the docs site
pnpm build        # build @polyms/core-ui → dist/core
pnpm test         # run Vitest for core
pnpm check        # Biome lint + format check
pnpm check:fix    # apply Biome fixes
```

Run a task directly through Nx when needed:

```bash
pnpm exec nx serve core      # dev server for the library
pnpm exec nx build docs      # build the docs site
pnpm exec nx show project core
pnpm exec nx graph
```

## Consuming the library

See [`core/README.md`](./core/README.md) for install (GitHub Packages auth), peer dependencies, styles, and usage. Quick version:

```ini
# consumer .npmrc
@polyms:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

```bash
pnpm add @polyms/core-ui
```

> GitHub Packages requires authentication to install, even for public packages — by design for the Polyms ecosystem.

## Release & publish

Releases are independent per project (`nx.json`). Versioning builds first, then tags `core@{version}`; pushing that tag triggers the **Build and Deploy** workflow which publishes `@polyms/core-ui` to GitHub Packages.

```bash
pnpm exec nx release version patch --projects=core
git push --follow-tags
```

The docs site deploys to GitHub Pages on push to the `docs` branch.

## Contributing

Read [`AGENTS.md`](./AGENTS.md) — the single source of truth for conventions, file structure, styling rules, and testing patterns for both human contributors and AI agents.

## License

[MIT](./LICENSE) © Polyms
