---
description: >-
  Checkbox, Radio, Switch, NumberField, Toggle, Select, Chip, and ChipInput rules. Form validation trees → field.md.
---

# Inputs

Read the component page from https://ui.polyms.dev/llms.txt. Validation layout is [field.md](field.md), not this file.

| Control     | Doc                                        | Rule                                                                                                                                                                                                                                                     |
| ----------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkbox    | https://ui.polyms.dev/docs/checkbox.md     | Prefer the component over a CSS-only `.checkbox`.                                                                                                                                                                                                        |
| Radio       | https://ui.polyms.dev/docs/radio.md        | `RadioGroup` owns `value` / `onValueChange`. Each `Radio` has `value`.                                                                                                                                                                                   |
| Switch      | https://ui.polyms.dev/docs/switch.md       | Immediate on/off. Not a Checkbox and not a Toggle button.                                                                                                                                                                                                |
| NumberField | https://ui.polyms.dev/docs/number-field.md | Standalone stepper. Not a child of `Field`. Use `Field` only when you need `Field.Feedback`.                                                                                                                                                             |
| Toggle      | https://ui.polyms.dev/docs/toggle.md       | Pressed button, also inside `Toolbar`. On one row, same `size` and `rounded` as Field and Button. `ToggleGroup` defaults to the small control radius and a small inset; `rounded` makes the shell a pill. `variant="toolbar"` is the ghost toolbar look. |
| Select      | https://ui.polyms.dev/docs/select.md       | Option list. Not a `Menu` and not a native `<select>` when this component fits.                                                                                                                                                                          |
| Chip        | https://ui.polyms.dev/docs/chip.md         | Static tag, or removable with `onDismiss`. `onClick` makes the label a button; set `active` for a selected filter chip. `variant`: neutral, primary, success, info, warning, danger.                                                                     |
| ChipInput   | https://ui.polyms.dev/docs/chip.md         | Tag field. `value` / `onValueChange` or `defaultValue`. `variant` sets the tone. `rounded` makes the shell `rounded-xl` like a textarea; inner chips stay pills.                                                                                         |
