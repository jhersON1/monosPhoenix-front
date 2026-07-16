# AGENTS.md — monosPhoenix-front / phoenix-view-front

## Stack

- **Angular 20.3** (standalone components, no NgModules)
- **TypeScript 5.9** with strict mode (`strict: true`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`)
- **Angular templates**: `strictTemplates`, `strictInputAccessModifiers`, `typeCheckHostBindings` all on
- **Plain CSS** (`.css` files, no Sass/Tailwind)
- **pnpm** (package manager; lockfile `pnpm-lock.yaml`)
- **Build**: `@angular/build:application` (Vite + esbuild, not webpack)

## Commands

| Action | Command |
|--------|---------|
| Dev server | `ng serve` or `npm start` (port 4200, HMR) |
| Production build | `ng build` (output `dist/`, hashing enabled) |
| Test (watch) | `ng test` (Karma + Jasmine, opens Chrome) |
| Single test run | `ng test --watch=false --browsers=ChromeHeadless` |

No ESLint, no Prettier CLI, no typecheck, no e2e scripts are installed. Type checking happens during `ng build` / `ng test`.

## Architecture

- **Entrypoint**: `src/main.ts` — `bootstrapApplication(App, appConfig)`
- **Root component**: `src/app/app.ts` (selector `app-root`)
- **Routes**: `src/app/app.routes.ts` — currently empty array
- **App config**: `src/app/app.config.ts` — `provideRouter(routes)`, zone change detection with event coalescing
- **No services, no HTTP client, no state management** installed yet
- **No `src/environments/`** — use `ng build --configuration production` and `isDevMode()` if needed
- **No `karma.conf.js`** — Karma config is internal to `@angular/build:karma` builder
- Component files are co-located: `*.ts` (class), `*.html` (template), `*.css` (styles), `*.spec.ts` (test)

## Conventions

- Standalone components with selector prefix `app-`
- Tests co-located next to source (e.g., `app.spec.ts`)
- Prettier config in `package.json`: printWidth 100, singleQuote, `angular` parser for HTML — install `prettier` if you need CLI formatting
- Use `ng generate component` (or `npx ng g c`) to scaffold new components
- Global styles in `src/styles.css`; static assets in `public/`
