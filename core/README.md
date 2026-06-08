# core

This library was generated with [Nx](https://nx.dev).

## Link local

Add to package.json

```json
"@polyms/core-ui": "file:./dist/core"
```

## Agent skill

Install the `@polyms/core-ui` agent skill into a consumer repository so Cursor, Claude Code, and other agents can load usage rules automatically:

```bash
pnpm exec core-ui-skill
```

The installer copies the skill to `.cursor/skills/core-ui`, `.claude/skills/core-ui`, and `.agents/skills/core-ui`. Use `--target cursor`, `--target claude`, or `--target agents` to install only one target.

Add a script to `package.json` so the team can re-run it after upgrading the package:

```json
{
  "scripts": {
    "polyms:skill": "core-ui-skill --force"
  }
}
```

Then run `pnpm polyms:skill` to sync the skill with the installed version.

## Inputs

Use exported React components for form primitives:

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
