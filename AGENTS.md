# Repository Guidelines

## Project Structure & Module Organization
`src/` contains reusable components. Each component lives in its own folder with an `index.tsx` entry point (for example, `src/CustomButton/index.tsx`) and local tests alongside the component (`index.test.tsx`). `__tests__/` holds app-level tests (for example, `__tests__/App-test.tsx`). Native platform projects live in `ios/` and `android/`. The root `App.tsx` is the app entry component and `index.js` registers it.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run start` starts the Metro bundler for local development.
- `npm run start -- --reset-cache` clears Metro’s cache if bundling gets stuck.
- `npm run ios` builds and runs the iOS app in the simulator.
- `npm run android` builds and runs the Android app on an emulator or device.
- `npm run test` runs Jest in React Native preset mode.
- `npm run lint` runs ESLint over the project.
- `cd ios && pod install` installs iOS CocoaPods dependencies when native pods change.

## Coding Style & Naming Conventions
This repository uses TypeScript for component code (`.tsx`). Follow Prettier rules from `.prettierrc.js` (single quotes, no bracket spacing, trailing commas, arrow parens avoided). ESLint is configured via `@react-native-community/eslint-config`; keep code compliant by running `npm run lint`. Component folders are PascalCase (for example, `CustomModal`), and component files use `index.tsx` to keep imports consistent.

## Component Patterns & Public API
Components default-export a single React component from `index.tsx`. Public types that consumers need are named exports (for example, `RefModalObject`). Props are typed with interfaces or type aliases and documented with JSDoc when useful. Provide sensible defaults in props (for example, `closeOutside = true`) and expose stable `testID` values for UI tests (for example, `customModal`, `outsidePressable`, `loader`). Keep component logic in the component file and colocate tests beside it.

## Testing Guidelines
Tests use Jest with the React Native preset and `@testing-library/react-native`. Component tests live next to the component and follow `index.test.tsx`. App tests live in `__tests__/` and use `*-test.tsx` naming. Run `npm run test` before opening a pull request.

## Commit & Pull Request Guidelines
Commit messages in this repo use short, imperative sentences starting with a verb and capitalized (for example, “Add CustomModal component”, “Improve consistency and type safety”). Keep commit messages focused on a single logical change. For pull requests, include a concise summary, mention relevant issues if any, and add screenshots or screen recordings when UI behavior changes.

## Configuration Notes
React Native configuration lives in `app.json`, `metro.config.js`, and native folders. Prefer changes in `src/` unless a platform-specific fix is required.
