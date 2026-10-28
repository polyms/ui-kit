# Language

The language skills write into persistent repo docs.

## Scope

**Applies to:** `CONTEXT.md`, `docs/adr/`, PRDs, `docs/design/*.md`, `docs/agents/*.md`, and other repository planning docs that outlive the conversation.

**Public docs site exception:** `web/src/pages/**/*.mdx` and their `web/src/pages/**/-views/` demos use English, matching the end-user site. Follow `.cursor/rules/docs-mdx-end-user-voice.mdc` for those files.

**Does not apply to:** chat replies — those match whichever language the user is typing in for that session. Code, identifiers, file paths, commit messages, and technical vocabulary (seam, ADR, PRD, sortOrder, …) stay in English regardless of this setting.

## Language

**Vietnamese** — prose, headings, and comments in written docs. Technical terms and code stay in English.

## Consumers

Skills that write persistent docs read this file and write in the confirmed language:

- `domain-modeling` — `CONTEXT.md`, glossary entries
- `pm`, `to-prd` — PRDs, user stories, acceptance criteria
- `design` — `docs/design/<feature>.md`
- `arch` — ADRs in `docs/adr/`
- `to-issues` — issue bodies on the tracker

## Rules

- One language per artifact — do not mix languages within a single document or demo
- For documents within this file's scope, write headings, prose, and comments in Vietnamese; keep code and identifiers in English
- The user's chat language does not change the artifact language: use Vietnamese for repository planning docs and English for the public docs site exception above
