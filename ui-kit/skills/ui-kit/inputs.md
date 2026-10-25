---
description: >-
  Checkbox, Radio, Switch, NumberField, Toggle, and Select rules. Form validation trees → field.md.
---

# Inputs

Read the component page from https://ui.polyms.dev/llms.txt. Validation layout is [field.md](field.md), not this file.

| Control     | Doc                                        | Rule                                                                                         |
| ----------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Checkbox    | https://ui.polyms.dev/docs/checkbox.md     | Prefer the component over a CSS-only `.checkbox`.                                            |
| Radio       | https://ui.polyms.dev/docs/radio.md        | `RadioGroup` owns `value` / `onValueChange`. Each `Radio` has `value`.                       |
| Switch      | https://ui.polyms.dev/docs/switch.md       | Immediate on/off. Not a Checkbox and not a Toggle button.                                    |
| NumberField | https://ui.polyms.dev/docs/number-field.md | Standalone stepper. Not a child of `Field`. Use `Field` only when you need `Field.Feedback`. |
| Toggle      | https://ui.polyms.dev/docs/toggle.md       | Pressed state on a button, including inside `Toolbar`.                                       |
| Select      | https://ui.polyms.dev/docs/select.md       | Option list. Not a `Menu` and not a native `<select>` when this component fits.              |
