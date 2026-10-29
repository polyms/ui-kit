# Bản đồ khu vực tính năng

Bản đồ này định tuyến câu hỏi về hành vi của docs site đến đúng file khu vực. Hãy dùng `/build-feature-map` để tạo khu vực hoặc sửa hợp đồng H2. Khi thêm component công khai, ghi route trang vào file khu vực khớp trong cùng thay đổi — xem `AGENTS.md`, mục _Component công khai — đủ ba artifact_. Không sửa bản symlink.

Skill: .agents/skills/feature-map/SKILL.md
Index: .agents/skills/feature-map/references/features/README.md
Harness: none

File gốc nằm ở `.agents/skills/feature-map`. Cả folder `.agents/skills` được symlink sang Cursor (`.cursor/skills`), Claude (`.claude/skills`), Copilot (`.github/skills`) và Gemini (`.gemini/skills`). Thêm skill mới chỉ cần đặt trong `.agents/skills`. Không tạo bản sao thứ hai, không link từng skill.
