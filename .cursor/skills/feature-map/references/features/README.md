# Feature map

Bản đồ hành vi của docs site. Agent dùng index này để mở đúng một file khu vực; maintainer dùng index làm danh sách hồi quy.

## Baseline preconditions

- Site docs mở được và chưa có modal hoặc drawer che khu vực cần thao tác.
- Ưu tiên accessible name và selector ổn định; class chỉ dùng khi không có selector phù hợp hơn.
- Chờ trạng thái cuối quan sát được; không dùng thời gian chờ cố định.

## Proof and skip reporting

File khu vực là tập hành vi cần rà cho thay đổi thuộc khu vực đó. Khi thay đổi đi qua nhiều khu vực, đọc thêm `journeys.md` nếu index có liệt kê.

- Thử mọi điểm vào có thể bị ảnh hưởng, gồm thành công, hủy, lỗi, trạng thái rỗng và trạng thái sau điều hướng khi áp dụng.
- Ghi lại thao tác và trạng thái cuối quan sát được.
- Nếu không thể đi qua một nhánh, ghi rõ nhánh và nguyên nhân; kiểm tra đường gần nhất có thể thực hiện.

## Areas

- [docs-navigation](docs-navigation.md) — tìm trang, lọc kết quả và điều hướng trong sidebar responsive.
- [component-guides](component-guides.md) — dùng TOC, demo Preview/Code và API Reference của trang component.
- [journeys](journeys.md) — từ tìm trang component đến xác nhận demo và mã nguồn.

## Entry contract

Mỗi file khu vực dùng đúng các H2 sau theo thứ tự: `Sub-features`, `How to get to it (user POV)`, `Driving it`, `Gotchas`.
