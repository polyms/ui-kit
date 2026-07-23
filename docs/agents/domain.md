# Domain Docs

How `/align`, `/pm`, and `/dev` consume domain documentation.

## Before exploring, read

- **`CONTEXT.md`** at repo root (create via `domain-modeling` when missing)
- **`docs/adr/`** — ADRs touching the work area

If files don't exist, proceed silently. `domain-modeling` creates them lazily when terms resolve.

## File structure

**Single-context** (this repo):

```
/
├── CONTEXT.md
├── docs/          ← ai-kit: agents/, adr/, prd/
│   ├── agents/
│   ├── adr/
│   └── prd/
├── ui-kit/        ← @polyms/ui-kit library
└── web/           ← public website (MDX + demos)
```

## Rules

- Use glossary vocabulary in issues, test names, and specs
- If output contradicts an ADR, surface it: _Contradicts ADR-0007 — worth reopening because…_
- `CONTEXT.md` is glossary only — no implementation details
