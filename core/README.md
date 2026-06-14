# @polyms/core-ui

Modular React 19 UI component library for the **Polyms ecosystem** — compound components, semantic theming, programmatic overlays, and Tailwind CSS 4 utilities.

Built with Nx + Vite. Distributed via **GitHub Packages**.

## Install

This package is published to GitHub Packages under the `@polyms` scope, so consumers must point the scope at the GitHub registry and authenticate (required even for public packages).

Add a `.npmrc` to the consumer repo:

```ini
@polyms:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

`GITHUB_TOKEN` is a GitHub Personal Access Token with the `read:packages` scope. Then install:

```bash
pnpm add @polyms/core-ui
```

## Peer dependencies

- `react` >= 19.0.0
- `react-dom` >= 19.0.0

Install `zustand` in the host app when using programmatic modals or offcanvas stores:

```bash
pnpm add zustand
```

## Usage

Import components from the package barrel — avoid deep imports.

```tsx
import { Button, Field, Modal } from '@polyms/core-ui'
```

When unsure a symbol exists, open `node_modules/@polyms/core-ui/index.d.ts`.

### Inputs

```tsx
import { Checkbox, Radio, RadioGroup } from '@polyms/core-ui'

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  Accept terms
</Checkbox>

<RadioGroup name='plan' onValueChange={setPlan} value={plan}>
  <Radio value='free'>Free</Radio>
  <Radio value='pro'>Pro</Radio>
</RadioGroup>
```

## Styles

Components rely on the CSS shipped with the package. Load the Tailwind 4 source entry so tokens and layers align with your own setup:

```ts
import '@polyms/core-ui/styles/tailwind.css'
```

## Agent skill

Install the `@polyms/core-ui` agent skill into a consumer repository so Cursor, Claude Code, and other agents load usage rules automatically:

```bash
pnpm exec core-ui-skill
```

The installer copies the skill to `.cursor/skills/core-ui`, `.claude/skills/core-ui`, and `.agents/skills/core-ui`. Use `--target cursor`, `--target claude`, or `--target agents` to install only one target.

Add a script so the team can re-sync after upgrading the package:

```json
{
  "scripts": {
    "polyms:skill": "core-ui-skill --force"
  }
}
```

## Link locally (dev / dogfooding)

After building the library to `dist/core`, point the consumer `package.json` at the folder:

```json
"@polyms/core-ui": "file:./dist/core"
```

Build with:

```bash
pnpm exec nx build core
```

## Release

Releases are independent per project (see `nx.json`). Versioning runs a build first, then tags `core@{version}`; pushing that tag triggers the GitHub Packages publish workflow.

```bash
pnpm exec nx release version patch --projects=core
```

## License

MIT
