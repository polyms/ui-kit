# Trang chủ

Người đọc mở `/` để thử component thật trên hero và playground, copy lệnh cài, mở FAQ, rồi đi tiếp sang tài liệu.

## Sub-features

- hero-shelf: Bấm nút mẫu và bật `Round the corners`; chữ trạng thái và snippet `<Button>` đổi theo.
- playground-theme: Đổi Cyan, Violet hoặc Orange, bật `Dark preview`, rồi `Reset demo` về cyan và light.
- playground-workspace: Chuyển tab Project / Preferences, hoàn thành bước, bật tắt `Daily digest`.
- playground-overlays: Mở dialog hoặc offcanvas; panel mang palette và light/dark đang chọn, rồi đóng lại.
- install-copy: Copy `pnpm add @polyms/ui-kit` và đọc trạng thái clipboard.
- home-paths: Nhảy tới playground, installation, design system, token, Button, Modal, hoặc link ngoài.
- faq: Mở và đóng từng câu trong accordion.

## How to get to it (user POV)

Mở `/`. Trang này không có sidebar docs. Skip link `Skip to the playground` hoặc mục `Playground` trên nav đưa tới `#playground`. Hero có kệ component riêng, phía dưới là playground, lệnh cài, FAQ và footer.

## Driving it

- Root: `[data-testid="home-page"]`
- Hero: bấm `Give it a click`; trạng thái cuối là nút `One more time?` và chữ `That’s the feeling.`. Tắt `Round the corners`; snippet thành `<Button />`. Nút `View Button documentation` mở `/docs/button`.
- Palette: trong `Preview color`, bấm `Violet`; `[data-testid="landing-preview"]` có `data-palette="violet"` và swatch Violet ở trạng thái pressed.
- Mode: bật `Dark preview`; preview có `data-mode="dark"`.
- Reset: bấm `Reset demo`; preview về `data-palette="cyan"` và `data-mode="light"`, tab Project hiện lại badge `In progress`.
- Workspace: trong tablist `Workspace preview`, chọn `Preferences` và tắt `Daily digest`; chữ thành `Daily summary paused.`. Về `Project`, bấm `Finish this step`; nút thành `Step completed` và status `Step complete. Looking good!`.
- Dialog: bấm `Try a dialog`; `[data-testid="playground-dialog"]` hiện heading `A little focus goes a long way.` và palette đang chọn. `Back to playing` hoặc Escape đóng dialog, focus về nút mở.
- Offcanvas: bấm `Try an offcanvas`; `[data-testid="playground-offcanvas"]` hiện `A little space for the details.` và dòng Appearance `Light` hoặc `Dark`. `Back to the workspace` đóng panel.
- Copy: bấm `Copy install command`; status là `Copied to clipboard.` hoặc `Select the command and copy it manually.`
- Paths: `Get started` và `Let’s get building` mở `/installation`. Nav `Design system` và `Explore components` mở `/design-system`. Story: `Explore the components` mở `/design-system`, `See composition in action` mở `/docs/modal`, `Meet your design tokens` mở `/design-tokens`. `Explore the Button API` mở `/docs/button`. Footer `Design system` mở `/design-system`, `Typography` mở `/typography`.
- FAQ: bấm `What do I need to get started?`; panel hiện và nhắc installation guide. Bấm lại thì panel đóng.

## Gotchas

- Harness hiện là `none`; chạy site và kiểm tra trực tiếp trên `/`.
- Trang dùng layout landing, không có `#app-sidebar`. Đừng coi thiếu sidebar là lỗi.
- `Reset demo` chỉ dựng lại workspace trong preview. Kệ hero giữ trạng thái click và bo góc của nó.
- Dialog và offcanvas đọc palette và dark mode tại lúc mở. Đổi swatch khi panel đang mở thì nội dung panel đổi theo.
- Clipboard bị chặn thì status yêu cầu copy tay; lệnh trong `<code>` vẫn là `pnpm add @polyms/ui-kit`.
- GitHub (`https://github.com/polyms/ui-kit`) và Polyms (`https://polyms.dev`) mở tab mới. Đừng chờ route trong app.
- Khối story đổi hình theo scroll. Timeline `Building steps` hiện `Pick`, rồi `Compose`, `Customize`; bước đang active có `aria-current="step"`. Cảnh minh họa là `aria-hidden`, không còn dòng `01 / 03`. Viewport hẹp vẽ hình trong từng bước. Hồi quy đường đi bằng ba link chữ, không bằng vị trí scroll.
- `prefers-reduced-motion` tắt animation vào viewport. Thao tác nút, switch, tab và overlay vẫn chạy.
