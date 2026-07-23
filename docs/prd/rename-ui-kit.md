# PRD: Rename core-ui → ui-kit (one-shot)

## Problem Statement

Kit UI Polyms đang mang tên **core-ui** trên npm, GitHub, Nx, skill agent và CLI, trong khi bộ skill agentic của Polyms đã brand **ai-kit**. Engineer và agent phải nhớ hai họ tên không khớp; docs và skill nói “Core UI” trong khi hướng đi sản phẩm là **ui-kit**. Chi phí: import path lệch brand, skill installer `core-ui-skill`, và không có cutover rõ ràng sang tên mới.

## Solution

Đổi **một phát** toàn bộ bề mặt công khai sang **ui-kit**: package npm `@polyms/ui-kit` bản đầu `1.0.0`, repo GitHub rename in-place thành `polyms/ui-kit` (giữ issues và redirect), thư mục/project Nx `ui-kit/`, agent skill `ui-kit`, CLI `ui-kit-skill`, docs và CI. Ngừng publish dưới tên `@polyms/core-ui`; không gắn deprecate message trên registry; không giữ alias dual-package. Thư viện icon `@polyms/icons` làm **sau** cutover này.

## Success Criteria

1. Import và document công khai chỉ còn `@polyms/ui-kit` — zero `@polyms/core-ui` trong monorepo (trừ glossary lịch sử).
2. Bản đầu publish được là `@polyms/ui-kit@1.0.0`; tag release Nx dạng `ui-kit@1.0.0`.
3. Repo GitHub là `polyms/ui-kit` (rename in-place); issues cũ vẫn truy cập được qua redirect.
4. Skill installer consumer dùng `ui-kit-skill` và cài skill vào thư mục `ui-kit`.

## User Stories

**US-01 — Import package tên mới** (P0)  
*As an* engineer product, *I want* `import { … } from '@polyms/ui-kit'`, *so that* app khớp brand ui-kit / ai-kit.  
*Why P0:* Không có package name mới thì rename thất bại.

```
Given monorepo đã cutover
When tôi cài `@polyms/ui-kit@1.0.0` và import barrel
Then TypeScript/runtime resolve được và không cần `@polyms/core-ui`
```

**US-02 — Skill và CLI tên mới** (P0)  
*As an* engineer chạy agent skill, *I want* `ui-kit-skill` cài skill `ui-kit`, *so that* Cursor/Claude load đúng bộ hướng dẫn.  
*Why P0:* Skill cũ `core-ui` sẽ lệch package.

```
Given package `@polyms/ui-kit` đã build
When chạy `ui-kit-skill --dry-run` trên consumer
Then target path là `.cursor|.claude|.agents/skills/ui-kit` và nguồn skill là `skills/ui-kit`
```

**US-03 — Docs và agent docs đồng bộ** (P0)  
*As a* maintainer, *I want* docs site và AGENTS nói Polyms UI Kit / `@polyms/ui-kit`, *so that* không còn hướng dẫn core-ui.  
*Why P0:* Docs lệch = agent/human làm sai.

```
Given cutover merge
When grep monorepo cho `@polyms/core-ui` và `core-ui-skill`
Then không còn match ngoài CONTEXT glossary lịch sử
```

**US-04 — CI publish path mới** (P0)  
*As a* maintainer, *I want* workflow tag `ui-kit@*` publish `dist/ui-kit`, *so that* release không trỏ artifact cũ.  
*Why P0:* Sai path CI = ship nhầm hoặc fail.

```
Given tag `ui-kit@1.0.0`
When pipeline release chạy
Then build/publish dùng `dist/ui-kit` và package name `@polyms/ui-kit`
```

**US-05 — GitHub rename in-place** (P0)  
*As a* maintainer, *I want* repo đổi tên `polyms/ui-kit` giữ issues, *so that* lịch sử tracker không mất.  
*Why P0:* Tạo repo mới phá continuity.

```
Given cutover code đã merge
When rename GitHub in-place
Then URL cũ redirect; issues/PR cũ vẫn thuộc repo mới
```

**US-06 — Migration note cho consumer** (P1)  
*As an* engineer app ngoài, *I want* README/changelog nói rõ đổi import và major `1.0.0`, *so that* nâng cấp có checklist.

## Implementation Decisions

- One-shot hard cut: không alias `@polyms/core-ui` song song; không deprecate message trên registry — chỉ ngừng publish tên cũ.
- Chuỗi tên một hàng: npm `@polyms/ui-kit`, repo `polyms/ui-kit`, Nx folder/project `ui-kit`, skill `ui-kit`, bin `ui-kit-skill`, output `dist/ui-kit`.
- Version cutover: `1.0.0` (major đầu sau chuỗi `0.4.x`).
- Thứ tự initiative: rename **trước**; `@polyms/icons` **sau** (version lockstep với ui-kit sau này).
- Project docs Nx giữ tên `docs`.
- Test seam chính: build/test Nx project `ui-kit` + grep gate tên cũ + skill installer dry-run.

## Testing Decisions

- Ưu tiên hành vi bên ngoài: package name/version trên `package.json` publish, import barrel, bin skill, CI path.
- Chạy `nx build ui-kit`, `nx test ui-kit`, smoke docs import `@polyms/ui-kit`.
- Grep gate zero `@polyms/core-ui` / `core-ui-skill` / `dist/core` (trừ glossary lịch sử).
- Prior art: suite Vitest hiện có của thư viện UI — giữ nguyên sau rename path.

## Out of Scope

- Scaffold và migrate thư viện `@polyms/icons` (initiative riêng, sau rename).
- Deprecate/unpublish bắt buộc trên registry cho `@polyms/core-ui`.
- Dual-package / soft migration period.
- Đổi brand repo ai-kit.

## Open Questions

_Không còn._

## Further Notes

Ops GitHub rename và first publish `1.0.0` lên GitHub Packages thực hiện sau khi CI xanh trên nhánh cutover.

## Repo references

- `CONTEXT.md` — glossary ui-kit / core-ui / icons / ai-kit
- `docs/prd/rename-ui-kit.md` — mirror lean PRD trong repo
- `docs/prd/icons.md` — initiative icons (sau cutover)
