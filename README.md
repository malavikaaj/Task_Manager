# Task Manager (React + TypeScript + Vite)

A clean, responsive, and interactive task management app that persists tasks in `localStorage` and supports full CRUD, filtering, progress tracking, and optional drag-and-drop reordering and theme toggle.

## Getting Started

- Prerequisites: Node.js (v18+) and npm
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`

## Features Implemented

- Task Creation: Title, Description, Due Date, Category (Work, Personal, Study, Other)
- Local Persistence: All tasks saved to `localStorage`
- Task Listing: Responsive grid with category badges
- Search Bar: Filters by title, description, and category (case-insensitive)
- Overdue Highlighting: Red accent and label for overdue tasks
- Due Soon Highlighting: Orange accent and label for tasks due in 3 days
- Task Status: Complete/incomplete toggle; filter by All/Active/Completed
- Progress Bar: Displays percentage of tasks completed
- Edit & Delete: Inline modal for editing; deletion with confirmation
- Drag-and-drop Reordering: Move tasks using HTML5 drag events
- Light/Dark Theme Toggle: Persistent theme preference
- Accessibility: Semantic roles, labels, and ARIA attributes in key places

## Project Structure

- `src/App.tsx`: Main component, state management, persistence, filters, progress
- `src/components/TaskForm.tsx`: Create new tasks
- `src/components/TaskList.tsx`: Render tasks and handle reordering
- `src/components/TaskCard.tsx`: Task card UI and actions
- `src/components/Filters.tsx`: Status filter controls
- `src/components/Progress.tsx`: Progress bar
- `src/components/ThemeToggle.tsx`: Theme switcher
- `src/types.ts`: Task and filter types
- `src/storage.ts`: Local storage helpers
- `src/utils.ts`: Date and ID helpers

## Hosting

You can host on GitHub Pages:

1. Push this repo to GitHub.
2. Install `gh-pages` (dev dependency) or use GitHub Actions to deploy the `dist` folder.
3. Build with `npm run build`.
4. Publish `dist/` to Pages (via `gh-pages` or Actions).

Alternatively, use Netlify or Vercel and point them to `npm run build`.

### Hosted Link
- After deployment, your site will be available at: `https://malavikaaj.github.io/Task_Manager/`

### Quick Deploy Steps (GitHub Pages)
- Ensure `vite.config.ts` has `base: '/Task_Manager/'` (done).
- Initialize and push:
  - `git init && git add . && git commit -m "Initial commit"`
  - `git branch -M main`
  - `git remote add origin https://github.com/malavikaaj/Task_Manager.git`
  - `git push -u origin main`
- Deploy to Pages:
  - `npm run deploy`
- Enable Pages: in GitHub repo Settings → Pages → Source = `gh-pages` branch.
- Wait ~1–3 minutes for the link to go live.

## Challenges Faced

- Drag-and-drop without external libraries: Implemented basic HTML5 drag to reorder.
- Keeping UI accessible while using custom components: Added labels and roles.

## Notes

- This app uses `localStorage`; clearing browser storage will reset data.
- For unit tests (bonus), consider adding Vitest and testing `storage.ts` and `App` logic.