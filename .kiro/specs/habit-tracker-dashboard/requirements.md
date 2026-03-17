# Requirements Document

## Introduction

This feature defines the Habit Tracker Dashboard — a focused, minimal main view that shows only the user's habits for today. The dashboard lets users view, complete, add, and edit their daily habits, and see a simple progress summary. Separate dedicated pages (Daily, Weekly, Yearly Progress) are accessible via navigation only and are not shown on the dashboard. The backend Habit model requires a new `timeGoal` field to support daily time targets per habit.

## Glossary

- **Dashboard**: The main page of the application showing today's habits only.
- **Habit**: A user-defined recurring activity with a name, description, time goal, and completion state.
- **HabitCard**: The UI component that renders a single habit's name, description, time goal, completion toggle, and edit controls.
- **TimeGoal**: A free-text string describing the daily time target for a habit (e.g., "2 hours training").
- **TodayProgress**: The summary section showing how many habits are completed out of the total for today, with a progress bar.
- **AddHabitModal**: The modal dialog used to create a new habit.
- **EditMode**: The inline editing state of a HabitCard that allows updating name and description.
- **CompletionToggle**: The checkbox or toggle button on a HabitCard used to mark a habit complete or incomplete.
- **DailyProgressPage**: A dedicated page (not the Dashboard) showing per-day progress history with graphs or progress bars.
- **WeeklyProgressPage**: A dedicated page (not the Dashboard) showing weekly summaries and completion trends.
- **YearlyProgressPage**: A dedicated page (not the Dashboard) showing long-term consistency tracking and performance analytics.
- **Navigator**: The sidebar navigation component used to switch between pages.
- **Habit_Model**: The Mongoose schema for habits stored in MongoDB.
- **Habit_API**: The Express.js REST API that manages habit CRUD and toggle operations.

---

## Requirements

### Requirement 1: Display Today's Habits on the Dashboard

**User Story:** As a user, I want to see only my habits for today on the main dashboard, so that I can focus on what needs to be done right now without distraction.

#### Acceptance Criteria

1. WHEN the Dashboard loads, THE Dashboard SHALL fetch and display only the habits belonging to the authenticated user.
2. THE Dashboard SHALL display each habit in a HabitCard that shows the habit's name, description, time goal, and completion state.
3. THE Dashboard SHALL separate habits into two groups: active (not yet completed today) and completed (marked complete today).
4. THE Dashboard SHALL display the active habits group before the completed habits group.
5. WHEN no habits exist for the user, THE Dashboard SHALL display an empty state message and a prompt to add the first habit.
6. THE Dashboard SHALL NOT display weekly, monthly, or yearly progress data or summaries.

---

### Requirement 2: Display Time Goal on Each Habit Card

**User Story:** As a user, I want to see the daily time target on each habit card, so that I know how much time I should dedicate to each habit today.

#### Acceptance Criteria

1. THE HabitCard SHALL display the habit's time goal (e.g., "2 hours training") when a time goal is set.
2. WHEN a habit has no time goal set, THE HabitCard SHALL omit the time goal display without showing a placeholder or empty field.
3. THE Habit_Model SHALL include a `timeGoal` field of type String that is optional and has no default value.
4. THE Habit_API SHALL accept and persist the `timeGoal` field on habit creation and update operations.

---

### Requirement 3: Mark Habits Complete or Incomplete

**User Story:** As a user, I want to toggle a habit's completion state for today, so that I can track which habits I have finished.

#### Acceptance Criteria

1. WHEN a user activates the CompletionToggle on an active HabitCard, THE Dashboard SHALL send a toggle request to the Habit_API and update the habit's completion state to completed for today.
2. WHEN a user activates the CompletionToggle on a completed HabitCard, THE Dashboard SHALL send a toggle request to the Habit_API and update the habit's completion state to active for today.
3. WHEN the toggle request succeeds, THE Dashboard SHALL move the HabitCard to the appropriate group (active or completed) without a full page reload.
4. IF the toggle request fails, THEN THE Dashboard SHALL display an error notification and preserve the habit's previous completion state.

---

### Requirement 4: Edit Habit Name and Description

**User Story:** As a user, I want to edit a habit's name and description directly from the dashboard, so that I can keep my habits up to date without navigating away.

#### Acceptance Criteria

1. WHEN a user initiates edit on a HabitCard, THE HabitCard SHALL enter EditMode and display editable input fields pre-filled with the current name and description.
2. WHILE in EditMode, THE HabitCard SHALL display a Save button and a Cancel button.
3. WHEN a user submits the edit with a non-empty name, THE HabitCard SHALL send an update request to the Habit_API and exit EditMode with the updated values displayed.
4. IF the edit is submitted with an empty name, THEN THE HabitCard SHALL prevent submission and display a validation message.
5. WHEN a user activates the Cancel button in EditMode, THE HabitCard SHALL discard all changes and exit EditMode, restoring the original name and description.
6. IF the update request fails, THEN THE HabitCard SHALL display an error notification and remain in EditMode with the user's input preserved.

---

### Requirement 5: Today's Progress Summary

**User Story:** As a user, I want to see a progress summary at the top of the dashboard, so that I feel motivated and can quickly gauge how my day is going.

#### Acceptance Criteria

1. THE TodayProgress section SHALL display the count of completed habits and the total number of habits for today (e.g., "3 / 7 completed").
2. THE TodayProgress section SHALL display a progress bar whose fill percentage equals `(completedCount / totalCount) * 100`, rounded to the nearest integer.
3. WHEN all habits are completed, THE TodayProgress section SHALL display a 100% filled progress bar and a congratulatory message.
4. WHEN no habits exist, THE TodayProgress section SHALL display "0 / 0" and an empty progress bar.
5. WHEN a habit's completion state changes, THE TodayProgress section SHALL update the count and progress bar immediately without a full page reload.

---

### Requirement 6: Add a New Habit

**User Story:** As a user, I want to add a new habit from the dashboard, so that I can quickly expand my habit list without leaving the current view.

#### Acceptance Criteria

1. THE Dashboard SHALL display a clearly visible "Add Habit" button.
2. WHEN a user activates the "Add Habit" button, THE Dashboard SHALL open the AddHabitModal.
3. THE AddHabitModal SHALL include input fields for habit name (required), description (optional), and time goal (optional).
4. WHEN a user submits the AddHabitModal with a valid name, THE Dashboard SHALL send a create request to the Habit_API and add the new HabitCard to the active habits group without a full page reload.
5. IF the create request fails, THEN THE AddHabitModal SHALL display an error message and remain open with the user's input preserved.
6. WHEN a user closes the AddHabitModal without submitting, THE Dashboard SHALL close the modal and discard all entered data.

---

### Requirement 7: Separate Progress Pages Accessible via Navigation Only

**User Story:** As a user, I want dedicated pages for daily, weekly, and yearly progress, so that I can review my history and trends without cluttering the main dashboard.

#### Acceptance Criteria

1. THE Navigator SHALL include navigation links to the DailyProgressPage, WeeklyProgressPage, and YearlyProgressPage.
2. THE DailyProgressPage SHALL display per-day completion history for each habit using graphs or progress bars.
3. THE WeeklyProgressPage SHALL display weekly completion summaries and trends.
4. THE YearlyProgressPage SHALL display long-term consistency tracking and performance analytics.
5. THE Dashboard SHALL NOT render or embed any content from the DailyProgressPage, WeeklyProgressPage, or YearlyProgressPage.
6. WHEN a user navigates to the Dashboard from any progress page, THE Dashboard SHALL display only today's habits and the TodayProgress summary.

---

### Requirement 8: Dashboard Minimal and Distraction-Free Design

**User Story:** As a user, I want the dashboard to be clean and minimal, so that I can focus entirely on completing my habits for today.

#### Acceptance Criteria

1. THE Dashboard SHALL use a consistent red color theme aligned with the existing Tailwind CSS design system.
2. THE Dashboard SHALL NOT display calendar views, streak charts, category filters, or historical data on the main dashboard view.
3. THE Dashboard SHALL render all HabitCards in a single scrollable list grouped by completion state.
4. THE Dashboard SHALL be fully usable on both mobile and desktop screen sizes.
