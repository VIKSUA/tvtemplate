# Agent Instructions

## Goals
- Keep the TV-first UX (spatial navigation and large focusable targets).
- Preserve SSR safety: always import spatial navigation through `src/navigation/spatial.ts`.
- Avoid backend/auth work; keep demo data and fake auth.

## Architecture
- Screen routing is handled by `src/navigation/NavigationContext.tsx`.
- Keyboard state is managed in `src/components/Keyboard/KeyboardContext.tsx`.
- Back navigation uses browser history (Escape/Back).

## Editing conventions
- Use TypeScript for new files in `src/`.
- Prefer `vw/vh` scaling via `src/theme/tvTheme.ts`.
- Keep styles simple and static (no dynamic theme switching).

## Common tasks
- Add screens in `src/screens/` and wire them in `src/layout/RootLayout.tsx`.
- Add focusable UI using `withFocusable` from `src/navigation/spatial.ts`.
- Keep `AnimatedFlatList` for grid-style focus/scroll behavior.
