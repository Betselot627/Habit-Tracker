# Implementation Plan: Habit Tracker Dashboard

## Overview

Implement the habit tracker dashboard redesign with dark theme, timeGoal support, and three new progress pages. Tasks follow the design document and build incrementally from backend model changes through UI components to new pages.

## Tasks

- [x] 1. Backend: add timeGoal to Habit model and controllers
  - [x] 1.1 Add `timeGoal: String` (optional, no default) to `server/models/Habit.js`
    - _Requirements: 2.3_
  - [x] 1.2 Destructure and persist `timeGoal` in `createHabit` controller (`server/controllers/habitController.js`)
    - _Requirements: 2.4_
  - [x] 1.3 Destructure and persist `timeGoal` in `updateHabit` controller
    - _Requirements: 2.4_
  - [ ]\* 1.4 Write property test for timeGoal round-trip persistence (Property 3)
    - **Property 3: timeGoal round-trip persistence**
    - **Validates: Requirements 2.3, 2.4**

- [-] 2. Tailwind config and global styles
  - [x] 2.1 Extend `tailwind.config.js` with `surface` and `accent` color tokens and `shake`/`fade-in`/`slide-up` animations and keyframes
    - _Requirements: 8.1_
  - [x] 2.2 Update `client/src/index.css` — set dark base styles (`background-color`, `color`) on `html` and `body`
    - _Requirements: 8.1_
  - [x] 2.3 Update `client/index.html` body background to `#111827`
    - _Requirements: 8.1_

- [x] 3. Shared UI: Button variants and category colors
  - [x] 3.1 Add `primary`, `secondary`, `danger`, `ghost`, `success` dark variant classes to `client/src/components/Button.jsx`
    - _Requirements: 8.1_
  - [x] 3.2 Update `client/src/utils/colors.js` (or equivalent) category color map for dark theme legibility
    - _Requirements: 8.1_

- [x] 4. Auth pages dark redesign
  - [x] 4.1 Redesign `client/src/pages/Login.jsx` with dark background (`bg-[#111827]`), card (`bg-[#1f2937]`), dark inputs, and blue submit button
    - _Requirements: 8.1_
  - [x] 4.2 Redesign `client/src/pages/Register.jsx` with the same dark treatment as Login
    - _Requirements: 8.1_

- [x] 5. Sidebar dark redesign and new nav links
  - [x] 5.1 Update `client/src/components/Sidebar.jsx` — apply dark sidebar background (`bg-[#0f172a]`), active item `bg-blue-600`, text `text-gray-300`, hover `hover:bg-gray-800`
    - _Requirements: 7.1, 8.1_
  - [x] 5.2 Add Daily Progress, Weekly Progress, and Yearly Progress menu items (ids: `daily`, `weekly`, `yearly`) to the sidebar `menuItems` array
    - _Requirements: 7.1_

- [x] 6. App.jsx layout and routing updates
  - [x] 6.1 Remove `RightSidebar` import and render from `client/src/App.jsx`; set root div to `bg-[#111827]`
    - _Requirements: 8.2_
  - [x] 6.2 Add `daily`, `weekly`, `yearly` cases to `renderContent()` switch in `App.jsx` rendering the three new progress page components
    - _Requirements: 7.1_

- [ ] 7. MainContent dashboard refactor
  - [ ] 7.1 Remove category filter bar and `activeFilter` state from `client/src/components/MainContent.jsx`; remove `selectedDate` prop dependency (use `new Date()` internally)
    - _Requirements: 1.1, 8.2_
  - [ ] 7.2 Add `TodayProgress` sub-component at the top of MainContent — renders `{completed} / {total} completed` text, progress bar (`Math.round((completed/total)*100)%` width, `bg-blue-500`, `transition-all duration-500`), and congratulatory message when all complete
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - [ ] 7.3 Apply dark background (`bg-[#111827]`) and `lg:ml-64` layout (no right offset) to MainContent
    - _Requirements: 8.1, 8.4_
  - [ ] 7.4 Add blue "Add Habit" button that opens `NewHabitModal`; show empty state message when no habits exist
    - _Requirements: 1.5, 6.1, 6.2_
  - [ ]\* 7.5 Write property test for progress bar math (Property 10)
    - **Property 10: Progress bar percentage is mathematically correct**
    - **Validates: Requirements 5.1, 5.2**
  - [ ]\* 7.6 Write property test for habit grouping exhaustive and disjoint (Property 4)
    - **Property 4: Habit grouping is exhaustive and disjoint**
    - **Validates: Requirements 1.3, 1.4**

- [ ] 8. HabitCard dark redesign and timeGoal badge
  - [ ] 8.1 Apply dark card styles to `client/src/components/HabitCard.jsx`: `bg-[#1f2937] border-gray-700`; completed state `border-green-500/40 bg-green-900/10`
    - _Requirements: 1.3, 8.1_
  - [ ] 8.2 Render `⏱ {habit.timeGoal}` badge below description when `habit.timeGoal` is set; omit entirely when absent
    - _Requirements: 2.1, 2.2_
  - [ ] 8.3 Update edit mode inputs to `bg-gray-700 border-gray-600 text-white`; Save button `bg-blue-600`; Cancel button `bg-gray-700 text-gray-200`
    - _Requirements: 4.1, 4.2, 8.1_
  - [ ] 8.4 Add local `error` string state — show red error text on API failure in edit mode; validate non-empty name before calling API
    - _Requirements: 4.4, 4.6_
  - [ ]\* 8.5 Write property test for HabitCard renders all habit fields (Property 1)
    - **Property 1: HabitCard renders all habit fields**
    - **Validates: Requirements 1.2, 2.1**
  - [ ]\* 8.6 Write property test for timeGoal absent when not set (Property 2)
    - **Property 2: timeGoal absent when not set**
    - **Validates: Requirements 2.2**
  - [ ]\* 8.7 Write property test for edit mode pre-fills current values (Property 7)
    - **Property 7: Edit mode pre-fills current values**
    - **Validates: Requirements 4.1, 4.2**
  - [ ]\* 8.8 Write property test for cancel edit restores original values (Property 8)
    - **Property 8: Cancel edit restores original values**
    - **Validates: Requirements 4.5**
  - [ ]\* 8.9 Write property test for edit failure preserves input and keeps edit mode open (Property 9)
    - **Property 9: Edit failure preserves input and keeps edit mode open**
    - **Validates: Requirements 4.6**
  - [ ]\* 8.10 Write property test for toggle round-trip (Property 5)
    - **Property 5: Toggle is a round-trip**
    - **Validates: Requirements 3.1, 3.2**
  - [ ]\* 8.11 Write property test for toggle failure preserves state (Property 6)
    - **Property 6: Toggle failure preserves state**
    - **Validates: Requirements 3.4**

- [ ] 9. Checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. NewHabitModal dark redesign and timeGoal field
  - [ ] 10.1 Add `timeGoal` optional text input field (after description) to `client/src/components/NewHabitModal.jsx`
    - _Requirements: 6.3_
  - [ ] 10.2 Apply dark modal styles: `bg-[#1f2937] text-white`, overlay `bg-black/80`, inputs `bg-gray-700 border-gray-600`
    - _Requirements: 8.1_
  - [ ] 10.3 Add local `error` string state — show error on API failure, keep modal open with input preserved; reset all fields on close without submit
    - _Requirements: 6.5, 6.6_
  - [ ]\* 10.4 Write property test for modal close discards data (Property 12)
    - **Property 12: Modal close discards data**
    - **Validates: Requirements 6.6**
  - [ ]\* 10.5 Write property test for create failure keeps modal open with input (Property 13)
    - **Property 13: Create failure keeps modal open with input**
    - **Validates: Requirements 6.5**
  - [ ]\* 10.6 Write property test for adding a habit grows the active group (Property 11)
    - **Property 11: Adding a habit grows the active group**
    - **Validates: Requirements 6.4**

- [ ] 11. DailyProgressPage
  - [ ] 11.1 Create `client/src/pages/DailyProgressPage.jsx` — fetch `/habits`, compute per-habit daily completion for last 30 days from `completedDates` using `dailyData()` helper, render a Recharts `BarChart` per habit with dark chart theme (`#1f2937` bg, `#374151` grid, `#9ca3af` axis, `#3b82f6` bar fill)
    - _Requirements: 7.2_
  - [ ] 11.2 Apply page layout: `lg:ml-64 min-h-screen bg-[#111827] p-8`
    - _Requirements: 7.2, 8.1_
  - [ ]\* 11.3 Write property test for progress pages render data for each habit — DailyProgressPage (Property 14)
    - **Property 14: Progress pages render data for each habit**
    - **Validates: Requirements 7.2**

- [ ] 12. WeeklyProgressPage
  - [ ] 12.1 Create `client/src/pages/WeeklyProgressPage.jsx` — fetch `/habits`, aggregate completions by ISO week for last 12 weeks, render a Recharts `LineChart` with dark theme and line color `#8b5cf6`
    - _Requirements: 7.3_
  - [ ] 12.2 Apply page layout: `lg:ml-64 min-h-screen bg-[#111827] p-8`
    - _Requirements: 7.3, 8.1_
  - [ ]\* 12.3 Write property test for progress pages render data for each habit — WeeklyProgressPage (Property 14)
    - **Property 14: Progress pages render data for each habit**
    - **Validates: Requirements 7.3**

- [ ] 13. YearlyProgressPage
  - [ ] 13.1 Create `client/src/pages/YearlyProgressPage.jsx` — fetch `/habits`, aggregate completions by month for current year, render a Recharts `BarChart` with bar fill `#10b981` and stat cards (total completions, best month, current streak)
    - _Requirements: 7.4_
  - [ ] 13.2 Apply page layout: `lg:ml-64 min-h-screen bg-[#111827] p-8`
    - _Requirements: 7.4, 8.1_
  - [ ]\* 13.3 Write property test for progress pages render data for each habit — YearlyProgressPage (Property 14)
    - **Property 14: Progress pages render data for each habit**
    - **Validates: Requirements 7.4**

- [ ] 14. Remove deprecated components
  - [ ] 14.1 Delete `RightSidebar`, `MiniCalendar`, `ThemeToggle`, `ThemeContext`, `ProgressChart`, `StatisticsView`, and `AreasView` component files; remove all their imports across the codebase
    - _Requirements: 8.2_

- [ ] 15. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with `{ numRuns: 100 }` and are tagged with `// Feature: habit-tracker-dashboard, Property N: ...`
- Unit tests use Vitest + React Testing Library
- Progress page data is computed client-side from `habit.completedDates` — no new API routes needed
