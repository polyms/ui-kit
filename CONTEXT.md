# Polyms UI Kit (core-ui → ui-kit)

Monorepo thư viện UI React của Polyms và site docs. Sản phẩm công khai sau cutover: **ui-kit** (cặp brand với ai-kit).

## Language

**ui-kit**:
Tên đích chính thức của thư viện UI sau rename one-shot: npm `@polyms/ui-kit`, repo GitHub `polyms/ui-kit`, Nx project/folder `ui-kit/`, agent skill `ui-kit`, CLI bin `ui-kit-skill`. Bản cutover đầu: **`1.0.0`**.
_Avoid_: core-ui (tên cũ), `@polyms/core-ui`, gọi tắt "core" khi nói package công khai

**core-ui**:
Tên lịch sử trước rename — package `@polyms/core-ui`, repo `polyms/core-ui`, Nx `core/`, skill `core-ui`. Không dùng cho artifact mới sau cutover. Repo GitHub **rename in-place** sang `polyms/ui-kit` (giữ issues/PR/redirect). Sau cutover: **ngừng publish** tên cũ; **không** gắn deprecate message trên registry.
_Avoid_: dùng song song với ui-kit như hai sản phẩm; tạo repo GitHub mới rồi bỏ issues cũ; npm deprecate / unpublish bắt buộc như phần cutover

**icons**:
Package glyph riêng `@polyms/icons` (Nx `icons/`), BoldDuotone, provenance `solar/` + `polyms/`. Version lockstep với package UI; ship **sau** rename ui-kit.
_Avoid_: nhúng icon vào barrel ui-kit; Hugeicons/Solar như dependency product lâu dài

**ai-kit**:
Bộ skill/agent Polyms (repo/kit riêng) — cặp brand với ui-kit; không thuộc monorepo này.
_Avoid_: nhầm ai-kit với agent skill `ui-kit` trong package UI
