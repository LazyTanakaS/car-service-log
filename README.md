# Car Service Log

A small web app for keeping track of car maintenance: when a part was replaced or a job was done, and at what mileage. Built for car owners who want a simple personal service history.
Data is stored locally in the browser.

Live demo: https://car-service-ivory.vercel.app/

## Features

- Add a service record: date, mileage, part or job
- Edit and delete existing records
- Filter records by part (the filter options are built from existing records)
- Records are sorted by date, newest first
- Data persists between sessions via localStorage
- Empty states for "no records yet" and "nothing found"

## Tech stack

- React 19
- TypeScript
- Vite
- ESLint (typescript-eslint, react-hooks)
- Plain CSS

## Getting started

```bash
npm install
npm run dev
```

## What I practiced

- Derived data: the part list, active filter and visible records are computed during render instead of being stored in extra state
- A custom generic hook, useLocalStorage<T>, with lazy initial state, a fallback to the initial value when stored data is corrupted
- Lifting state up, and using key to reset the form when switching between add and edit mode
- Immutable array updates with map, filter and spread

## Roadmap

- Cost and note fields in the form (already in the data type)
- Tests with Vitest and React Testing Library
- Supabase as a backend instead of localStorage
- Authentication
- Service reminders by mileage or date
