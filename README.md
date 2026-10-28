# UI Kit

Modular React 19 UI component library for the **Polyms ecosystem** — compound components, semantic theming, programmatic overlays, and Tailwind CSS 4 utilities.

Open source, distributed via **registry.polyms.dev** as [`@polyms/ui-kit`](./ui-kit/README.md).

Monorepo powered by **Nx** + **pnpm**, formatted and linted with **Biome**.

## Packages

| Path      | Package          | Description                                                          |
| --------- | ---------------- | -------------------------------------------------------------------- |
| `ui-kit/` | `@polyms/ui-kit` | Reusable React components + styles. Built with Vite → `dist/ui-kit`. |
| `web/`    | —                | Public website (TanStack Router + MDX, live demos).                  |
| `docs/`   | —                | Agent/domain docs (ai-kit): `agents/`, `adr/`, `prd/`.               |

## Tech stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · `@base-ui/react` · Floating UI · Zustand · Vitest + Testing Library.

## Getting started

```bash
pnpm install
```

```bash
pnpm dev          # serve the web site
pnpm build        # build @polyms/ui-kit → dist/ui-kit
pnpm test         # run Vitest for ui-kit
pnpm check        # biome + prettier auto-fix
```

Run a task directly through Nx when needed:

```bash
pnpm exec nx serve ui-kit      # dev server for the library
pnpm exec nx build web         # build the web site
pnpm exec nx show project ui-kit
pnpm exec nx graph
```

## Consuming the library

See [`ui-kit/README.md`](./ui-kit/README.md) for install, peer dependencies, styles, and usage. Quick version:

```ini
# consumer .npmrc
@polyms:registry=https://registry.polyms.dev/npm
```

```bash
pnpm add @polyms/ui-kit
```

## Release & publish

Releases version `ui-kit` and `web` together (`nx.json`). Versioning builds first, then tags `v{version}` (for example `v2.0.0-alpha.2`); pushing that tag triggers the **Build and Deploy** workflow, which publishes `@polyms/ui-kit` to GitHub Packages. Installs still go through registry.polyms.dev, which proxies that packument.

```bash
pnpm exec nx release version patch --projects=ui-kit
git push --follow-tags
```

The web site deploys via Vercel (`pnpm nx build web` → `dist/web`).

## Contributing

Read [`AGENTS.md`](./AGENTS.md) — the single source of truth for conventions, file structure, styling rules, and testing patterns for both human contributors and AI agents.

## License

[MIT](./LICENSE) © Polyms
