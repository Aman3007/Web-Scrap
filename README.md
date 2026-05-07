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

## 🧪 Development Patterns
- **Clean Architecture**: Separation of concerns between controllers, services, and models.
- **Global Error Handling**: Centralized middleware for catching and formatting errors.
- **Optimistic UI**: Fast bookmarking experience using React Query cache.
- **Security**: Helmet, CORS, and Express Rate Limit implemented.
