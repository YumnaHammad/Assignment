# Nexus Dashboard

A responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Fetches live data from JSONPlaceholder and manages state with Zustand.

## Stack

| Tool | Purpose |
|------|---------|
| React + Vite | UI framework and dev server |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Zustand | Global state management |
| Axios | HTTP requests |
| Lucide React | Icons |

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

## Deploy

Push to GitHub, import into [Vercel](https://vercel.com), set framework to **Vite** and deploy. Or run:

```bash
npx vercel
```
