# Code Base Vite + TypeScript

This project is a starter template using **Vite** with **TypeScript** and **React**. It includes **Tailwind CSS** for styling, **React Router** for routing, **ESLint** with **Prettier** for code quality and formatting, and **Husky** for Git hooks.

## Features

- **Vite** for a fast and efficient development experience.
- **TypeScript** for static typing and enhanced editor support.
- **React** for building user interfaces.
- **Tailwind CSS** for utility-first styling.
- **React Router** for routing within the application.
- **ESLint** and **Prettier** for code linting and formatting.
- **Husky** for setting up Git hooks to enforce code standards.

## Getting Started

### Prerequisites

Ensure you have **Node.js** and **npm** installed. If not, download them [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd code-base-vite-ts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

Here are some commands you can run in this project:

- **Start Development Server**

  ```bash
  npm run dev
  ```

  This command starts the Vite development server. By default, you can access it at [http://localhost:5173](http://localhost:5173).

- **Build for Production**

  ```bash
  npm run build
  ```

  Compiles the project using TypeScript and bundles it for production.

- **Preview Production Build**

  ```bash
  npm run preview
  ```

  Serves the production build locally.

- **Lint Code**

  ```bash
  npm run lint
  ```

  Runs **ESLint** on all files to check for code issues.

- **Type Check**

  ```bash
  npm run check:type
  ```

  Verifies TypeScript types.

- **Run All Checks**

  ```bash
  npm run check:all
  ```

  Runs Prettier, ESLint, and TypeScript checks to ensure code quality.

- **Set Up Husky**
  ```bash
  npm run prepare
  ```
  Sets up Husky for Git hooks to enforce standards.

## Project Structure

- **src/** - Main application source code.
- **public/** - Public assets for the app.
- **tsconfig.json** - TypeScript configuration.
- **tailwind.config.js** - Tailwind CSS configuration.
- **.eslintrc.js** - ESLint configuration.
- **.prettierrc** - Prettier configuration.

## Tools and Libraries

- **Vite** - For a fast and lightweight development setup.
- **React** - Front-end library for building UI.
- **TypeScript** - Adds static types to JavaScript.
- **Tailwind CSS** - Utility-first CSS framework.
- **React Router** - Handles routing for single-page applications.
- **ESLint & Prettier** - Tools for linting and formatting code.
- **Husky** - Tool for managing Git hooks.

## Author

This project is designed to serve as a starter template for modern front-end development with Vite and TypeScript.
