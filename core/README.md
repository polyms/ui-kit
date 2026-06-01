# core

This library was generated with [Nx](https://nx.dev).

## Link local

Add to package.json

```json
"@polyms/core": "file:./dist/core"
```

## Inputs

Use exported React components for form primitives:

```tsx
import { Checkbox, Radio, RadioGroup } from '@polyms/core'

<Checkbox checked={accepted} onCheckedChange={setAccepted}>
  Accept terms
</Checkbox>

<RadioGroup name='plan' onValueChange={setPlan} value={plan}>
  <Radio value='free'>Free</Radio>
  <Radio value='pro'>Pro</Radio>
</RadioGroup>
```
