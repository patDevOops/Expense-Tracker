# Repository Guidelines
## important
also check the HANDOF.md files to get info what happen in earlier and older session

use mcp tools for browser visualization  like playwright,use it for verifying after web is changed or modified 

## Project Structure & Module Organization

This repository is a React 19 and TypeScript expense tracker built with Vite. Application code lives in `src/`: top-level app and navigation components are alongside feature folders such as `contents/`, `contents/items/`, `contents/wallet/`, `modal/`, `hooks/records/`, and `utils/`. Keep feature styles near their components in `.css` files. Static public files belong in `public/`; imported images and other bundled assets belong in `src/assets/`. There is currently no dedicated test directory.

## Build, Test, and Development Commands

Run commands from the repository root after installing dependencies with `npm install`.

- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` runs TypeScript project checks and creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle locally for review.
- `npm run lint` runs ESLint across the repository.

There is no test script configured in `package.json`; validate changes with the build and lint commands, and manually check affected flows in the browser.

## Coding Style & Naming Conventions

-be sure the owner of this code is understandable
and closely match his coding style, or if he`s style is bad practice then tell it to her

Use TypeScript for React components and hooks. Follow the existing two-space indentation and keep JSX readable. Name components and component files in PascalCase (for example, `WalletModal.tsx`); use camelCase for functions, variables, and hooks (`useRecords`). Keep styles in corresponding CSS files and use the established feature folders rather than adding unrelated files at the root. Run `npm run lint` before submitting changes.

## Testing Guidelines

No automated testing framework or coverage threshold is configured. For behavior changes, build with `npm run build`, lint with `npm run lint`, and manually exercise the affected expense, wallet, or category interactions. If adding tests, first introduce a test runner and document its command and conventions in `package.json` and this guide.

## Commit & Pull Request Guidelines

Recent commits use short, lowercase imperative summaries (for example, `improve initial value` and `add missing type in components`); follow that concise style and describe one change per commit. Pull requests should explain the user-visible change, list validation performed, link any related issue, and include screenshots for visual changes. Call out relevant behavior or migration details when they affect existing records.

## Configuration Notes

Keep dependency versions in `package.json` and `package-lock.json` in sync by using npm. Do not commit `node_modules/` or generated `dist/` output. Avoid placing secrets in source files or client-side environment configuration.


## Others 

The eruda console floating is normal. Its a user tools for devtools inspecting element, because no devtools in android chrome browser

## Playwright & Browser Debugging Rules
- **No Blind Clicking**: If a Playwright `click` fails (timeout, strict mode violation, or element intercepted), DO NOT retry the same click blindly.
- **Trace DOM First**: Before trying to click again, use `browser_evaluate` or `browser_run_code_unsafe` to extract the `outerHTML` and `getBoundingClientRect()` of the target element and its parent container. 
- **Check for Overlays**: Look for elements with high `z-index` (e.g., dev tools, modals) that might be intercepting the click.
- **React Event Fallback**: If a standard Playwright click fails on a React component, use JavaScript event dispatching (`document.querySelector(...).dispatchEvent(new MouseEvent('click', {bubbles: true}))`) to bypass visibility checks.
- **Visualize Layout before Fixing**: When fixing CSS alignment issues, DO NOT guess. First, extract the exact bounding boxes of the label, icon, and container via Playwright. Base your CSS fix on the actual rendered dimensions.