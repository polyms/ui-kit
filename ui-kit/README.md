# @polyms/ui-kit

Modular React 19 UI component library for the **Polyms ecosystem** — compound components, semantic theming, programmatic overlays, and Tailwind CSS 4 utilities.

Built with Nx + Vite. Distributed via **registry.polyms.dev**.

## Install

Point the `@polyms` scope at the Polyms registry. No token is required.

Add a `.npmrc` to the consumer repo:

```ini
@polyms:registry=https://registry.polyms.dev/npm
```

Then install:

```bash
pnpm add @polyms/ui-kit
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
import { Button, Field, Modal } from '@polyms/ui-kit'
```

When unsure a symbol exists, open `node_modules/@polyms/ui-kit/index.d.ts`.

### Inputs

```tsx
import { Checkbox, Radio, RadioGroup } from '@polyms/ui-kit'

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
import '@polyms/ui-kit/styles/tailwind.css'
```

## Agent skill

Install the `@polyms/ui-kit` agent skill into a consumer repository so Cursor, Claude Code, and other agents load usage rules automatically:

```bash
pnpm exec ui-kit-skill
```

The installer writes the skill to `.agents/skills/ui-kit`. Codex reads that folder. `.cursor/skills/ui-kit`, `.claude/skills/ui-kit`, and `.github/skills/ui-kit` are symlinks for Cursor, Claude Code, and Copilot. `--target cursor`, `--target claude`, or `--target copilot` still writes `.agents` when it is missing, then links only that tool. `--target codex` and `--target agents` write the folder and skip the symlinks.

Add a script so the team can re-sync after upgrading the package:

```json
{
  "scripts": {
    "polyms:skill": "ui-kit-skill --force"
  }
}
```

## Link locally (dev / dogfooding)

After building the library to `dist/ui-kit`, point the consumer `package.json` at the folder:

```json
"@polyms/ui-kit": "file:./dist/ui-kit"
```

Build with:

```bash
pnpm exec nx build ui-kit
```

## Release

Releases version this package together with the docs site (see `nx.json`). Versioning runs a build first, then tags `v{version}` (for example `v1.0.6-alpha.0`); pushing that tag triggers the publish workflow.

```bash
pnpm exec nx release version patch --projects=ui-kit
```

## License

MIT
