# Điều hướng tài liệu

Người đọc tìm trang hướng dẫn qua sidebar, lọc theo tiêu đề hoặc đường dẫn, rồi mở trang component. Cách điều hướng đổi theo kích thước viewport.

## Sub-features

- component-search: Lọc trang theo tiêu đề hoặc route.
- category-navigation: Mở nhóm tài liệu và điều hướng đến trang; trang hiện tại được đánh dấu.
- responsive-navigation: Mở điều hướng dạng sidebar đầy đủ, rail hoặc drawer.

## How to get to it (user POV)

Mở bất kỳ trang docs nào. Trên màn hình rộng, dùng sidebar; trên màn hình hẹp hoặc rail, mở điều hướng từ nút `Open navigation`. Nhập tên component vào `Find components...`, mở nhóm tương ứng và chọn trang cần xem.

## Driving it

- Root: `#app-sidebar`
- Search: nhập tên component vào ô `Find components...`; kết quả lọc theo title và route.
- Navigate: mở nhóm tài liệu rồi chọn trang; kết quả là route và tiêu đề trang tương ứng, cùng mục nav active.
- Responsive drawer: mở điều hướng từ dock, chọn trang; drawer đóng sau khi điều hướng.

## Gotchas

- Harness hiện là `none`; chạy site và kiểm tra trực tiếp trên desktop lẫn viewport hẹp.
- Nhóm và nhãn nav sinh từ metadata của các trang MDX; đổi `title` hoặc `type` có thể đổi kết quả search và vị trí trong nhóm.
- Full sidebar, rail và drawer có markup khác nhau; kiểm tra ít nhất đường đi bằng sidebar đầy đủ và đường đi bằng drawer.
- Sau khi chọn mục trong drawer, drawer đóng theo thiết kế; đừng hiểu trạng thái đóng là navigation thất bại.
