# Design

How `/design` and `/dev` consume UI specifications and `@polyms/ui-kit`.

## Design specs

- **Path:** `docs/design/<feature-slug>.md`
- **Author:** `/design` skill from PRD or feature brief
- **Consumer:** `/dev` implements against the spec

## Design system

- **Library:** `@polyms/ui-kit` (Tailwind CSS 4, React 19)
- **Skill:** `.agents/skills/ui-kit` (symlink → `ui-kit/skills/ui-kit`)
- **CSS tokens (source of truth):** `ui-kit/src/styles/_root.css`, component styles in `ui-kit/src/styles/_*.css`
- **Boundary:** `/design` maps _what_; `/ui-kit` skill documents _how_ (primitives, tokens, motion API)

## Figma — Polyms design system

New sessions: read this section before editing tokens or the token board. Code wins on conflict unless the task is explicitly design-sync.

### File & links

| Item                 | Value                                                      |
| -------------------- | ---------------------------------------------------------- |
| **File key**         | `utHs1nKeQwcoVfmc4FOEiW`                                   |
| **Design URL**       | https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms |
| **Token board page** | `Polyms token set` (`16:2`)                                |
| **Board frame**      | `Board` (`18:489`) — horizontal auto-layout, ~1906×1802 px |

Deep link (token board):

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=16-2
```

### Pages in file

Canonical agent names (cột **Page**) khớp script `PAGE_NAME` / docs mapping. Cột **Live name** là tên canvas hiện tại trên Figma — có thể lệch; khi `setCurrentPageAsync` ưu tiên **node ID**, không chỉ tên.

| Page (canonical)     | Node ID   | Live name (Figma)  | Scripts                                   | MDX / purpose                                                                                    |
| -------------------- | --------- | ------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Logo                 | `0:1`     | `Logo`             | —                                         | Brand mark                                                                                       |
| Cover                | `4:123`   | `Cover`            | —                                         | Cover                                                                                            |
| Getting Started      | `4:124`   | `Getting Started`  | —                                         | Onboarding                                                                                       |
| Polyms token set     | `16:2`    | `Polyms token set` | —                                         | **Token reference board** (primary agent target)                                                 |
| Effect styles        | `122:2`   | `Effect styles`    | `lib/patch-page-effect-styles-compact.js` | Focus rings + shadow effect styles                                                               |
| Landing – polyms.dev | `88:2`    | `Landing page`     | —                                         | Marketing landing (`Landing / polyms.dev` frame)                                                 |
| Button               | `143:2`   | `Actions` ⚠️       | —                                         | Button set + docs (`button.mdx`) — **live name trùng nghĩa Actions / Items; nội dung là Button** |
| Badge / Items        | `165:105` | `Badge`            | `scripts/figma/badge-items/`              | `badge.mdx`, `item.mdx`                                                                          |
| Avatar / Items       | `178:2`   | `Avatars`          | `scripts/figma/avatar-items/`             | `avatar.mdx`                                                                                     |
| Form / Items         | `180:2`   | `Data input`       | `scripts/figma/form-items/`               | Field, Select, Switch, Checkbox, Radio + form composition                                        |
| Feedback / Items     | `183:102` | `Feedback`         | `scripts/figma/feedback-items/`           | Alert, Offcanvas, Popover, Spinner, Toast, Tooltip                                               |
| Actions / Items      | `189:2`   | `Actions / Items`  | `scripts/figma/actions-items/`            | Link, Modal, Toggle (`link.mdx`, `modal.mdx`, `toggle.mdx`)                                      |

Separators trong file (`---` @ `4:127`, `176:232`) — bỏ qua.

### Board columns (`Board` → children)

Six columns left → right:

| Column             | Node ID   | Width | Contents                                                                                                                |
| ------------------ | --------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| `Col/Color`        | `18:490`  | 328   | 6 seed cards (Primary, Warning, Success, Danger, Info, Slate); grid `step \| eg \| hex` — eg swatch **FILL** row height |
| `Col/Semantic`     | `18:780`  | 346   | Semantic tokens + light/dark previews                                                                                   |
| `Col/Typography`   | `18:813`  | 236   | `font-family`, `font-size`, `font-weight`, `font-lineheight` cards                                                      |
| `Col/Dimensions`   | `18:918`  | 236   | `spacing`, `radius`, `stroke-width`, `z-index` (2 col: token FLEX \| value 32px)                                        |
| `Col/Compositions` | `18:1010` | 236   | Typography presets + `shadows`                                                                                          |
| `Col/Type Styles`  | `59:2`    | 360   | 12 local text styles (h1–h6, body, label, button, code)                                                                 |

### Grid layout convention (token tables)

Token cards use Figma **Grid** auto-layout (`layoutMode: 'GRID'`), 3 columns: `token | value | eg`.

| Property        | Value                                              | Notes                                            |
| --------------- | -------------------------------------------------- | ------------------------------------------------ |
| `gridColumnGap` | **8**                                              | Column gutter — use this, not `itemSpacing`      |
| `gridRowGap`    | **6**                                              | Row gutter — use this, not `counterAxisSpacing`  |
| Row sizing      | **HUG**                                            | Do not use FIXED row heights; they collapse gaps |
| Column pattern  | `FIXED token \| FIXED/FLEX value \| FLEX/FIXED eg` | Match sibling cards in the same column           |

**Common pitfalls (Plugin API):**

- `itemSpacing` / `counterAxisSpacing` apply to HORIZONTAL/VERTICAL auto-layout, **not** GRID — gaps will not render.
- Binding `lineHeight` to FLOAT variables collapses text — use `lineHeight: { unit: 'PIXELS' }` for previews or leave `AUTO`.
- After append, force `gridRowSizes[].type = 'HUG'` if rows collapse to `FIXED 1`.
- Spacing `eg` bars: fixed pixel width only — **do not** bind `width` + `layoutSizingHorizontal: FILL` on the same rectangle (Figma crash).
- Spacing **token** column: merge aliases that share the same px (`1 - 2xs` @ 4px) — one row per unique value.
- Radius **eg** previews: 18×18 squares, `layoutAlign: MIN` (left-aligned in eg column — same as spacing bars).
- Color seed **eg** swatches: `layoutSizingVertical: FILL` + `layoutAlign: STRETCH` — pill fills full row height (match `step` / `hex` text).

**GRID automation — đừng lặp lại lỗi layout (Button page, 3 lần):**

Figma GRID gán ô theo **thứ tự `children` row-major** (index `i` → row `⌊i/colCount⌋`, col `i % colCount`). **`children[i].x/y` có thể lệch index** sau khi sửa sai — luôn verify `x` theo cột FIXED, không tin mỗi tên node.

| Gốc lỗi                                              | Hậu quả                                                                             | Cách đúng                                                                                                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `insertChild` / `remove` từng cell trên GRID         | Slot nội bộ lệch — cột **with label** ↔ **icon only** hoán đổi, spec text đè button | **Không** reorder incremental. Dump hết children → temp frame → `layoutMode: NONE` → `GRID` → set `gridRowCount`/`gridColumnCount` đúng → `appendChild` **một lần** theo thứ tự hàng |
| `gridRowCount` ≠ `children.length / gridColumnCount` | Hàng thừa (vd. 9 rows / 32 cells) — node kẹt `y=340`, icon lạc góc                  | Luôn `rows = childCount / cols` (size table **8×4**, variant **9×4**) trước khi append                                                                                               |
| `layoutSizingVertical: FIXED` trên table             | Frame cao vài chục px, clip hàng dưới                                               | Table GRID: `layoutSizingVertical: HUG`                                                                                                                                              |
| `findOne` TEXT trùng chuỗi (`12px / 18px lh` ×2)     | Reorder script gán nhầm spec → hàng vỡ                                              | Thu thập direct children; spec trùng dùng **pool** lấy theo thứ tự hàng                                                                                                              |
| Component swap bằng remove + insert instance         | Cùng lỗi slot GRID                                                                  | **`instance.swapComponent(comp)` tại chỗ** — không remove/reinsert                                                                                                                   |
| Xóa wrapper row rồi `appendChild` lẻ                 | Mất node / orphan `solar-icon`                                                      | Extract toàn bộ cell ra temp trước khi xóa wrapper                                                                                                                                   |

**Recipe rebuild GRID (Plugin API):**

1. Map cell theo **tên semantic** (`btn/{size}/label`, header TEXT, …) — không theo index hiện tại.
2. `temp.appendChild` **tất cả** children grid cũ.
3. `frame.layoutMode = 'NONE'` → `'GRID'`; set `gridRowCount`, `gridColumnCount`, `gridColumnSizes`, gaps.
4. `appendChild` ordered list (header row + data rows).
5. **Verify:** với cột FIXED `[w0,w1,…]`, child ở col `c` phải có `x ≈ sum(w0..w(c-1)) + c*gap` (tolerance ≤2px).
6. Instance trong cell: `layoutAlign: CENTER`, `layoutSizingHorizontal/Vertical: HUG`.

**Button page** (canonical `Button`, live canvas `Actions`, node `143:2`): docs frame `Button — docs` (`143:3`) @ (80, 80); tables `size-table` (`143:10`), `variant-table` (`143:62`); component set **`Button`** in `Button / Library` (`155:342` → set `155:378`, 37 variants). Cột size table (FIXED): `40 \| 140 \| 56 \| 84`. Cột variant: `52 \| 96 \| 96 \| 36`.

**Button component set** — properties khớp `button.mdx` + `Rounded` cho size-table label row:

| Property   | Values                                                      | Ghi chú                                       |
| ---------- | ----------------------------------------------------------- | --------------------------------------------- |
| `Variant`  | ghost, primary, success, info, warning, danger, dark, light |                                               |
| `Size`     | default, xs, sm, lg, xl, 2xl, 3xl                           | padding / `--btn-lh` từ `_button.css`         |
| `Outlined` | true, false                                                 |                                               |
| `Icon`     | true, false                                                 | `true` = btn-icon; icon frame = `--btn-lh`    |
| `Rounded`  | true, false                                                 | `true` = pill + leading icon (size label row) |

Icon-only (`Icon=true`): xs 22px, default/sm/lg 26–34px, xl 38px, 2xl 46px, 3xl 54px (≈ `2×py + lh`). Docs instances: **`swapComponent` only** — map `btn/{size}/label` → `Rounded=true`; `btn/{size}/icon` → `Icon=true`.

**Docs board headers** — mỗi `* — docs` frame có `Header` auto-layout (dashed border). Icon đầu tiên: frame **`solar-icon`** 36×36, SVG BoldDuotone từ `@solar-icons/react-perf` (fg `#212938`). Helper: `scripts/figma/lib/docs-header.js` (`makeSolarIcon`, `makeDocsHeader`); scripts `*-docs.js` prepend lib khi chạy trong Figma. Re-patch live headers: `scripts/figma/lib/patch-page-*-compact.js` (Button `143-2`, Badge `165-105`, Avatar `178-2`, Form `180-2`, Feedback `183-102`, Actions `189-2`, Effect styles `effect-styles`).

| Docs section      | Solar BoldDuotone icon | Live header?                                                                                              |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| Button            | `CursorSquare`         | ✅ `194:105`                                                                                              |
| Badge             | `Tag`                  | ✅                                                                                                        |
| Interactive items | `Widget5`              | ✅                                                                                                        |
| Avatar            | `UserCircle`           | ✅                                                                                                        |
| Avatar rows       | `UsersGroupTwoRounded` | ✅                                                                                                        |
| Field             | `TextFieldFocus`       | ✅                                                                                                        |
| Select            | `ListArrowDown`        | ✅                                                                                                        |
| Switch            | `Power`                | ✅                                                                                                        |
| Form composition  | `ClipboardList`        | ✅                                                                                                        |
| Checkbox          | `CheckSquare`          | ✅                                                                                                        |
| Radio             | `RecordCircle`         | ✅                                                                                                        |
| Alert             | `DangerCircle`         | ✅                                                                                                        |
| Offcanvas         | `SidebarMinimalistic`  | ✅                                                                                                        |
| Popover           | `ChatSquare`           | ✅                                                                                                        |
| Spinner           | `RefreshCircle`        | ✅ `201:378` trên header `199:824`; glyph component = VECTOR paths từ `Spinner.tsx` (không dùng icon này) |
| Toast             | `Bell`                 | ✅                                                                                                        |
| Tooltip           | `QuestionCircle`       | ✅                                                                                                        |
| Link              | `LinkRound`            | ✅ `201:108` trên header `190:43`                                                                         |
| Modal             | `WindowFrame`          | ✅ `201:111` trên header `190:269`                                                                        |
| Toggle            | `Bolt`                 | ✅ `201:118` trên header `190:314`                                                                        |
| Effect styles     | `SpecialEffects`       | ✅ `198:2` trên header `133:2`                                                                            |
| Shadows           | `Layers`               | ✅ `198:6` trên header `139:5`                                                                            |

**Badge / Items page** (canonical `Badge / Items`, live `Badge`, node `165:105`): CSS-only utilities from `_badge.css` and `.item-*` in `_utilities.css`. Automation scripts: `scripts/figma/badge-items/` (`01-badge-components` → `02-item-components` → `03-badge-docs` → `04-item-docs` → `05-fix-layout`).

| Frame                      | Node ID   | Purpose                                         |
| -------------------------- | --------- | ----------------------------------------------- |
| `Badge — docs`             | `171:42`  | Docs board @ (80, 80) — sizes + variants tables |
| `Interactive items — docs` | `171:236` | Docs board @ (520, 80) — states + nav preview   |
| `Badge / Library`          | `169:44`  | Component set **`Badge`** (`169:45`)            |
| `Item / Library`           | `169:209` | Component set **`Item`** (`169:210`)            |

Deep links:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=171-42
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=171-236
```

Docs tables:

| Table           | Node ID   | Columns (FIXED)    | Rows                                          |
| --------------- | --------- | ------------------ | --------------------------------------------- |
| `size-table`    | `171:2`   | `40 \| 120 \| 84`  | 4 (header + default/lg/xl)                    |
| `variant-table` | `171:18`  | `52 \| 140`        | 8 (header + 7 tones)                          |
| `states-table`  | `173:166` | `36 \| 162 \| 162` | 8 (header + 7 variants × idle/active)         |
| `nav-preview`   | `171:221` | vertical stack     | 3 nav rows (item-light / item-primary active) |

**Badge component set** — properties khớp `badge.mdx` + `_badge.css`:

| Property  | Values                                               | Ghi chú                              |
| --------- | ---------------------------------------------------- | ------------------------------------ |
| `Variant` | primary, success, info, warning, danger, light, dark | tint `color-mix(… 10%)` trên Palette |
| `Size`    | default, lg, xl                                      | padding / font-size từ `_badge.css`  |

Size specs: default `12px / 16px lh`, lg `14px / 16px`, xl `16px / 24px`; corner radius 6px (`rounded-md`).

**Item component set** — properties khớp `item.mdx` + `.item-*` trong `_utilities.css`:

| Property  | Values                                               | Ghi chú                                         |
| --------- | ---------------------------------------------------- | ----------------------------------------------- |
| `Variant` | primary, success, info, warning, danger, light, dark | ghost idle = transparent                        |
| `State`   | idle, active                                         | `active` = persisted `.active` / `:active` tint |

Row chrome: 160×36, padding 8×12, radius 8px, icon dot 16px + label. Docs instances: **`swapComponent` only** — map `item/{variant}/{state}`; GRID columns `36 \| 162 \| 162` (376px total).

**Avatar / Items page** (canonical `Avatar / Items`, live `Avatars`, node `178:2`): React `Avatar` + bundled `.avatar*` classes from `_avatar.css`. Automation scripts: `scripts/figma/avatar-items/`.

| Frame                    | Node ID   | Purpose                                                                 |
| ------------------------ | --------- | ----------------------------------------------------------------------- |
| `Avatar — docs`          | `179:237` | Docs board @ (80, 80) — sizes + content-type tables                     |
| `Avatar rows — docs`     | `179:160` | Docs board @ (520, 80) — profile + list row previews                    |
| `Avatar / Library`       | `178:39`  | Component set **`Avatar`** (`178:40`)                                   |
| `Avatar photo / Library` | `204:41`  | Component set **`Avatar photo`** (`204:50`) — reusable sample portraits |
| `Avatar row / Library`   | `179:22`  | Component set **`Avatar row`** (`179:23`)                               |

Deep links:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=179-237
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=179-160
```

Docs tables:

| Table             | Node ID   | Columns (FIXED)   | Rows                                 |
| ----------------- | --------- | ----------------- | ------------------------------------ |
| `size-table`      | `179:193` | `52 \| 56 \| 120` | 7 (header + xs…xl)                   |
| `type-table`      | `179:221` | `52 \| 56 \| 140` | 4 (header + image/fallback/gradient) |
| `profile-preview` | `179:134` | vertical stack    | 2 profile row samples                |
| `list-preview`    | `179:147` | vertical stack    | 2 list row samples                   |

**Avatar component set** — properties khớp `avatar.mdx` + `_avatar.css`:

| Property | Values                      | Ghi chú                                                       |
| -------- | --------------------------- | ------------------------------------------------------------- |
| `Size`   | xs, sm, default, md, lg, xl | default = `--avatar-size` 40px; md = demo `size-12` (48px)    |
| `Type`   | image, fallback, gradient   | image → `Avatar.Image`; fallback/gradient → `Avatar.Fallback` |

Bundled classes: `.avatar` (root), `.avatar-image`, `.avatar-fallback` (`text-sm font-semibold`).

**Avatar photo component set** — sample portraits khớp `AvatarDefault.tsx` (Untitled UI CDN). Rows **instance** these thay vì duplicate image fill.

| Property | Values      | Ghi chú                                       |
| -------- | ----------- | --------------------------------------------- |
| `Person` | aliah, rhea | `aliah-lane` / `rhea-levine` URLs (docs demo) |
| `Size`   | sm, md      | sm = list row 32px; md = profile row 48px     |

| Variant                 | Node ID  | Image source                                        |
| ----------------------- | -------- | --------------------------------------------------- |
| `Person=aliah, Size=md` | `204:42` | `https://untitledui.com/images/avatars/aliah-lane`  |
| `Person=rhea, Size=md`  | `204:44` | `https://untitledui.com/images/avatars/rhea-levine` |
| `Person=aliah, Size=sm` | `204:46` | same as aliah md                                    |
| `Person=rhea, Size=sm`  | `204:48` | same as rhea md                                     |

Helper: `scripts/figma/lib/avatar-images.js` (`resolveAvatarImageHashes`, `makeAvatarPhotoComponent`). Live patch: `scripts/figma/lib/patch-page-178-2-avatar-photos.js`.

**Avatar row component set** — composition patterns (profile cards, list rows):

| Property | Values        | Ghi chú                                       |
| -------- | ------------- | --------------------------------------------- |
| `Layout` | profile, list | profile = avatar + name + role; list = 240×44 |
| `Person` | aliah, rhea   | Sample identities from docs demo              |

Avatar chrome trong mỗi row: **instance `Avatar photo`** (`row/profile/*` → md; `row/list/*` → sm), không embed gradient/image fill trực tiếp.

Script order: `00-create-page` → `01-avatar-components` → `01-avatar-photo-components` → `02-row-components` → `03-avatar-docs` → `04-row-docs` → `05-fix-layout`. Re-patch photos + rows: `lib/patch-page-178-2-avatar-photos.js`.

**Form / Items page** (canonical `Form / Items`, live `Data input`, node `180:2`): Field tree, Select trigger/content, Switch, Checkbox, Radio, and form composition patterns. Automation scripts: `scripts/figma/form-items/`.

Docs boards row 1 @ y=80: Field (80), Select (520), Switch (960), Form (1400). Row 2 @ y=1213: Checkbox (80), Radio (520).

| Frame                | Node ID   | Purpose                                                         |
| -------------------- | --------- | --------------------------------------------------------------- |
| `Field — docs`       | `180:433` | Docs board @ (80, 80) — field size + state tables               |
| `Select — docs`      | `180:511` | Docs board @ (520, 80) — trigger sizes/states + popup preview   |
| `Switch — docs`      | `180:574` | Docs board @ (960, 80) — switch state table                     |
| `Form — docs`        | `180:581` | Docs board @ (1400, 80) — signup preview + composition patterns |
| `Checkbox — docs`    | `183:555` | Docs board @ (80, 1213) — checkbox sizes/states/variants        |
| `Radio — docs`       | `183:644` | Docs board @ (520, 1213) — radio sizes/states/variants          |
| `Field / Library`    | `180:117` | Component set **`Field`** (`180:118`)                           |
| `Select / Library`   | `180:308` | Component set **`Select`** (`180:309`) + popup (`180:298`)      |
| `Switch / Library`   | `180:349` | Component set **`Switch`** (`180:350`)                          |
| `Checkbox / Library` | `183:289` | Component set **`Checkbox`** (`183:290`)                        |
| `Radio / Library`    | `183:363` | Component set **`Radio`** (`183:364`)                           |

Deep links:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=180-433
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=180-511
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=180-574
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-555
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-644
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=180-581
```

Docs tables:

| Table             | Node ID   | Columns (FIXED)    | Rows                                                           |
| ----------------- | --------- | ------------------ | -------------------------------------------------------------- |
| `size-table`      | `180:361` | `52 \| 200 \| 120` | 7 (Field header + default/sm/lg/xl/2xl/3xl)                    |
| `states-table`    | `180:407` | `52 \| 200`        | 5 (Field header + default/disabled/readOnly/invalid)           |
| `size-table`      | `180:442` | `52 \| 160 \| 120` | 7 (Select header + default/sm/lg/xl/2xl/3xl)                   |
| `states-table`    | `180:476` | `52 \| 160 \| 120` | 5 (Select header + default/placeholder/disabled/invalid)       |
| `popup-preview`   | `180:500` | —                  | Select.Content popup sample                                    |
| `switch-table`    | `180:522` | `88 \| 200`        | 7 (header + off/on/disabled/primary states)                    |
| `size-table`      | `183:473` | `52 \| 200 \| 120` | 5 (Checkbox header + default/sm/lg/xl)                         |
| `states-table`    | `183:501` | `88 \| 200`        | 6 (Checkbox header + unchecked/checked/indeterminate/disabled) |
| `variant-preview` | `183:527` | vertical stack     | 6 semantic variants (primary → dark)                           |
| `size-table`      | `183:568` | `52 \| 200 \| 120` | 5 (Radio header + default/sm/lg/xl)                            |
| `states-table`    | `183:600` | `88 \| 200`        | 5 (Radio header + unchecked/checked/disabled)                  |
| `variant-preview` | `183:625` | vertical stack     | 6 semantic variants (primary → dark)                           |
| `form-preview`    | `180:555` | vertical stack     | Field + invalid Field + Select + Switch + Checkbox + Radio     |
| `pattern-table`   | `180:588` | `120 \| 220`       | 3 (header + standard/floating Field patterns)                  |

**Field component set** — properties khớp field docs + form composition; Figma `.field-control` dùng **pill (rounded-full)**; CSS vẫn có thể dùng `--control-radius` theo size (`_field.css`):

| Property | Values                               | Ghi chú                                                                        |
| -------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `Size`   | default, sm, lg, xl, 2xl, 3xl        | Figma: pill radius mọi size; CSS: default/sm **4px**, lg **8px**, xl+ **12px** |
| `State`  | default, disabled, readOnly, invalid | invalid includes feedback; default includes description                        |

**Select component set** — trigger states + popup composition:

| Property | Values                                  | Ghi chú                                    |
| -------- | --------------------------------------- | ------------------------------------------ |
| `Size`   | default, sm, lg, xl, 2xl, 3xl           | min width grows from 144px to 192px        |
| `State`  | default, placeholder, disabled, invalid | popup is separate component `Select popup` |

**Switch component set** — inline label switch:

| Property   | Values           | Ghi chú                           |
| ---------- | ---------------- | --------------------------------- |
| `Variant`  | default, primary | track/knob palette variants       |
| `Checked`  | true, false      | knob position + active track tint |
| `Disabled` | true, false      | opacity and muted label           |

**Checkbox component set** — properties khớp `checkbox.mdx` + `_field.css` `.checkbox`:

| Property        | Values              | Ghi chú                                 |
| --------------- | ------------------- | --------------------------------------- |
| `Size`          | default, sm, lg, xl | box 16/14/18/20px · label 14/12/14/16px |
| `Checked`       | true, false         | checked = primary fill + ✓ mark         |
| `Indeterminate` | true, false         | mixed parent row (− mark)               |
| `Disabled`      | true, false         | surface fill + opacity 0.55             |

Variant tones (primary, success, info, warning, danger, dark) shown in docs `variant-preview`; invalid border via `.field.invalid`.

**Radio component set** — properties khớp `radio.mdx` + `_field.css` `.radio`:

| Property   | Values              | Ghi chú                        |
| ---------- | ------------------- | ------------------------------ |
| `Size`     | default, sm, lg, xl | circle indicator 16/14/18/20px |
| `Checked`  | true, false         | filled ring + white center dot |
| `Disabled` | true, false         | surface fill + opacity 0.55    |

**Form composition** — no standalone Form component; compose Field + Select + Switch + Checkbox + Radio in product forms. Use `Field (standard)` for settings/signup/validation and `Field.Floating` for search/filter/debounced query surfaces.

Script order: `00-create-page` → `01-field-components` → `02-select-components` → `03-switch-components` → `04-field-docs` → `05-select-docs` → `06-switch-form-docs` → `07-fix-layout` → `08-checkbox-components` → `09-radio-components` → `10-checkbox-radio-docs` → `07-fix-layout`.

**Feedback / Items page** (canonical `Feedback / Items`, live `Feedback`, node `183:102`): Alert, Offcanvas, Popover, Spinner, Toast, Tooltip — transient feedback + overlay patterns. Automation scripts: `scripts/figma/feedback-items/`.

Docs boards: row 1 @ y=80 — Alert (80), Offcanvas (520), Popover (960). Spinner docs @ (80, **900**) sau khi rebuild. Toast / Tooltip vẫn @ y=1679 (520 / 960).

| Frame                 | Node ID    | Purpose                                                   |
| --------------------- | ---------- | --------------------------------------------------------- |
| `Alert — docs`        | `183:929`  | Docs board @ (80, 80) — variant + dismissible tables      |
| `Offcanvas — docs`    | `183:1089` | Docs board @ (520, 80) — direction + size tables          |
| `Popover — docs`      | `183:1030` | Docs board @ (960, 80) — side + align tables              |
| `Spinner — docs`      | `199:823`  | Docs board @ (80, 900) — size + color tables              |
| `Toast — docs`        | `183:1317` | Docs board @ (520, 1679) — type table + API notes         |
| `Tooltip — docs`      | `183:1377` | Docs board @ (960, 1679) — side + state tables + Provider |
| `Alert / Library`     | `183:421`  | Component set **`Alert`** (`183:422`)                     |
| `Offcanvas / Library` | `183:471`  | Component set **`Offcanvas`** (`183:472`)                 |
| `Popover / Library`   | `183:812`  | Component set **`Popover`** (`183:813`)                   |
| `Spinner / Library`   | `199:689`  | Component set **`Spinner`** (`199:720`)                   |
| `Toast / Library`     | `183:841`  | Component set **`Toast`** (`183:842`)                     |
| `Tooltip / Library`   | `183:883`  | Component set **`Tooltip`** (`183:884`)                   |

Deep links:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-929
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-1089
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-1030
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=199-823
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-1317
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=183-1377
```

Docs tables:

| Table             | Node ID    | Columns (FIXED)    | Rows                                             |
| ----------------- | ---------- | ------------------ | ------------------------------------------------ |
| `variant-table`   | `183:885`  | `56 \| 280`        | 8 (header + 7 variants)                          |
| `states-table`    | `183:916`  | `72 \| 280`        | 3 (header + default/dismissible)                 |
| `direction-table` | `183:1039` | `52 \| 200 \| 120` | 5 (header + left/right/up/down)                  |
| `size-table`      | `183:1067` | `52 \| 200 \| 100` | 4 (header + sm/md/lg samples)                    |
| `side-table`      | `183:966`  | `52 \| 160 \| 120` | 5 (Popover header + 4 sides)                     |
| `align-table`     | `183:1002` | `52 \| 160 \| 120` | 4 (header + start/center/end)                    |
| `size-table`      | `199:755`  | `40 \| 56 \| 120`  | 6 (Spinner header + 12–48px)                     |
| `color-table`     | `199:789`  | `56 \| 56 \| 180`  | 6 (header + dark/primary/success/danger/warning) |
| `type-table`      | `183:1282` | `56 \| 280`        | 6 (header + 5 toast types)                       |
| `side-table`      | `183:1329` | `52 \| 120 \| 120` | 5 (Tooltip header + 4 sides)                     |
| `states-table`    | `183:1361` | `64 \| 120 \| 140` | 3 (header + open/disabled)                       |

**Alert component set** — properties khớp `alert.mdx` + semantic tint tokens (`primary/050`, `info/050`, …):

| Property      | Values                                               | Ghi chú                                       |
| ------------- | ---------------------------------------------------- | --------------------------------------------- |
| `Variant`     | primary, success, info, warning, danger, light, dark | tint bg + border từ Palette `*/050`, `*/600`  |
| `Dismissible` | true, false                                          | `true` = absolute close control (`onDismiss`) |

Alert chrome: 280px wide, padding 12×16, radius 12px, heading 14px Bold + body 14px Medium (20px lh). Docs instances: **`swapComponent` only** — map `alert/{variant}`; dismissible row uses `alert/info/dismissible`.

**Offcanvas component set** — properties khớp `offcanvas.mdx` + store API:

| Property    | Values                | Ghi chú                                             |
| ----------- | --------------------- | --------------------------------------------------- |
| `Direction` | left, right, up, down | panel anchor + swipe dismiss direction              |
| `Size`      | sm, md, lg            | 300 / 360 / 480px (xl–full documented in size card) |

Mini preview frame 200×140; panel uses `color/body` fill. Docs `size-table` shows sm–lg; `Card/sizes-reference` lists full scale through `full`.

**Popover component set** — properties khớp `popover.mdx`:

| Property | Values                   | Ghi chú                                     |
| -------- | ------------------------ | ------------------------------------------- |
| `Side`   | top, bottom, left, right | popup placement relative to trigger         |
| `Align`  | start, center, end       | cross-axis alignment; default bottom/center |

Popup: `color/surface-2` fill, `slate/200` border, drop shadow. Trigger = surface chip “Click me”.

**Spinner component set** — properties khớp `spinner.mdx` + **`Spinner.tsx`** (library `199:689` → set `199:720`, 25 variants):

| Property | Values                                  | Ghi chú                                                           |
| -------- | --------------------------------------- | ----------------------------------------------------------------- |
| `Size`   | 12, 16, 24, 32, 48                      | diameter px — maps `size` prop                                    |
| `Color`  | dark, primary, success, danger, warning | maps `color` / `subColor`; dark arc `#181b1f`, track ~`slate/300` |

Geometry: frame `spinner` chứa **2 VECTOR** filled paths từ `Spinner.tsx` viewBox `0 0 20 20` — track (donut / `subColor`) + arc (wedge / `color`). **Không** dùng ELLIPSE stroke. Solar `RefreshCircle` chỉ cho docs header (`201:378` @ header `199:824`). Script: `feedback-items/04-spinner-components.js`; re-patch header: `lib/patch-page-183-102-compact.js`.

IDs cũ đã xóa: library/docs/tables `183:738` / `183:739` / `183:1165` / `183:1107` / `183:1136`.

**Toast component set** — properties khớp `toast.mdx` + `toastManager.add`:

| Property | Values                                     | Ghi chú                                             |
| -------- | ------------------------------------------ | --------------------------------------------------- |
| `Type`   | success, danger, warning, primary, actions | `primary` → CSS `toast-info`; `actions` = Undo chip |

Toast chrome: 300px wide, shadow, semantic tint or neutral body for `actions`. Docs instances stretch **`FILL`** in GRID sample column.

**Tooltip component set** — properties khớp `tooltip.mdx` + `Tooltip.Provider`:

| Property | Values                   | Ghi chú                                      |
| -------- | ------------------------ | -------------------------------------------- |
| `Side`   | top, bottom, left, right | default side = top                           |
| `State`  | open, disabled           | `disabled` hides popup, reduces opacity 0.45 |

Popup: `slate/900` fill, white 12px / 20px lh. Provider delay 600ms documented in `Card/provider`.

Script order: `00-create-page` → `01-alert-components` → `02-offcanvas-components` → `03-popover-components` → `04-spinner-components` → `05-toast-components` → `06-tooltip-components` → `07-alert-docs` → `08-offcanvas-docs` → `09-popover-docs` → `10-spinner-docs` → `11-toast-docs` → `12-tooltip-docs` → `13-fix-layout`.

**Actions / Items page** (`Actions / Items`, node `189:2`): CSS-only **Link** utilities, React **Modal** tree, **Toggle** + **ToggleGroup**. Automation scripts: `scripts/figma/actions-items/` (`00-create-page` → `01-link-components` → `02-modal-components` → `03-toggle-components` → `04-link-docs` → `05-modal-docs` → `06-toggle-docs` → `07-fix-layout`).

Docs headers dùng `makeDocsHeader` + Solar BoldDuotone (`LinkRound` / `WindowFrame` / `Bolt`). Re-patch live: `lib/patch-page-189-2-compact.js`.

| Frame              | Node ID   | Purpose                                                                 |
| ------------------ | --------- | ----------------------------------------------------------------------- |
| `Link — docs`      | `190:42`  | Docs board @ (80, 80) — variant + state tables + stretched-link         |
| `Modal — docs`     | `190:268` | Docs board @ (520, 80) — size + scrollable tables + parts               |
| `Toggle — docs`    | `190:313` | Docs board @ (960, 80) — states table + ToggleGroup preview             |
| `Link / Library`   | `189:45`  | Component set **`Link`** (`189:46`)                                     |
| `Modal / Library`  | `189:289` | Component set **`Modal`** (`189:290`)                                   |
| `Toggle / Library` | `189:299` | Component set **`Toggle`** (`189:300`) + **`Toggle group`** (`189:301`) |

Deep links:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=190-42
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=190-268
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=190-313
```

Docs tables:

| Table              | Node ID   | Columns (FIXED)    | Rows                                     |
| ------------------ | --------- | ------------------ | ---------------------------------------- |
| `variant-table`    | `190:2`   | `56 \| 200`        | 8 (header + 7 flavors)                   |
| `states-table`     | `190:26`  | `56 \| 200 \| 120` | 4 (header + default/hover/visited)       |
| `card-preview`     | `191:110` | vertical stack     | stretched-link clickable card demo       |
| `size-table`       | `190:157` | `52 \| 320 \| 100` | 6 (header + sm/default/lg/xl/full)       |
| `scrollable-table` | `190:236` | `72 \| 320`        | 3 (header + default/scrollable)          |
| `states-table`     | `190:284` | `100 \| 80 \| 160` | 5 (header + idle/pressed/disabled/combo) |
| `group-preview`    | `190:304` | vertical stack     | exclusive ToggleGroup alignment sample   |

**Link component set** — properties khớp `link.mdx` + `_link.css` (CSS-only on `<a>`):

| Property  | Values                                               | Ghi chú                                             |
| --------- | ---------------------------------------------------- | --------------------------------------------------- |
| `Variant` | primary, success, info, warning, danger, light, dark | flavor nested under `.link`                         |
| `State`   | default, hover, visited                              | underline on hover; visited dotted (label in Figma) |

Flavors map to Palette tokens (`primary/700`, `success/600`, …); `light`/`dark` shift on hover per `_link.css`. Docs **`stretched-link`**: parent `position: relative`; `::after` overlay (`Card/stretched-link` `191:107`).

**Modal component set** — properties khớp `modal.mdx` + `_modal.css`:

| Property     | Values                    | Ghi chú                                           |
| ------------ | ------------------------- | ------------------------------------------------- |
| `Size`       | sm, default, lg, xl, full | `container-sm` … `container-5xl`; full = viewport |
| `Scrollable` | true, false               | body scroll vs whole dialog scroll                |

Mini preview 320×200; parts: `modal-backdrop`, `modal-dialog`, `modal-content`, `modal-header` / `modal-body` / `modal-footer`, `Modal.Close`, `useModalStore` + `Modal.Container`. Docs modal instances: **`FIXED`** sizing (layoutMode NONE — no FILL clip).

**Toggle component set** — properties khớp `toggle.mdx` + `_toggle.css`:

| Property   | Values      | Ghi chú                                         |
| ---------- | ----------- | ----------------------------------------------- |
| `Pressed`  | true, false | `data-pressed` tint via `color-mix` primary 12% |
| `Disabled` | true, false | opacity 0.5                                     |

Chrome: 32×32 min, radius 6px, `--toggle-variant-color` / item-* transparent mix. **`Toggle group`** (`189:301`): exclusive segmented control (`toggle-group` border + inner chips). Docs instances: **`HUG`** in GRID sample column.

Script order: `00-create-page` → `01-link-components` → `02-modal-components` → `03-toggle-components` → `04-link-docs` → `05-modal-docs` → `06-toggle-docs` → `07-fix-layout`.

**Effect styles page** (`Effect styles`, node `122:2`): Figma effect styles for focus rings and shadows. Re-patch live headers: `scripts/figma/lib/patch-page-effect-styles-compact.js`.

| Frame                  | Node ID  | Purpose                                           |
| ---------------------- | -------- | ------------------------------------------------- |
| `Effect styles — docs` | `128:10` | Docs board — focus rings (left) + shadows (right) |

Deep link:

```
https://www.figma.com/design/utHs1nKeQwcoVfmc4FOEiW/Polyms?node-id=128-10
```

Docs headers:

| Section header | Header node | Solar icon       | Contents                                      |
| -------------- | ----------- | ---------------- | --------------------------------------------- |
| Effect styles  | `133:2`     | `SpecialEffects` | Focus rings + focus rings with shadows cards  |
| Shadows        | `139:5`     | `Layers`         | Shadow scale (xs–3xl) + semantic shadow cards |

Focus ring cards: `focus-ring`, `focus-ring-error`, `focus-ring-shadow-xs/sm`, `focus-ring-error-shadow-xs`. Shadow cards: `shadow/xs` … `shadow/3xl` scale + `shadow/base`, `raised`, `overlay`, `sticky`, `popout`, `bottom`.

### Variable collections (Figma)

| Collection            | Modes       | Maps to                                            |
| --------------------- | ----------- | -------------------------------------------------- |
| Primitives            | Value       | Base scales (`slate/*`, Tailwind hue ramps)        |
| Palette               | Value       | `slate/*`, `primary/*`, semantic hue ramps         |
| Color                 | Light, Dark | `--body`, `--fg`, `--surface`, …                   |
| Spacing               | Value       | `spacing/*`                                        |
| Radius                | Value       | `radius/*`                                         |
| Typography Primitives | Value       | `family/*`, `scale/*`, `weight/*`, `line-height/*` |
| Typography            | Value       | Composed type tokens                               |
| Control               | Value       | Button/input line-heights                          |
| Z-Index               | Value       | Layer stack                                        |

Repo mirror: `ui-kit/src/styles/_root.css` (+ `_typography.css`, `_button.css`, …).

### Gray ramp — slate only (never neutral)

Polyms gray chrome uses **`slate/*`** in Figma and **`--color-slate-*`** in CSS. Do **not** create or alias `neutral/*`, `color-neutral-*`, or Tailwind `neutral-*` — that naming came from a Carbon-style refactor and drifted from repo conventions.

| Layer            | Figma token                                          | CSS (repo)                               |
| ---------------- | ---------------------------------------------------- | ---------------------------------------- |
| Palette          | `slate/50` … `slate/950`                             | `--color-slate-50` … `--color-slate-950` |
| Color (semantic) | `color/fg` → `slate/900` (light), `slate/100` (dark) | `--fg: var(--color-slate-900)`           |
| Color (semantic) | `color/muted`, `color/line`, `color/surface`         | alias `slate/*` steps — see `_root.css`  |
| Token board      | `Seed/Slate` swatches bind `slate/*`                 | label **Slate**, not neutral             |

When adding or retargeting Color-collection aliases, point gray tokens at **Palette `slate/*`**, not `neutral/*`.

### MDX ↔ Figma mapping

| MDX (`web/src/pages/docs/`) | Figma page (canonical → live)             | Section / docs frame                       |
| --------------------------- | ----------------------------------------- | ------------------------------------------ |
| `button.mdx`                | Button → live `Actions` (`143:2`)         | `Button — docs` `143:3`                    |
| `badge.mdx`                 | Badge / Items → `Badge` (`165:105`)       | `Badge — docs` `171:42`                    |
| `item.mdx`                  | Badge / Items → `Badge`                   | `Interactive items — docs` `171:236`       |
| `avatar.mdx`                | Avatar / Items → `Avatars` (`178:2`)      | `Avatar — docs` `179:237` + rows `179:160` |
| `field.mdx`                 | Form / Items → `Data input` (`180:2`)     | `Field — docs` `180:433`                   |
| `select.mdx`                | Form / Items → `Data input`               | `Select — docs` `180:511`                  |
| `switch.mdx`                | Form / Items → `Data input`               | `Switch — docs` `180:574`                  |
| `checkbox.mdx`              | Form / Items → `Data input`               | `Checkbox — docs` `183:555` @ (80, 1213)   |
| `radio.mdx`                 | Form / Items → `Data input`               | `Radio — docs` `183:644` @ (520, 1213)     |
| _(form composition)_        | Form / Items → `Data input`               | `Form — docs` `180:581` @ (1400, 80)       |
| `alert.mdx`                 | Feedback / Items → `Feedback` (`183:102`) | `Alert — docs` `183:929`                   |
| `offcanvas.mdx`             | Feedback                                  | `Offcanvas — docs` `183:1089`              |
| `popover.mdx`               | Feedback                                  | `Popover — docs` `183:1030`                |
| `spinner.mdx`               | Feedback                                  | `Spinner — docs` `199:823` @ (80, 900)     |
| `toast.mdx`                 | Feedback                                  | `Toast — docs` `183:1317`                  |
| `tooltip.mdx`               | Feedback                                  | `Tooltip — docs` `183:1377`                |
| `link.mdx`                  | Actions / Items (`189:2`)                 | `Link — docs` `190:42`                     |
| `modal.mdx`                 | Actions / Items                           | `Modal — docs` `190:268`                   |
| `toggle.mdx`                | Actions / Items                           | `Toggle — docs` `190:313`                  |

**MDX chưa có board Figma** (còn trên docs site): `accordion`, `breadcrumb`, `card`, `collapsible`, `dark-mode`, `dynamic`, `menu`, `navigation-menu`, `number-field`, `skeleton`, `table`, `tabs`, `toolbar`, `use-render`, `z-index`. Token / effect: Polyms token set + Effect styles (không map 1:1 MDX component).

### Script folders (canonical)

```
scripts/figma/
  badge-items/     01–05 (+ optional 00)
  avatar-items/    00–05
  form-items/      00–10 (08 checkbox, 09 radio, 10 checkbox-radio-docs; chạy lại 07-fix-layout cuối)
  feedback-items/  00–13
  actions-items/   00–07
  lib/
    docs-header.js
    solar-icon-paths.json
    patch-page-143-2-compact.js
    patch-page-165-105-compact.js
    patch-page-178-2-compact.js
    patch-page-180-2-compact.js
    patch-page-183-102-compact.js
    patch-page-189-2-compact.js
    patch-page-effect-styles-compact.js
```

Khi `find scripts/figma` thiếu file: lấy lại từ session trước / regenerate — mapping ở trên vẫn là source of truth cho tên + thứ tự chạy.

### MCP / automation

- **Figma MCP:** `plugin-figma-figma` — `use_figma` / `get_metadata` với `fileKey: utHs1nKeQwcoVfmc4FOEiW`
- **Skills:** `/figma-use` trước `use_figma`; design-to-library qua `/figma-generate-library`
- Switch page bằng **node ID** (`figma.getNodeByIdAsync('183:102')`) rồi `setCurrentPageAsync` — live names (`Feedback`, `Data input`, `Actions` cho Button…) có thể lệch canonical
- Token board: `await figma.setCurrentPageAsync(...)` tới `Polyms token set` (`16:2`) trước query biến

### Typography board details

- **Fonts:** Quicksand (sans/display), JetBrains Mono (mono) — bind `family/sans`, `family/display`, `family/mono`
- **Dimensions `eg`:** spacing bars + radius previews use **`slate/900`** fill (not primary orange; never `neutral/*`)
- **Type Styles column:** body specimens use bilingual playful copy; code style uses JetBrains Mono

## Before designing

- Read **`CONTEXT.md`** for screen and domain naming (when present)
- Read **`docs/adr/`** for UI constraints
- Invoke **`/ui-kit`** before component mapping
- For token board work: read **`ui-kit/src/styles/_root.css`** and this Figma section

## Rules

- Every screen spec includes loading, empty, error, and success states
- Custom components require documented exception — do not invent in `/dev` without approval
- Figma token board is reference/documentation — implementation tokens live in CSS
