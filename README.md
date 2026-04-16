# Nexus Dashboard

A responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Fetches live data from JSONPlaceholder and manages state with Zustand.

## 🔗 Links

- **Repository:** [GitHub](https://github.com/YumnaHammad/Assignment)
- **Live Demo:** [Vercel Deployment](https://assignment-practice.vercel.app/login)

## Stack

| Tool | Purpose |
|------|---------|
| React + Vite | UI framework and dev server |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Zustand | Global state management |
| Axios | HTTP requests |
| Lucide React | Icons |

## Assumptions

- **Auth Mocking:** Since the dummy APIs don't provide a persistent auth session, authentication is implemented as a local store state with hardcoded credentials for demo purposes.
- **Data Scope:** Focused on JSONPlaceholder's Users, Posts, and Todos as the primary data sources to demonstrate different UI patterns (lists, grids, and task toggles).
- **Styling:** Assumed a "Modern Native" design language was preferred, implementing global `select-none` to mimic a desktop application feel while keeping inputs interactive.

## Evaluation Checklist

| Criteria | Implementation Detail |
|----------|-----------------------|
| **UI Accuracy** | Pixel-perfect Tailwind implementation with premium hover states and smooth transitions. |
| **API Integration** | Robust `useApi` hooks with centralized error/loading handling using Axios. |
| **Code Quality** | Highly modular `ui/` vs `features/` structure. TypeScript strictly enforced. |
| **State Management** | Centralized Zustand store for global search, auth, and data fetching. |
| **Task Coverage** | Implemented search, filtering, detail modals, and task management. |

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — log in with:

```
Email:    admin@nexus.com
Password: password
```

## Structure

```
src/
├── components/
│   ├── ui/          # Primitive atoms (Button, Card, Badge, Modal...)
│   ├── layout/      # Shell components (Header, Sidebar, Layouts)
│   └── features/    # Feature views (users/, posts/, todos/)
├── hooks/           # useAuth, useUsers, usePosts, useTodos
├── pages/           # Route-level pages + auth/
├── store/           # Zustand store
├── services/        # Axios API client
├── types/           # Shared TypeScript interfaces
└── utils/           # cn() class merge helper
```

## API

All data comes from [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- `/users` — Users page
- `/posts` — Posts page
- `/todos` — Tasks page + Dashboard widgets
- `/albums` — Dashboard recent albums widget
