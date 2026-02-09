# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 16 app using the `src/` directory layout.
- `src/app/` contains the App Router pages, layouts, and route folders (e.g., `src/app/apartamentos/`).
- `src/components/` holds shared UI components.
- `src/lib/` contains data access and domain helpers.
- `src/data/` stores local datasets used by the catalog.
- `public/` is for static assets served at the site root.
- `logolivic/` and `modelos/` appear to contain brand assets and 3D/model resources; keep large binaries here rather than `src/`.

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).
- `pnpm dev` runs the local Next.js dev server.
- `pnpm build` creates a production build.
- `pnpm start` serves the production build.
- `pnpm lint` runs ESLint with `eslint-config-next`.

## Coding Style & Naming Conventions
- TypeScript + React, 2-space indentation, semicolons.
- Prefer named components in `PascalCase` and hooks in `useCamelCase`.
- Use path aliases via `@/` (configured in `tsconfig.json`).
- Styling uses Tailwind CSS; keep global styles in `src/app/globals.css`.
- Run `pnpm lint` before opening a PR.

## Testing Guidelines
There is no test framework configured yet and no `test` script in `package.json`.
- If you add tests, document the framework and add a `pnpm test` script.
- Keep test files alongside features or in a `tests/` folder with `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
The Git history is empty (no commits yet), so there is no established commit message convention.
- Recommended: use Conventional Commits (`feat:`, `fix:`, `chore:`) for consistency.
- PRs should include a short description, screenshots for UI changes, and any relevant context or data changes.

## Configuration Tips
- Node/Next config lives in `next.config.ts`.
- TypeScript settings live in `tsconfig.json`; avoid loosening `strict` unless required.
