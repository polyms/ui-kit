---
description: >-
  @polyms/core-ui Field deep reference — compound Field.Label/Control/Feedback, Field.Floating, icons, validation,
  textarea, debounce, native forms. Read for form, input, field, validation. Label tone in quality.md#field-label-copy.
---

# Field

Deep reference for **`Field`** and **`Field.Floating`**. Read when the task involves **forms**, **inputs**, **validation**, **textarea**, or **debounced search**.

Compound overview and other components: [components.md](components.md). Label tone: [quality.md](quality.md#field-label-copy).

## Choose the right API

| Intent | Use |
| --- | --- |
| Settings, signup, checkout, validation errors | **`Field`** compound tree |
| Toolbar / table search, floating label, debounced filter | **`Field.Floating`** (standalone) |
| Quantities, steppers, label scrub | **`NumberField`** — [components.md#numberfield](components.md#numberfield) |

**`Field.Floating` is not a child of `Field`.** Do not nest them.

---

## Field compound

Import from the barrel: `Field`, `Field.Label`, `Field.Control`, `Field.Description`, `Field.Feedback`.

### Canonical tree

```tsx
import { Field } from '@polyms/core-ui'

<Field required invalid={hasError} name='email'>
  <Field.Label>Let me know your email?</Field.Label>
  <Field.Control type='email' placeholder='tifa.lockhart@polyms.dev' />
  <Field.Description>We'll only use this for account updates.</Field.Description>
  <Field.Feedback defaultShowOnError>Enter a valid email address</Field.Feedback>
</Field>
```

### Child order and icons

All slots are **direct children** of `Field`:

1. `Field.Label` (recommended for a11y)
2. `HugeiconsIcon` with `className='icon-start'` (optional)
3. `HugeiconsIcon` with `className='icon-end'` (optional)
4. `Field.Control`
5. `Field.Description` (optional)
6. `Field.Feedback` (optional)

Icons are **siblings** of `Field.Control`, not nested inside it. With a visible label, put **`Field.Label` before icons**.

### Props on the right node

| Prop | Where |
| --- | --- |
| `invalid`, `required`, `size`, `name` | **`Field`** root |
| `disabled`, `readOnly`, `rounded`, `debounce`, `type`, `value`, `onChange` | **`Field.Control`** |
| `defaultShowOnError` | **`Field.Feedback`** |

Never put `invalid` on `Field.Control`. Never use raw `<label htmlFor=…>` outside the tree.

### Textarea and custom inputs

```tsx
<Field.Control placeholder='Short bio' render={<textarea rows={3} />} />
```

### Debounced onChange

```tsx
<Field.Control debounce={300} onChange={e => filter(e.target.value)} />
```

Omit `debounce` for controlled submit forms.

### Validation

`Field.Feedback` shows when **`invalid`** and focused/hovered. Use **`defaultShowOnError`** to keep the message visible.

### Native forms

Wrap in `<form onSubmit={…}>`. Set `name` on `Field` root (defaults from `id`). Submit with `Button type='submit' variant='primary'`.

Type the handler as **`React.FormEvent<HTMLFormElement>`** (not `React.SubmitEvent` — does not exist in `@types/react` 19). Inline handlers infer the event type.

```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
}
```

---

## Field.Floating

Compact floating-label input for search/filter — separate component, not a `Field` slot.

```tsx
<Field.Floating
  label='Search'
  placeholder='Results update as you type'
  debounce={400}
  onChange={e => setQuery(e.target.value)}
/>
```

| Prop | Meaning |
| --- | --- |
| `label` | Floating label (not `Field.Label`) |
| `placeholder` | Helper below input via `Field.Description` — **not** HTML `placeholder` |
| `debounce` | ms before `onChange` |
| `children` | Extra nodes below description |

Inner input uses `placeholder=' '` for label animation.

For validation UI, use compound **`Field`** or show errors via `children`.

---

## Anti-patterns

- Raw `<label>` + `<input>` when `Field` exists
- `Field.Floating` inside `<Field>`
- `Field.Floating` `placeholder` prop as HTML placeholder
- `invalid` on `Field.Control`
- Icons inside `Field.Control`
- `Field.Input`, `FieldFloating`, `NumberField` inside `<Field>` (use **`NumberField`** standalone), deep imports

---

## Pre-flight

- [ ] Compound `Field` vs `Field.Floating` vs raw input — correct choice
- [ ] `invalid` / `required` / `size` / `name` on root; control props on `Field.Control`
- [ ] `Field.Feedback` + `defaultShowOnError` when showing errors
- [ ] Conversational `Field.Label` on user-facing forms
