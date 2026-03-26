# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project
`@gfazioli/mantine-mask` — A Mantine extension component that applies a cursor-follow or static spotlight using CSS masks (radial or linear gradients), revealing content inside the spotlight and softly fading the outside. Supports animation (lerp/instant), activation modes (always/hover/focus/pointer), inversion, elliptical radii, boundary clamping, and document-level pointer tracking.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + prettier + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run ESLint + Stylelint |
| `yarn prettier:write` | Format all files with Prettier |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API (props, types, exports), always run `yarn clean && yarn build` before `yarn test`, because `yarn docgen` needs the fresh build output.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
```
Mask.tsx                  # Component implementation (factory pattern)
MaskMediaVariables.tsx    # Responsive CSS via InlineStyles + media queries
Mask.module.css           # CSS Modules with mask-image gradients
Mask.story.tsx            # Storybook stories
Mask.test.tsx             # Jest unit tests
index.ts                  # Public exports
lib/
  index.ts            # Re-exports all utilities
  math.ts             # clampValue(value, min, max)
  angles.ts           # parseAngleDegrees(angle, fallback)
  feather.ts          # normalizeFeather(feather) — maps 0-100 to gradient stops
  geometry.ts         # getLinearCenterPercent() — projects point onto gradient axis
```

Single-component package — `Mask` is the only exported component, built with Mantine's `factory<MaskFactory>` pattern (`useProps`, `useStyles`, `createVarsResolver`).

### Build Pipeline
Rollup bundles to dual ESM (`dist/esm/`) and CJS (`dist/cjs/`) with `'use client'` banner. CSS modules are hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS is split into `styles.css` and `styles.layer.css` (layered version).

## Component Details

### Factory pattern
`Mask` uses Mantine's `factory<MaskFactory>` which requires a `Factory` type declaring `props`, `ref`, `stylesNames`, `variant`, and `vars`, plus `createVarsResolver` to map props to CSS custom properties, `useProps` for default prop merging, and `useStyles` for the `getStyles` accessor.

### Variants
Two mask variants controlled by the `variant` prop:
- **`radial`** (default): Elliptical gradient via `mask-image: radial-gradient(...)`. Supports `maskRadiusX`/`maskRadiusY` for elliptical shapes.
- **`linear`**: Linear gradient via `mask-image: linear-gradient(...)`. Angle controlled by `maskAngle`. Center position calculated by `getLinearCenterPercent()` which projects the spotlight point onto the gradient axis.

### Cursor tracking
When `withCursorMask` is true, the component tracks pointer movement and updates `--mask-x`/`--mask-y` CSS variables in pixel units. When false, `maskX`/`maskY` are percentages for static positioning. `trackPointerOnDocument` enables document-level mousemove tracking (ignores `clampToBounds`).

### Animation system
Two modes via `animation` prop:
- **`lerp`** (default): Smooth follow using `requestAnimationFrame` loop with configurable `easing` factor (0-1). Uses separate `smoothPosition` state that interpolates toward `cursorPosition`.
- **`none`**: Instant position update, no animation frame loop.

Both cursor-follow and static modes have independent animation paths — cursor uses pixel-based `smoothPosition`, static uses percentage-based `staticSmoothPosition`.

### Activation modes
The `activation` prop controls when the mask effect is visible:
- `always`: Always active (default)
- `hover`/`pointer`: Active on pointer enter, inactive on pointer leave
- `focus`: Active on focus, inactive on blur (auto-sets `tabIndex={0}`)

Supports controlled mode via `active` prop + `onActiveChange` callback. When inactive with `activation !== 'always'`, a Box wrapper is kept for event handling but the mask div is not rendered.

### Utility library (`lib/`)
- `clampValue`: Math.min/max with midpoint fallback when max < min
- `parseAngleDegrees`: Parses angle from number or string, returns degrees as number
- `normalizeFeather`: Converts feather value (0-1 or 0-100) to percentage, clamped 0-100
- `getLinearCenterPercent`: Projects a 2D point onto the gradient direction vector to compute the CSS linear-gradient center stop position

### Responsive CSS (maskRadius props)
The `maskRadius`, `maskRadiusX`, `maskRadiusY` props support responsive breakpoint objects via CSS-native approach (`StyleProp<number | string>`). `MaskMediaVariables` component uses `InlineStyles` + CSS media queries to set `--mask-radial-radius`, `--mask-radial-radius-x`, `--mask-radial-radius-y`, `--mask-linear-radius` per breakpoint — no JavaScript re-renders. Pattern follows Mantine core's `SimpleGridMediaVariables`. Uses `useRandomClassName` for scoped selectors. For JS-side computations (clamping), `getBaseValue()` extracts the non-responsive value.

### CSS custom properties
The `varsResolver` maps props to CSS variables:
- **root**: `--mask-radius` (border radius)
- **mask**: `--mask-transparency-start`, `--mask-transparency-end`, `--mask-opacity`

Inline style variables set on the mask element:
- `--mask-x`, `--mask-y` (position)
- `--mask-radial-radius`, `--mask-radial-radius-x`, `--mask-radial-radius-y` (radial size)
- `--mask-linear-radius`, `--mask-angle`, `--mask-linear-center` (linear variant)

### Styles API selectors
`root` (outer Box with overflow hidden), `mask` (inner div with CSS mask-image). The mask div uses `data-variant` and `data-invert` attributes for CSS variant selection.

### CSS mask-image approach
Four CSS rule combinations in `Mask.module.css`:
1. `.mask` — default radial gradient (white center → transparent edge)
2. `.mask[data-variant='linear']` — linear gradient with symmetric fade around center
3. `.mask[data-invert='true']` — inverted radial (transparent center → white edge)
4. `.mask[data-variant='linear'][data-invert='true']` — inverted linear

All rules include both standard `mask-image` and `-webkit-mask-image` for browser compatibility.

## Testing
Jest with `jsdom` environment, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Component tests use `@mantine-tests/core` render helper. Test file: `package/src/Mask.test.tsx`.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace CLAUDE.md at `/Users/giovambattistafazioli/Lavoro/GitHub/Mantine Extensions/CLAUDE.md` for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
