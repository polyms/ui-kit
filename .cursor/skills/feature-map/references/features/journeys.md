# Từ tìm kiếm đến demo component

Luồng này kiểm tra việc người đọc tìm được một component, mở đúng trang hướng dẫn và xem được demo cùng mã nguồn của nó.

## Sub-features

- find-and-inspect-component: Từ search/sidebar điều hướng đến trang component rồi kiểm tra Preview, Code và TOC.

## How to get to it (user POV)

Bắt đầu ở một trang docs, nhập `Button` vào ô tìm kiếm sidebar, mở kết quả Button, rồi xem preview và mã nguồn mẫu. Dùng TOC để nhảy giữa các phần của cùng trang.

## Driving it

- Root: `#app-sidebar`
- Search: nhập `Button` vào `Find components...`.
- Navigate: chọn `Button` trong nhóm Actions; chờ route `/docs/button` và heading `Button`.
- Preview: chọn tab `Preview` trong CodePreview và xác nhận demo hiện ra.
- Code: chọn tab `Code` và xác nhận source của demo được highlight.
- TOC: chọn một heading như `Usage`; xác nhận heading cuộn vào viewport.

## Gotchas

- Harness hiện là `none`; chạy toàn bộ journey thủ công trên site.
- Thử đường desktop và đường drawer/rail ở viewport hẹp; các control điều hướng có markup khác nhau.
- Sau navigation, drawer đóng theo thiết kế; xác nhận route và heading thay vì chỉ dựa vào drawer.
- Một số trang không có API Reference; journey này không yêu cầu phần đó.
- Code syntax highlighting bất đồng bộ; chờ nội dung hiển thị trước khi xác nhận.
