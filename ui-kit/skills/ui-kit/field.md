---
description: >-
  Field rules for agents. API and examples: https://ui.polyms.dev/docs/field.md.
  Form in an overlay → also load modal.md.
---

# Field

Read https://ui.polyms.dev/docs/field.md before writing a form. Quantities and steppers are https://ui.polyms.dev/docs/number-field.md, not a `Field` slot. Label tone: [quality.md](quality.md#field-label-copy).

## Rules

- `Field.Floating` is standalone. Do not nest it inside `Field`.
- Put `invalid`, `required`, `size`, and `name` on `Field`. Never put `invalid` on `Field.Control`.
- Direct children, in order: `Field.Label`, optional icons (`icon-start` / `icon-end` as siblings of the control), `Field.Control`, `Field.Description`, `Field.Feedback`.
- `Field.Feedback` opens on focus, hover, or click while invalid. Omit `defaultShowOnError` unless the error must stay visible with no interaction. Pass `floatingRoot` when the portal must not use `document.body`.
- Validate on blur or submit, not on every keystroke. Debounced search uses `Field.Floating` or `debounce` on the control.
- After a failed submit, focus the first invalid control.
- Set `type` (`email`, `tel`, `url`, `password`) and `autoComplete` on `Field.Control` for real forms. Use `autoComplete='off'` only when suggestions would fight a live filter.
- The boolean `rounded` prop always makes `Field.Control` pill-shaped. Use it on single-line fields, not textareas; use `className='rounded-lg'` or `className='rounded-xl'` on a textarea to match the form's radius.
- Submit handlers are `React.SubmitEvent<HTMLFormElement>`. The submit button is `<Button type='submit' variant='primary'>`. Every other `Button` omits `type`.

## Pre-flight

- [ ] **API choice** — `Field` vs `Field.Floating` vs `NumberField` matches the doc.
- [ ] **Props on the right node** — `invalid` is on the root, not the control.
- [ ] **Feedback** — message is `children`; `defaultShowOnError` is opt-in.
- [ ] **Label tone** — conversational on product forms ([quality.md#field-label-copy](quality.md#field-label-copy)).
