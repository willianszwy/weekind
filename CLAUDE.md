# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Architecture

Weekind is a Progressive Web App (PWA) for weekly habit tracking built with React 18 and Vite. The app follows a component-based architecture with custom hooks for state management and local storage persistence.

### Core Structure

- **Single Page Application**: Main app component (`App.jsx`) manages routing between calendar view and weekly detail view
- **Component Architecture**: Modular components in `src/components/` handle different UI sections
- **Custom Hooks**: `useHabits.js` centralizes all habit-related state management and localStorage persistence
- **PWA Configuration**: Full PWA setup with service worker via `vite-plugin-pwa`

### Key Components

- `CalendarView`: Monthly calendar with weekly performance indicators
- `WeekView`: Detailed habit tracking for selected week with habit management
- `DailyStatusCard` & `MyDayCard`: Today's habit overview and interaction
- `WeeklyStatusCard` & `MyWeekCard`: Current week's progress
- `AddHabitForm`: Form for creating new habits (daily or custom schedule)

### State Management

- **useHabits hook**: Manages all habit data, check-ins, and localStorage persistence
- **Local Storage**: Data persists automatically with keys: `weekind-habits`, `weekind-checkins`
- **Date utilities**: Helper functions in `utils/dateUtils.js` for date calculations

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Variables**: Calm-inspired color palette in `src/styles/index.css`
- **Google Fonts**: Asimovian (headers), Dosis (body), Inter & Playfair Display (additional typography)
- **Glassmorphism**: Subtle glass effects throughout the UI

### PWA Features

- **Manifest**: Configured in `vite.config.js` with theme colors and icons
- **Service Worker**: Auto-updating service worker via Vite PWA plugin
- **Base Path**: Configured for GitHub Pages deployment at `/weekind/`

### Development Notes

- The main app logic was originally in `weekind-app.tsx` but has been refactored into modular components
- All date formatting uses consistent `formatDate()` utility function
- Habit check-ins use composite keys: `${weekKey}_${habitId}` for weekly habits, `${dayIndex}` for specific days
- Performance indicators use emoji-based visual feedback for user engagement

### Data Structure

Habits are stored per week with unique identifiers, and check-ins are tracked separately to allow for flexible habit scheduling (daily vs custom days). The app initializes with example daily tasks on first load.