# HNFeed — Production-Quality Hacker News Stories Platform

HNFeed is a full-stack MERN application that scrapes top stories from Hacker News, provides JWT-based authentication, and allows users to bookmark their favorite stories. Built with clean architecture and modern aesthetics.

## 🚀 Features

- **Automated Web Scraper**: Scrapes top stories from HN using Axios and Cheerio.
- **Robust Backend**: Node.js/Express with clean service-controller-route architecture.
- **JWT Authentication**: Secure register/login flow with password hashing and protected routes.
- **Modern Frontend**: React 19 with Vite, Tailwind CSS v4, and Lucide Icons.
- **State Management**: TanStack Query (React Query) for efficient data fetching and caching.
- **Bookmarks**: Authenticated users can toggle bookmarks with optimistic UI updates.
- **Pagination & Search**: Efficiently browse and filter through scraped stories.
- **Responsive Design**: Stunning dark UI that looks great on mobile and desktop.
- **Cron Jobs**: Automated scraping every 30 minutes to keep content fresh.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Context API, TanStack Query, Axios, Tailwind CSS, Lucide React, React Hot Toast.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, node-cron, Cheerio.
- **Database**: MongoDB.

## 📁 Folder Structure

### Backend (server/)
```
src/
├── config/       # Database and environment configurations
├── controllers/  # Request handlers
├── middleware/   # Auth, error handling, rate limiting
├── models/       # Mongoose schemas
├── routes/       # API endpoints
├── scraper/      # Web scraping logic and services
├── utils/        # Helper functions and wrappers
├── validators/   # Input validation logic
└── server.js     # Entry point
```

### Frontend (client/)
```
src/
├── api/          # Axios instance and API calls
├── components/   # Reusable UI, stories, and layout components
├── context/      # Global state (Auth)
├── hooks/        # Custom React Query hooks
├── layouts/      # Page layout wrappers
├── pages/        # Application pages
├── routes/       # Route guards
├── utils/        # Formatting and helper utilities
└── App.jsx       # Main application routing
```

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 2. Backend Setup
1. `cd Server`
2. `npm install`
3. Create `.env` from `.env.example` and fill in your values.
4. `npm run dev` (runs with `--watch` on Node 20+)

### 3. Frontend Setup
1. `cd Client`
2. `npm install`
3. `npm run dev`

The app should now be running at `http://localhost:5173`.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (Protected)

### Stories
- `GET /api/stories` - Get paginated stories (Supports `?page=1&limit=10&search=keyword`)
- `GET /api/stories/:id` - Get single story details
- `POST /api/stories/:id/bookmark` - Toggle bookmark (Protected)

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarked stories (Protected)

### Scraper
- `POST /api/scrape` - Manually trigger HN scraper

## 📜 Development History

The project was developed incrementally over a focused 7-hour session. Below is the technical breakdown of the implementation sequence:

| Commit Hash | Message | Description |
| :--- | :--- | :--- |
| `23deef3` | `Refactor: Update cookie options for secure and sameSite settings` | Updated backend cookie configuration with SameSite: None and Secure: true to enable cross-origin authentication for the hosted Render domains. |
| `ae57a47` | `Refactor: Update API base URL to production endpoint` | Configured the frontend Axios instance to point directly to the production backend URL on Render. |
| `3955321` | `refactor: Update API proxy target to production URL` | Updated the Vite proxy configuration to align local development with the production backend environment. |
| `b87d16b` | `refactor: finalize codebase and perform cleanup` | Final audit of the codebase, removing unused variables and performing minor code organization for production readiness. |
| `e074e8b` | `docs: add comprehensive readme and documentation` | Created the project README with installation guides, API documentation, and architecture overviews. |
| `01d7235` | `feat: implement protected routes and user persistence` | Added React Router guards to prevent unauthorized access to bookmarks and handled user session hydration from the API. |
| `20b6f62` | `feat: add bookmarking support with tanstack query` | Integrated bookmarking logic with React Query's `useMutation`, enabling instant UI updates and cache invalidation. |
| `438aac5` | `feat: integrate stories feed with pagination` | Developed the primary stories feed with complex pagination controls, search filtering, and custom date formatting. |
| `29149ac` | `feat: build responsive navigation and layout` | Created the modern dark-themed navigation bar and layout wrappers with glassmorphism effects and responsive behavior. |
| `c6ebd3b` | `feat: implement authentication context and forms` | Built the global `AuthContext` for state management and implemented registration/login forms with robust validation. |
| `75f6503` | `feat: initialize frontend with routing and tailwind css` | Set up the Vite project with Tailwind CSS v4 and configured the base routing structure for the SPA. |
| `a25696c` | `feat: implement bookmarks api functionality` | Added specialized backend routes to fetch a user's bookmarked stories through Mongoose relationship population. |
| `fa90361` | `feat: add scraper and story api endpoints` | Developed the public API for fetching paginated stories and the manual trigger for the scraping service. |
| `d221d2a` | `feat: create hacker news scraper service` | Implemented the core scraper using Cheerio to parse HN's HTML and a service layer to handle database upserts. |
| `4f8700b` | `feat: implement authentication routes and controllers` | Built the auth controllers for registration and login, including password hashing and session management logic. |
| `e659130` | `feat: implement jwt cookie authentication middleware` | Developed the security middleware to extract and verify JWT tokens from HttpOnly cookies instead of headers. |
| `f3dab71` | `feat: add jwt utility and async helpers` | Created utility functions for token signing/verification and a global `asyncHandler` to streamline controller code. |
| `99a9f60` | `feat: implement user and story models` | Defined the Mongoose schemas for Users and Stories, including compound indexes for search performance. |
| `4b7d600` | `feat: configure express server and mongodb connection` | Initialized the Express application with security middleware (Helmet, CORS) and established the MongoDB connection. |
| `82704aa` | `chore: initialize project structure and setup` | Set up the root directory with basic dependencies, project configuration, and Git initialization. |


