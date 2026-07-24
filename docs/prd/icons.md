# PRD: Thư viện icon Polyms (`@polyms/icons`)

| Field        | Value                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Author       | Polyms PM                                                                 |
| Status       | In Review                                                                 |
| Version      | 1.2                                                                       |
| Last updated | 2026-07-24                                                                |
| Stakeholders | Maintainer thư viện UI, engineer product dùng kit, agent `/dev` `/design` |

## 1. Executive Summary

Polyms xây package icon riêng `@polyms/icons` (Nx project `icons/`), ship style **BoldDuotone** qua entry `@polyms/icons/bold-duotone` (export tên ngắn, ví dụ `Home` — style đã nằm trong path). v1 **clone nguyên bộ BoldDuotone Solar** vào provenance `solar/` (CC BY 4.0) và giữ `polyms/` cho glyph custom; publish **cùng pipeline / cùng version number với `@polyms/ui-kit`**. Initiative thay thế cả `@hugeicons/*` và `@solar-icons/*` trong monorepo — demos, skill, Figma notes, builtin core — một họ icon, một import path.

## 2. Problem Statement

### Background

Kit UI hiện tại (`@polyms/ui-kit`) không sở hữu bộ icon. Docs demos và skill bắt buộc `@hugeicons/react` + `@hugeicons/core-free-icons`; trong khi docs board headers trên Figma và một số surface marketing dùng `@solar-icons/react-perf` BoldDuotone. Builtin core (Select tick, Offcanvas close) hardcode path SVG từ Hugeicons CDN. Kết quả: hai họ icon song song, skill lệch Figma, và dependency vendor bên ngoài cho glyph “chuẩn kit”.

### Problem

- **Engineer / agent** nhận hướng dẫn “chỉ dùng Hugeicons”, nhưng design board và một số page dùng Solar → chọn icon theo skill thì lệch visual với Figma.
- **Maintainer** không kiểm soát license/attribution tập trung; path CDN Hugeicons trong core gắn runtime vào vendor bên thứ ba.
- **Consumer product** không có package icon “của Polyms” version cùng kit — mọi màn hình phụ thuộc hai họ vendor khác nhau.

Chi phí không giải quyết: drift visual tăng theo mỗi demo mới; skill và design notes mâu thuẫn; khó audit license khi ship kit ra ngoài monorepo.

### Opportunity

Một package `@polyms/icons` chứa **toàn bộ** glyph BoldDuotone Solar (vendor SVG + codegen React tree-shakeable) cộng glyph `polyms/` khi thiếu; entry BoldDuotone duy nhất ở v1; monorepo migrate hết về một path; attribution CC BY trong LICENSE; skill và Figma cùng một họ; version lockstep với ui-kit.

## 3. Goals & Success Metrics

| Goal                                     | Metric                                            | Target                                      | Measurement method                                                         |
| ---------------------------------------- | ------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| Một import path chính thức cho icon v1   | Số entry path được document & dùng trong monorepo | = 1: `@polyms/icons/bold-duotone`           | Rà soát import trong monorepo + README package / skill                     |
| Loại bỏ vendor icon cũ trong monorepo    | Dependency `@hugeicons/*` và `@solar-icons/*`     | = 0 sau migrate                             | `package.json` workspace + lockfile; grep import                           |
| Sở hữu glyph + provenance rõ             | Thư mục nguồn SVG theo provenance                 | Có `solar/` (full BoldDuotone) và `polyms/` | Cấu trúc package icons + đếm file SVG Solar ≈ catalog upstream BoldDuotone |
| Version lockstep với ui-kit              | Version `@polyms/icons` vs `@polyms/ui-kit`       | Cùng số version mỗi release                 | `nx release` / package metadata                                            |
| Tuân thủ CC BY 4.0 cho glyph Solar       | Attribution trong artifact phân phối              | Có trong LICENSE (và NOTICE nếu cần)        | Review file LICENSE của package trước publish                              |
| Builtin core không phụ thuộc CDN vendor  | Select tick / Offcanvas close                     | 0 URL `cdn.hugeicons.com`                   | Grep source ui-kit                                                         |
| Skill và design guidance đồng bộ họ icon | Hard rule skill + design notes                    | Cùng trỏ `@polyms/icons/bold-duotone`       | Diff skill + design agent docs sau migrate                                 |

### Non-goals

- Rename marketing đã tách sang PRD rename ui-kit (làm trước icons).
- Ship nhiều style (Linear, Outline, Broken, Bold, …) trong v1 — **chỉ** BoldDuotone; không clone 5 style còn lại của Solar.
- Suffix tên component theo style (`HomeBoldDuotone`) — style đã encode trong subpath.
- Version / publish `@polyms/icons` lệch lịch hoặc lệch số version so với `@polyms/ui-kit`.
- Re-export icon qua barrel `@polyms/ui-kit`.
- Plugin Figma sync tự động glyph (có thể Future / P2 — không chặn MVP).

## 4. Users & Personas

### Primary persona

- **Who:** Engineer product dùng kit Polyms (app consumer).
- **Need:** Import icon ổn định, tree-shake được, style khớp design system, không phải chọn giữa hai họ vendor.
- **Pain today:** Skill bảo Hugeicons; Figma/headers dùng Solar; API hai họ khác nhau (`HugeiconsIcon` wrapper vs component Solar trực tiếp).

### Secondary personas

- **Agent `/dev` / `/design` (skill consumer):** Cần hard rule một họ icon để generate UI không lệch board; hiện rule ghi Hugeicons trong khi design notes ghi Solar BoldDuotone.
- **Maintainer thư viện:** Cần thêm/bớt glyph có quy trình (SVG → codegen), version package riêng, audit attribution khi vendor Solar glyph, và migrate monorepo sạch deps cũ.

## 5. User Stories

### P0 — MVP shippable

**US-01 — Import BoldDuotone từ package Polyms**  
_As an_ engineer product, _I want_ import từng icon từ `@polyms/icons/bold-duotone`, _so that_ mọi màn hình dùng một path chính thức và tree-shake được.  
_Why P0:_ Không có entry path thì initiative không có surface dùng được.

```
Given package `@polyms/icons` đã publish/link trong workspace (cùng version với ui-kit khi release)
When tôi import `{ Home }` từ `@polyms/icons/bold-duotone` và render trong React
Then component render SVG BoldDuotone; tên export **không** mang suffix style; không yêu cầu `@hugeicons/*` hay `@solar-icons/*`
```

```
Given tôi chỉ import một named icon từ entry bold-duotone
When bundler build production (Vite hoặc tương đương trong monorepo)
Then bundle không chứa toàn bộ catalog icon của package (tree-shake per icon) — dù package chứa full BoldDuotone Solar
```

**US-02 — Props size / color / currentColor**  
_As an_ engineer product, _I want_ chỉnh `size` và màu (`color` hoặc `currentColor`), _so that_ icon khớp typography và theme semantic mà không sửa SVG tay.  
_Why P0:_ API styling tối thiểu để thay Hugeicons/Solar trong demos hiện có.

```
Given một icon component từ `@polyms/icons/bold-duotone`
When tôi truyền size số (px) hoặc tương đương đã document
Then SVG hiển thị đúng kích thước đó
```

```
Given icon nằm trong phần tử có `color` CSS / text color theme
When tôi dùng màu mặc định theo contract (currentColor hoặc prop color đã document)
Then fill/stroke của glyph bám theo màu đó (không kẹt hex cứng từ file nguồn, trừ khi glyph duotone cố ý hai tầng — tầng chính vẫn follow color contract đã chốt trong design/API)
```

**US-03 — Provenance SVG + attribution CC BY**  
_As a_ maintainer, _I want_ glyph Solar nằm trong provenance `solar/` và attribution CC BY 4.0 trong LICENSE, _so that_ phân phối package hợp pháp và audit được.  
_Why P0:_ Compliance chặn ship nếu thiếu.

```
Given glyph lấy từ Solar Icons (480 Design)
When glyph được thêm vào package
Then file SVG nằm dưới provenance `solar/` (không lẫn `polyms/`)
```

```
Given package `@polyms/icons` sẵn sàng phân phối
When reviewer mở LICENSE (và NOTICE nếu có)
Then có attribution CC BY 4.0 cho Solar / 480 Design đủ để tuân thủ
```

**US-04 — Migrate monorepo demos + skill + core builtins**  
_As a_ maintainer, _I want_ docs demos, skill hard rule, và builtin Select/Offcanvas dùng `@polyms/icons` (hoặc SVG đã vendored từ package), _so that_ monorepo không còn dual family.  
_Why P0:_ Mục tiêu “thay thế cả Hugeicons và Solar trong monorepo này” là lý do initiative tồn tại.

```
Given migrate P0 hoàn tất
When grep workspace cho `@hugeicons` và `@solar-icons`
Then không còn dependency hay import runtime trong monorepo (trừ ghi chú lịch sử trong Appendix/PRD nếu cần)
```

```
Given Select item tick và Offcanvas close
When mở source builtin tương ứng
Then không còn URL `cdn.hugeicons.com`; glyph lấy từ bộ Polyms icons (inline từ package hoặc SVG vendored cùng provenance)
```

```
Given skill `ui-kit` hard rules và quality guidance về icons
When agent đọc skill sau migrate
Then hard rule trỏ `@polyms/icons/bold-duotone` (không còn bắt buộc `@hugeicons/react`)
```

**US-05 — Glyph custom Polyms khi thiếu / override**  
_As a_ maintainer, _I want_ thêm SVG vào provenance `polyms/` rồi codegen ra component, _so that_ icon domain Polyms hoặc thay thế có kiểm soát không phụ thuộc chỉnh file Solar.  
_Why P0:_ Full BoldDuotone Solar cover hầu hết UI chrome; `polyms/` là đường thêm brand/domain hoặc thay thế có chủ đích — không phải lý do thu hẹp catalog Solar.

```
Given nhu cầu icon không có trong bộ BoldDuotone Solar (hoặc cần bản Polyms riêng)
When tôi thêm SVG hợp lệ vào provenance `polyms/` và chạy codegen
Then component React tương ứng xuất hiện trên entry bold-duotone
And nếu trùng tên với glyph `solar/`, quy tắc ưu tiên đã document được áp dụng (xem Decisions — mặc định: **polyms thắng solar** khi trùng tên export)
```

### P1

**US-06 — Cập nhật design agent notes (Figma headers)**  
_As an_ agent `/design`, _I want_ design notes và helper Figma trỏ bộ Polyms BoldDuotone (thay `@solar-icons/react-perf`), _so that_ docs board headers không drift lại Solar package.  
_Priority P1:_ Visual sync quan trọng nhưng monorepo code + skill đã sạch ở P0 vẫn ship được; Figma script/notes theo sát ngay sau.

**US-07 — Catalog / tìm icon trong docs**  
_As an_ engineer product, _I want_ trang docs có search/filter trên full BoldDuotone (+ provenance), _so that_ tìm trong ~1200 glyph không phải đọc source.  
_Priority P1:_ DX; full set làm browse-không-search gần như vô dụng.

**US-08 — Quy trình thêm icon (maintainer doc)**  
_As a_ maintainer, _I want_ checklist ngắn: đặt SVG đúng folder → codegen → kiểm tra tree-shake/attribution, _so that_ PR icon nhất quán.  
_Priority P1:_ Giảm regression license/provenance.

### P2

**US-09 — Đồng bộ glyph lên Figma library (thủ công hoặc semi-auto)**  
_As a_ designer/maintainer, _I want_ quy trình đẩy subset BoldDuotone lên Figma (không bắt buộc plugin đầy đủ), _so that_ board và code cùng tên glyph.  
_Priority P2:_ Tiện vận hành design; không chặn package npm.

**US-10 — Entry style bổ sung (Linear / Outline / …)**  
Out of MVP — xem Future; story giữ chỗ ưu tiên thấp nếu stakeholder đòi multi-style sau v1.

## 6. Proposed Solution

### Overview

Tạo **Nx project riêng** `icons/` cạnh `ui-kit/ và `docs/`. Nguồn sự thật là SVG trong repo, phân thư mục provenance:

- **Clone nguyên bộ BoldDuotone** từ Solar Icons (480 Design, CC BY 4.0) → `icons/svg/solar/`
- Glyph custom Polyms → `icons/svg/polyms/`

Pipeline **codegen** biến SVG → React components. Package publish **`@polyms/icons`**, consumer v1 chỉ dùng subpath **`@polyms/icons/bold-duotone`** với export tên ngắn (`Home`, không `HomeBoldDuotone`). Package npm **tách** khỏi barrel `@polyms/ui-kit` nhưng **release cùng pipeline và cùng số version** với `@polyms/ui-kit`. Sau đó migrate demos, skill, Figma notes, builtin core; gỡ `@hugeicons/*` và `@solar-icons/*`.

### User flows

```
1. Maintainer lấy toàn bộ SVG BoldDuotone từ upstream Solar → `icons/svg/solar/` (+ attribution LICENSE).
2. (Tuỳ nhu cầu) Thêm SVG Polyms vào `icons/svg/polyms/`.
3. Chạy codegen → React components trên entry bold-duotone; export tên ngắn khớp tên glyph.
4. Engineer / agent: `import { Home } from '@polyms/icons/bold-duotone'`.
5. Migrate demos + skill + builtins; map Hugeicons → tên Solar BoldDuotone tương đương (hoặc glyph polyms/).
6. `nx release` (hoặc pipeline hiện có) bump **cùng version** cho `ui-kit` và `icons`.
```

### Key screens / touchpoints

- Không có màn hình product mới bắt buộc cho MVP.
- Touchpoint DX: import trong docs demos; hard rule skill; (P1) mục catalog trên docs site (full set lớn — ưu tiên search/filter); (P1) design notes Figma headers dùng cùng họ.

## 7. Functional Requirements

| ID     | Requirement                                                                                                                                               | Priority | Notes                           |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------- |
| FR-01  | Hệ thống cung cấp package `@polyms/icons` với entry chính thức v1 `@polyms/icons/bold-duotone`                                                            | P0       | Chỉ BoldDuotone                 |
| FR-02  | Mỗi icon export tree-shake được (import một icon không kéo cả set)                                                                                        | P0       | NFR Performance                 |
| FR-03  | Icon component hỗ trợ size và color / currentColor theo API đã document                                                                                   | P0       | Khớp theme text                 |
| FR-04  | SVG nguồn phân provenance `solar/` và `polyms/`                                                                                                           | P0       | Không lẫn license               |
| FR-05  | LICENSE (và NOTICE nếu cần) chứa attribution CC BY 4.0 cho glyph Solar / 480 Design                                                                       | P0       | Compliance                      |
| FR-06  | Glyph custom thêm được qua `polyms/` + codegen                                                                                                            | P0       | Gap-fill                        |
| FR-07  | Migrate docs demos / layouts đang dùng Hugeicons hoặc Solar sang `@polyms/icons/bold-duotone`                                                             | P0       | Trong monorepo                  |
| FR-08  | Cập nhật skill: hard rule import `@polyms/icons/bold-duotone`; bỏ Hugeicons; **standalone a11y** = tên trên control cha (pre-flight/quality enforce) — D6 | P0       | SKILL + quality/brandkit/button |
| FR-09  | Builtin Select tick và Offcanvas close không còn CDN Hugeicons; dùng glyph Polyms                                                                         | P0       |                                 |
| FR-10  | Gỡ dependency `@hugeicons/*` và `@solar-icons/*` khỏi workspace sau migrate                                                                               | P0       | Binary metric                   |
| FR-11  | Không re-export icons qua barrel `@polyms/ui-kit`                                                                                                         | P0       | Package tách; version lockstep  |
| FR-12  | v1 chứa **toàn bộ** glyph BoldDuotone Solar trong `svg/solar/` (không thu hẹp curated)                                                                    | P0       | Không clone style khác          |
| FR-12b | Publish `@polyms/icons` cùng pipeline release và **cùng số version** với `@polyms/ui-kit`                                                                 | P0       | Decisions §16                   |
| FR-13  | Cập nhật design agent notes / Figma header helpers sang bộ Polyms                                                                                         | P1       | Sau hoặc song song migrate code |
| FR-14  | Docs liệt kê catalog glyph v1 (tên + provenance)                                                                                                          | P1       |                                 |
| FR-15  | Maintainer checklist thêm icon                                                                                                                            | P1       |                                 |
| FR-16  | Quy trình sync Figma library (thủ công/semi-auto)                                                                                                         | P2       | Future-friendly                 |

## 8. Non-Functional Requirements

| Category        | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Performance     | Import một named icon không kéo toàn bộ set vào bundle consumer (tree-shake / per-icon module).                                                                                                                                                                                                                                                                                                                                                             |
| Accessibility   | **Hướng A + skill xử lý standalone:** mọi icon mặc định decorative — `aria-hidden={true}` và `focusable="false"`. Không API `alt`/`title` trên icon component. Trường hợp **standalone** (icon-only, không có text cạnh): skill `ui-kit` bắt buộc gắn accessible name trên **control cha** (`Button`/`aria-label`/`title`, …) — đây là cơ chế a11y cho standalone, không phải prop trên SVG. Escape hatch: spread SVG props (không document như API chính). |
| Compatibility   | React cùng peer major với `@polyms/ui-kit` (React 19 trong monorepo hiện tại); ESM entry ổn định cho Vite.                                                                                                                                                                                                                                                                                                                                                  |
| License         | Glyph `solar/`: CC BY 4.0 — attribution bắt buộc khi phân phối. Glyph `polyms/`: license Polyms (ghi rõ trong package). Không ship path/runtime phụ thuộc Hugeicons CDN.                                                                                                                                                                                                                                                                                    |
| Maintainability | Codegen tái lập được từ SVG trong repo; không edit tay file generated như nguồn sự thật.                                                                                                                                                                                                                                                                                                                                                                    |

## 9. Edge Cases & Error Handling

| Scenario                                                            | Expected behavior                                                                                                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thiếu icon trong curated set khi migrate demo                       | Thêm từ Solar (vào `solar/`) hoặc vẽ Polyms (`polyms/`) trước khi merge migrate; không tạm import lại Hugeicons/Solar package.                                |
| SVG Solar đưa nhầm vào `polyms/`                                    | Review/CI hoặc checklist maintainer từ chối; provenance phải khớp nguồn.                                                                                      |
| SVG hỏng / không parse được codegen                                 | Codegen fail rõ ràng (exit ≠ 0); không publish partial im lặng.                                                                                               |
| Consumer import path cũ `@hugeicons/*` sau migrate (trong monorepo) | Coi là lỗi migrate — P0 gate = zero match.                                                                                                                    |
| Icon chỉ decorative trong button có visible label                   | `aria-hidden` mặc định; không thêm tên trên SVG.                                                                                                              |
| Standalone / icon-only control                                      | **Skill phối hợp:** generate/migrate phải có accessible name trên control cha; icon giữ decorative. Thiếu label trên control = fail quality/pre-flight skill. |
| Agent generate UI có icon                                           | Skill: không gắn tên lên icon; standalone → tên trên control.                                                                                                 |
| Duotone hai tầng màu                                                | Tầng follow `currentColor` / prop theo contract API; không hardcode brand hex lệch theme trừ khi design token cố ý (document nếu có ngoại lệ).                |

## 10. Dependencies

| Dependency                              | Owner             | Status                            | Impact if delayed            |
| --------------------------------------- | ----------------- | --------------------------------- | ---------------------------- |
| Subset SVG Solar (CC BY 4.0) cần curate | Maintainer icons  | Ready to source từ upstream Solar | Chặn codegen + migrate demos |
| Pipeline codegen SVG → React            | Maintainer icons  | Chưa có trong repo                | Chặn FR-01–FR-03             |
| Quyết định naming / release / catalog   | Stakeholders      | **Đã chốt** (xem §16 Decisions)   | —                            |
| Peer React / bundler monorepo           | ui-kit workspace  | Ready                             | Thấp                         |
| Figma docs headers scripts              | Design/maintainer | P1                                | Không chặn npm package MVP   |

## 11. Scope

### In scope (v1 / MVP)

- Nx project `icons/`, package `@polyms/icons`, entry `@polyms/icons/bold-duotone` only.
- **Clone nguyên bộ BoldDuotone Solar** → `icons/svg/solar/`; cộng `icons/svg/polyms/` cho custom.
- Codegen React; tree-shake per icon; size/color API; export tên ngắn (`Home`).
- LICENSE attribution CC BY cho Solar.
- Migrate demos, skill, builtin core glyphs; gỡ `@hugeicons/*` và `@solar-icons/*`.
- Package npm tách barrel ui-kit — **cùng version + cùng release** với `@polyms/ui-kit`.

### Out of scope

- Rename ui-kit — xem PRD rename (làm trước initiative này).
- Style khác BoldDuotone (Linear, Outline, Broken, Bold, …) trong v1 — không clone 5 style còn lại.
- Suffix style trên tên export (`HomeBoldDuotone`).
- Version/publish `@polyms/icons` lệch `ui-kit`.
- Re-export icons từ `@polyms/ui-kit`.
- Plugin Figma đầy đủ / sync tự động mọi glyph (P2 / Future).
- Thay thế icon ngoài monorepo này (consumer app riêng) trong cùng release — họ tự migrate khi sẵn sàng; PRD chỉ bắt buộc monorepo `ui-kit`.

### Future considerations

- Thêm style entry (`@polyms/icons/linear`, …) khi product cần (clone thêm style tương ứng).
- Catalog docs interactive / search (full BoldDuotone ~1200 glyph — search là DX thật).
- Figma library sync chặt tên component code ↔ component Figma.
- Bộ icon semantic / alias theo domain product trên nền full set.

## 12. Risks & Mitigations

| Risk                                                                             | Likelihood | Impact | Mitigation                                                                                      |
| -------------------------------------------------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------------------------------- |
| Thiếu / sai attribution CC BY khi phân phối                                      | M          | H      | LICENSE + NOTICE review trong Definition of Done; checklist PR glyph Solar                      |
| Repo / publish artifact phình vì full BoldDuotone (~1k+ SVG + generated modules) | H          | M      | Tree-shake bắt buộc; không commit style khác; CI kiểm tra size publish; document nguồn upstream |
| Codegen maintenance (SVG edge cases, duotone layers)                             | M          | M      | SVG lint tối thiểu; test snapshot vài icon đại diện; document ràng buộc SVG                     |
| Trùng tên `polyms/` vs `solar/`                                                  | L          | M      | Quy tắc ưu tiên: polyms thắng; CI fail hoặc warn khi trùng chưa document                        |
| Map Hugeicons → Solar sai nghĩa khi migrate demo                                 | M          | M      | Inventory Appendix C + review visual từng surface docs                                          |
| Drift Figma nếu P1 trì hoãn lâu                                                  | M          | M      | P0 skill trỏ Polyms; P1 design notes theo sát trong cùng initiative epic                        |
| License Hugeicons khi thay path CDN                                              | L          | M      | Không vendor Hugeicons vào `svg/`; map Solar hoặc vẽ `polyms/`                                  |

## 14. Appendix

### A. Đường dẫn kỹ thuật (đề xuất)

| Item                    | Giá trị                                              |
| ----------------------- | ---------------------------------------------------- |
| Nx project / folder     | `icons/`                                             |
| Package name            | `@polyms/icons`                                      |
| Entry v1                | `@polyms/icons/bold-duotone`                         |
| SVG Solar               | `icons/svg/solar/` (BoldDuotone files)               |
| SVG Polyms              | `icons/svg/polyms/`                                  |
| Generated React (gợi ý) | `icons/src/bold-duotone/` (generated; không sửa tay) |
| Package LICENSE         | kèm attribution Solar / 480 Design                   |

Cấu trúc gợi ý:

```text
icons/
  package.json          # name: @polyms/icons
  svg/
    solar/              # CC BY 4.0 — 480 Design via Solar
    polyms/             # Polyms-owned
  src/
    bold-duotone/       # codegen output
  scripts/              # codegen
  LICENSE
  README.md
```

### B. Liên kết tham chiếu

- Kit family (context, **không** thuộc scope PRD): https://ai-kit.polyms.dev/
- Solar upstream: https://github.com/saoudi-h/solar-icons — glyphs **CC BY 4.0** by 480 Design

### C. Inventory migrate (map Hugeicons → Solar; không phải freeze curated list)

v1 đã có **full BoldDuotone** trong `solar/` — inventory dưới đây chỉ phục vụ **migrate demos/layouts/builtins**, không giới hạn catalog package.

**Solar BoldDuotone đã dùng trong docs / design notes (ví dụ — đã cover sẵn sau clone):**  
`Moon`, `Sun`, `ChartSquare`, `Code2`, `Layers`, `MagicStick3`, `Accessibility`, `Palette`, `Rocket`, `SpeedometerMax`; Figma headers: `CursorSquare`, `Tag`, `Widget5`, `UserCircle`, `UsersGroupTwoRounded`, `TextFieldFocus`, `ListArrowDown`, `Power`, `ClipboardList`, `CheckSquare`, `RecordCircle`, `DangerCircle`, `SidebarMinimalistic`, `ChatSquare`, `RefreshCircle`, `Bell`, `QuestionCircle`, `LinkRound`, `WindowFrame`, `Bolt`, `SpecialEffects`, `Layers`, …

**Hugeicons đang dùng trong demos/layouts (cần map tên → BoldDuotone Solar hoặc `polyms/`):**  
nav/chrome (`Menu02`, `MoveTop`, `SearchList`, `ArrowRight`, …), field/toolbar/toggle text-align set, navigation-menu demo set, DemoHeader finance set, item status set, v.v.

**Builtin core (bắt buộc thay):**  
Select tick (`tick-01` CDN), Offcanvas close (`cancel-circle-half-dot` CDN) → glyph BoldDuotone tương đương trong bộ Solar (ví dụ check / close circle) hoặc `polyms/` nếu cần đúng pixel.

### D. Assumptions

- Style = subpath → tên export ngắn; consumer không cần prop `weight`/`variant` ở v1.
- Full BoldDuotone clone vẫn tree-shake được nhờ per-icon modules.
- Không vendor SVG từ Hugeicons vào `svg/` — map Solar hoặc vẽ `polyms/`.
- Monorepo là consumer bắt buộc đầu tiên; app ngoài tự migrate sau.
- `@polyms/icons` và `@polyms/ui-kit` luôn cùng version number khi publish (peer/docs có thể ghi “install cùng version”).

### E. Ghi chú kỹ thuật bổ sung (cho implement)

| Chủ đề          | Chi tiết                                                                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nguồn clone     | Upstream [saoudi-h/solar-icons](https://github.com/saoudi-h/solar-icons) — lấy **chỉ** asset/style BoldDuotone (SVG hoặc từ `@solar-icons/core` / package nguồn), không vendor nguyên `react-perf` dist. |
| Quy mô          | ~1 200+ glyph × 1 style; expect repo `icons/svg/solar/` + generated `src/bold-duotone/` lớn — CI/artifact cần theo dõi; runtime consumer chỉ trả phí icon đã import.                                     |
| Duotone + theme | Hai tầng path: tầng chính follow `currentColor` / prop `color`; tầng phụ opacity hoặc `color-mix` theo contract API (document trong README icons).                                                       |
| Trùng tên       | `polyms/` **thắng** `solar/` khi cùng export name — cho phép brand override không sửa file Solar.                                                                                                        |
| Release         | Thêm project `icons` vào cùng `nx release` group với `ui-kit`; tag/version đồng số (ví dụ cả hai `0.x.y`).                                                                                               |
| Skill           | Hard rule import: `@polyms/icons/bold-duotone`. **Standalone a11y:** skill gắn tên trên control (D6) — không prop a11y trên icon. Cấm Hugeicons/Solar package.                                           |
| Attribution     | LICENSE package + README: credit 480 Design (CC BY 4.0) + link Figma community Solar.                                                                                                                    |

### F. Deleted sections

- **§13 Timeline & Milestones** — không có deadline bên ngoài; initiative theo capacity maintainer.
- Không có Competitive analysis / revenue — thư viện nội bộ kit.
- Không có Feature flag plan — ship theo package version.

## 15. Open Questions

_Không còn — a11y đã chốt D6._

## 16. Decisions (đã chốt 2026-07-24)

| #   | Quyết định                        | Chi tiết                                                                                                                                                                                                                 |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1  | Tên export ngắn                   | `Home`, không `HomeBoldDuotone` — style đã nằm trong path `/bold-duotone`.                                                                                                                                               |
| D2  | Release lockstep                  | `@polyms/icons` publish cùng pipeline với `@polyms/ui-kit`, **cùng số version**.                                                                                                                                         |
| D3  | Catalog v1                        | Clone **nguyên bộ BoldDuotone** Solar vào `svg/solar/`; không curated thu hẹp; không clone style khác.                                                                                                                   |
| D4  | Provenance                        | `svg/solar/` vs `svg/polyms/`; trùng tên → **polyms thắng**.                                                                                                                                                             |
| D5  | Scope rename ui-kit               | Ngoài PRD này.                                                                                                                                                                                                           |
| D6  | A11y = A + skill xử lý standalone | Icon luôn decorative (`aria-hidden` + `focusable="false"`). Không `alt`/`title` API trên icon. **Standalone** (icon-only): skill `ui-kit` phối hợp — bắt buộc accessible name trên control cha; thiếu = fail pre-flight. |

## Next Step

→ `/to-prd` — publish lean PRD lên tracker (Draft/In Review đã chốt Decisions D1–D6).  
→ `/design` (tuỳ chọn) — mapping tên Hugeicons demos → Solar BoldDuotone + Figma headers.  
→ `/dev` — sau khi tracker issue có, scaffold Nx `icons/` + clone BoldDuotone + codegen.
