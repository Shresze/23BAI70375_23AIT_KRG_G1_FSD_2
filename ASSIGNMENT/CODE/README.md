# EcoTrack - Daily Water Tracker

This is a small React app that implements the **Daily Water Tracker** feature described in your assignment.

## Features

- **Login Page** (`/login`) with fake login (stores a token in `localStorage`).
- **Protected Routes** (`/dashboard`, `/dashboard/water`) that redirect to `/login` when not logged in.
- **Water Tracker Page**:
  - Track number of glasses of water (`count`).
  - Editable daily goal (`goal`).
  - Buttons to add, remove, and reset water count.
  - **Goal Reached** state shown when `count >= goal`.
  - `count` and `goal` are persisted in `localStorage` using `useEffect`.
- Optimized `CounterDisplay` component using `React.memo` and stable callbacks (`useCallback`).

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually `http://localhost:5173/`).

4. You will see the **Login Page**. Click **Sign in** to go to the **Dashboard**, then use the navbar to open the **Water Tracker** page.

