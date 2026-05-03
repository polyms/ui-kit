# Core-UI — chỉ dẫn cho GitHub Copilot

**Nội dung đầy đủ và duy nhất** cho mọi AI agent (Cursor, Claude, Copilot, …) nằm ở [`AGENTS.md`](../AGENTS.md) ở **thư mục gốc** repository.

File `.github/copilot-instructions.md` là đường dẫn mặc định mà GitHub Copilot đọc; giữ file này ngắn để tránh trùng lặp — mọi thay đổi quy ước nên sửa trong **`AGENTS.md`**.

**Tóm tắt một dòng:** monorepo Nx (`core` = thư viện UI, `docs` = MDX + TanStack Router); `pnpm dev` chạy docs; `pnpm test` = Vitest trên `core`; Biome cho lint/format; separator section **110 ký tự** trong file TSX; màu xám dùng **`--color-slate-*`**.
