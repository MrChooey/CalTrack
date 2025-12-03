# CalTrack Frontend

Modern React + TypeScript + Vite frontend for the CalTrack calorie tracking application.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Backend API running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173` (or the port shown in terminal)

### Environment Variables

Create a `.env` file in the frontend directory (optional, defaults to localhost:8080):

```
VITE_API_BASE_URL=http://localhost:8080
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Login/Register forms
│   │   ├── foods/       # Food management components
│   │   ├── goals/       # Goal setting components
│   │   ├── consumption/ # Consumption tracking components
│   │   └── layout/      # Navbar, ProtectedRoute
│   ├── contexts/        # React Context (AuthContext)
│   ├── pages/          # Page components
│   ├── services/       # API client (api.ts)
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app with routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── package.json
```

## Features

- **Authentication**: Login, Register, Logout with session management
- **Dashboard**: View daily/weekly calorie summaries and progress
- **Food Management**: Add, edit, delete food items with calories
- **Goal Setting**: Set and update daily/weekly calorie goals
- **Consumption Logging**: Log food consumption with date tracking
- **Profile Management**: Update user profile information

## API Integration

The frontend communicates with the Spring Boot backend via REST API:

- All API calls use Axios with `withCredentials: true` for session cookies
- Base URL: `http://localhost:8080` (configurable via env var)
- CORS is configured on the backend to allow credentials

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be served by any static file server.

## Development Notes

- The app uses session-based authentication (cookies)
- Protected routes automatically redirect to login if not authenticated
- All API errors are handled with user-friendly error messages
- Responsive design with Tailwind CSS (mobile-first)
