# Project Handoff

- **Status:** React 19, TypeScript, and Vite expense tracker. UI polish is ongoing; current work focuses on mobile layout and form alignment.
- **Verification:** Playwright screenshots/checkpoints exist in the root and `.playwright-mcp/`. Wallet-toggle vertical alignment has been fixed.

## Changed files and work

- **Main layout and info:** `Contents.tsx`/`Contents.css`, `Date.css`, and `Info.tsx`/`Info.css` place the month selector with always-visible record and monthly expense info; removed info expand arrows.
- **Expense list:** `ItemsGen.tsx`, `Items.tsx`, and `Items.css` use item focus styling and adjust category dropdown layering.
- **Expense form:** `FormCard.css` received responsive layout updates; wallet toggle alignment beside quantity controls has been resolved.
- **Other UI work:** Header, sidebar, wallet, modal, and shared styles also have uncommitted edits. Review `git status` and diffs before committing; preserve unrelated changes.

## Pending work and known errors

- Review screenshots in `expense-*.png` and `.playwright-mcp/` as visual checkpoints; some may be from earlier iterations.
- `npm run build` and `npm run lint` have previously reported TypeScript and lint issues documented in earlier handoff notes; rerun to establish current status before addressing them.
- Manually verify wallet and form interactions with representative saved data.

## Architectural decisions

- Keep feature styles beside their components and use existing semantic CSS variables and dark theme.
- Prioritize Android/mobile responsive layouts, safe-area spacing, and tap-sized controls while retaining desktop support.
- Keep UI changes focused; avoid changing data behavior and types as part of CSS/layout work unless required.
- Use Playwright MCP for browser visualization. When a click fails, inspect the target DOM, bounds, and overlays before another attempt; use DOM event dispatch as the documented fallback.
