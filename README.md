# tvtemplate

Small TV-focused ReNative template: login with an on-screen keyboard, a channel grid, and a full-screen player. UI-only demo with no real backend or authentication.

## Features
- Spatial navigation for remote/keyboard input.
- Large focus targets and TV-first UX.
- Login flow with a slide-in on-screen keyboard.
- Channel grid with focus/scroll centering.
- Full-screen player, Enter toggles pause/play.

## Tech stack
- ReNative (`@rnv/renative`, `@rnv/engine-rn-next`, `@rnv/engine-rn-web`)
- React 18 + React Native 0.73
- Next.js 14 (RN Web via ReNative)
- TypeScript 5
- Spatial Navigation: `@noriginmedia/react-spatial-navigation` (SSR-safe wrapper in `src/navigation/spatial.ts`)
- React Native Web + Gesture Handler

## Run (web)
1) Install deps: `yarn install`
2) Start web: `rnv run -p web`

## Project structure
- `src/app/index.tsx` app entry + spatial nav init
- `src/layout/RootLayout.tsx` screen switching + back handling
- `src/navigation/NavigationContext.tsx` navigation history
- `src/navigation/spatial.ts` SSR-safe Spatial Navigation wrapper
- `src/screens/LoginScreen.tsx` login UI + keyboard trigger
- `src/screens/ChannelsScreen.tsx` channel grid via `AnimatedFlatList`
- `src/screens/PlayerScreen.tsx` full-screen player
- `src/components/Keyboard/*` on-screen keyboard
- `src/components/AnimatedFlatList/*` focusable grid
- `src/theme/tvTheme.ts` colors + `vw/vh` helpers

## Controls
- Arrows: move focus
- Enter: activate
- Escape/Back: go back (or close keyboard)
