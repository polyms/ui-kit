# ADR-0001: Toc giữ hover `--surface`, không dùng `.item-*`

- **Status:** Accepted
- **Date:** 2026-07-23

## Context

`AGENTS.md` yêu cầu các control kiểu ghost (transparent idle + tinted hover) thống nhất với utilities `.item-*` / `color-mix(in oklab, …)`.

`Toc` là navigation list cạnh nội dung dài (docs / in-page outline), không phải actionable row trong menu/toolbar. Hover hiện dùng `color: var(--fg)` + `background-color: var(--surface)` — nền surface rõ, tách khỏi tint primary của `.is-primary` / `.is-visible`.

## Decision

- **Không** áp `.item-*` hay `color-mix` tint cho hover của `.toc-item`.
- Giữ hover `--surface` / `--fg` như docs TOC đã ship.
- Active/visible vẫn dùng primary + `color-mix` (không đổi).

## Consequences

- Toc là ngoại lệ có chủ đích so với rule ghost trong `AGENTS.md`; review sau không yêu cầu đổi sang `.item-*` trừ khi ADR này được reopen.
- Consumer custom `className` vẫn có thể override hover nếu app muốn khớp item chrome.
