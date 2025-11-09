# Habits Tracker - Frontend

A modern React + TypeScript frontend application for tracking habits, built with Vite.

## Features

- User registration and authentication
- JWT token-based authentication
- Protected routes
- CRUD operations for habits
- Global loading state management
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
VITE_API_BASE_URL=http://localhost:3000
```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Deploy

This project is configured for Vercel deployment. Simply connect your repository to Vercel and it will automatically deploy.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API service layer
└── utils/          # Utility functions
```

