# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native component library providing enhanced, reusable core components (CustomButton, CustomModal) with TypeScript support. Built on React Native 0.78 / React 19. Publishable as an npm package.

## Commands

- `npm test` — run all tests (Jest with react-native preset)
- `npm test -- --testPathPattern=CustomButton` — run tests for a specific component
- `npm run test:coverage` — run tests with coverage (80% threshold enforced)
- `npm run build` — compile library to `lib/` via `tsc -p tsconfig.build.json`
- `npm run lint` — ESLint check
- `npm run start` — start Metro bundler
- `npm run ios` / `npm run android` — run on device/simulator

## Architecture

Components live in `src/<ComponentName>/index.tsx` with co-located tests in `index.test.tsx`. Barrel export at `src/index.ts`.

**CustomButton** — Functional component (`FC<CustomButtonProps>`) wrapping TouchableOpacity with loading/disabled states and accessibility support (`accessibilityRole="button"`, `accessibilityState`).

**CustomModal** — Uses `forwardRef` + `useImperativeHandle` to expose `open()`/`close()` via ref (`RefModalObject`). Animated slide transitions (up/down/left/right/top) using React Native's `Animated` API with `useNativeDriver: true`. Visibility is controlled internally via `useState`, not through props. Supports `onOpen`/`onClose` callbacks and `accessibilityViewIsModal`.

## Library Structure

- `src/index.ts` — barrel export for all components and types
- `tsconfig.build.json` — build config that emits JS + `.d.ts` to `lib/`
- `peerDependencies` — `react >=18.0.0`, `react-native >=0.71.0`
- `npm pack --dry-run` shows what gets published (`lib/` + `src/`, no tests)

## Conventions

- TypeScript with interfaces for props, type aliases for internal types
- JSDoc comments on component props
- `testID` attributes on interactive/animated elements for test queries
- Tests use `@testing-library/react-native` — `render`, `fireEvent`, `act`, `waitFor`
- For modal tests: create ref with `React.createRef<RefModalObject>()`, call `open()`/`close()` inside `act()`, assert visibility with `waitFor`
- Prettier: single quotes, trailing commas, no bracket spacing, arrow parens avoided
- StyleSheet.create for static styles; inline style objects for dynamic/computed styles
- Module-level constants for values that don't depend on render (e.g., animation durations, noop functions)
