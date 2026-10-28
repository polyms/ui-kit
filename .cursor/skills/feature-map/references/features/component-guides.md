# Hướng dẫn component

Người đọc mở một trang component để xem cách dùng, thử demo trực tiếp, chuyển sang mã nguồn mẫu và tra cứu API khi trang có API Reference.

## Sub-features

- component-preview: Tương tác với demo sống trong trang hướng dẫn.
- source-example: Chuyển giữa Preview và Code để xem mã demo.
- api-reference: Tra cứu props được khai báo cho trang component.
- in-page-navigation: Dùng TOC để nhảy đến heading và theo dõi vị trí đang đọc.

## How to get to it (user POV)

Mở một trang component, ví dụ `/docs/button`. Tương tác với preview, chuyển sang tab Code, rồi dùng TOC để đến phần Usage hoặc API Reference. Trên màn hình rộng TOC nằm cạnh nội dung; trên màn hình hẹp TOC mở từ floating dock.

## Driving it

- Root: `.docs-page`
- Route: mở `/docs/button`; trạng thái cuối là heading `Button` cùng nội dung trang.
- Preview: trong tabset demo, chọn tab `Preview`; tương tác với component nếu demo có state.
- Code: chọn tab `Code`; chờ syntax-highlighted source xuất hiện.
- TOC: chọn heading trong aside hoặc popover; trạng thái cuối là heading đó hiển thị trong viewport.
- API: cuộn đến `API Reference` nếu trang có khai báo `apis` trong frontmatter.

## Gotchas

- Harness hiện là `none`; cần thao tác trực tiếp trên site và quan sát trạng thái hiển thị.
- TOC aside chỉ có ở viewport từ 1280px; nhỏ hơn thì mở từ floating dock.
- Không phải trang nào cũng khai báo `apis`, nên API Reference không xuất hiện trên mọi trang.
- Code preview được highlight bất đồng bộ; chờ panel Code có nội dung trước khi đánh giá.
- Một số demo tĩnh không có thao tác tương tác; chỉ thử trạng thái mà demo thực sự cung cấp.
