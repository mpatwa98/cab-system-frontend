# Cab System Frontend

This is a Next.js application for the frontend of a cab system.

- frontend Github = https://github.com/mpatwa98/cab-system-frontend
- backend Github = https://github.com/mpatwa98/cab-system-backend

- frontend Hosted = https://cab-system-frontend-mpatwa98.vercel.app/
- backend Deployed = https://cab-system-backend.onrender.com

## Features

## ✅ Car Availability

- After a booking is done that cab will not be available to other until its journey is over.
- Go to Cab Management to make any cab Available.

## ✅ Responsiveness

- Web app is mostly responsive to almost all screen sizes. (Under Development)
- Create issue on repo if found (Since testing on all screen size is not possible for me).
- Beautiful UI implemented for better user experiences.

## ✅ Booking Confirmation Email

- When a booking is confirmed, server sends an email.

## ✅ Shortest Time estimation

- A graph is designed and Dijkstra Algorithm is used to estimate the shortest path

## ✅ 5 Cab Type (Cab Management - Change Price Per Minute)

- 5 cab type are implemented, also there price per minute can be changed by the admin

## Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/mpatwa98/cab-system-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cab-system-frontend
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

## Usage

To start the development server, run:

```bash
yarn run dev
```

The application will be available at `http://localhost:3000` by default.

## Available Scripts

In the project directory, you can run the following commands:

### `yarn run dev`

Runs the app in the development mode with hot reloading.

### `yarn run build`

Builds the app for production.

### `yarn run start`

Runs the app.

## Project Structure

```
cab-system-frontend/
  ├── app/                 # React components
  │   ├── pages/           # Next.js pages
  ├── components/          # Reusable React components
  ├── context/             # React context providers and consumers
  ├── public/              # Static files
  ├── utils/               # Utility functions and helpers
  ├── .env.local           # Local environment variables (not committed to git)
  ├── .eslintrc.json       # ESLint configuration
  ├── .gitignore           # Specifies intentionally untracked files
  ├── jsconfig.json        # JavaScript configuration for Visual Studio Code
  ├── .next-env.d.ts       # TypeScript declarations for Next.js environment
  ├── next.config.js       # Next.js configuration
  ├── package.json         # Project metadata and dependencies
  ├── README.md            # Project README file
  ├── tailwind.config.js   # Tailwind CSS configuration
  └── yarn.lock            # Yarn lock file
```
