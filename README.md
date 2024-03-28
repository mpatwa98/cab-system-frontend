# Cab System Frontend

This is a Next.js application for the frontend of a cab system.

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
