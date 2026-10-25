---
description: >-
  Toast, Alert, Avatar, Accordion, Collapsible, and Spinner rules. Read the matching page on
  https://ui.polyms.dev/llms.txt before generating.
---

# Display

Read the page for the component, then apply the rule that keeps it from being used as the wrong surface.

| Component   | Doc                                       | Rule                                                                                                                                                                                                                                           |
| ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toast       | https://ui.polyms.dev/docs/toast.md       | Non-blocking. Types are `success`, `danger`, `warning`, `info`, `actions` — no `primary`. Set `position` on `Toast.Container`, not on each `add()`. Default timeout is 5000ms; `timeout: 0` only when the user must act. Not a delete confirm. |
| Alert       | https://ui.polyms.dev/docs/alert.md       | Persistent inline status. Title is `Alert.Heading`. Not a Toast and not a Modal.                                                                                                                                                               |
| Avatar      | https://ui.polyms.dev/docs/avatar.md      | `alt` on `Avatar.Image`. Fallback is `Avatar.Fallback`.                                                                                                                                                                                        |
| Accordion   | https://ui.polyms.dev/docs/accordion.md   | Grouped sections. `title` on `Accordion.Item` is the shorthand. `multiple` uses value arrays. Not Tabs, not a single `Collapsible`.                                                                                                            |
| Collapsible | https://ui.polyms.dev/docs/collapsible.md | One disclosure. Custom trigger via `render={<Button />}`.                                                                                                                                                                                      |
| Spinner     | https://ui.polyms.dev/docs/spinner.md     | Pending state. Page placeholders use https://ui.polyms.dev/docs/skeleton.md, not a spinner farm.                                                                                                                                               |
