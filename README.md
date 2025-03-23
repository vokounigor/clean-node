# Clean Node.js Project Structure

This is an opinionated Node.js project structure following clean architecture principles and best practices. It provides a solid foundation for building scalable and maintainable Node.js applications.

## 🏗️ Architecture

The project follows clean architecture principles with a clear separation of concerns:

```
src/
├── entities/         # Core business entities
├── features/         # Feature modules (auth, users, etc.)
├── shared/          # Shared utilities and constants
├── errors/          # Custom error classes
└── __tests__/       # Test files
    ├── unit/        # Unit tests
    └── e2e/         # End-to-end tests
```

Each feature module follows a consistent structure:

```
feature/
├── feature.controller.ts  # Request handling
├── feature.service.ts     # Business logic
├── feature.repository.ts  # Data access
├── feature.types.ts       # TypeScript types
└── feature.routes.ts      # Route definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or later
- MongoDB
- Docker (optional)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.sample .env
```

Edit `.env` with your configuration values.

### Development

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

### Building

Build the project:

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist` directory.

### Testing

Run all tests:

```bash
npm test
```

Run specific test types:

```bash
npm run test:unit    # Unit tests only
npm run test:e2e     # End-to-end tests only
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Linting

```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Fix linting issues automatically
```

## 🐳 Docker

### Building the Docker Image

```bash
docker build -t clean-node .
```

### Running with Docker

```bash
docker run -p 3000:3000 --env-file .env clean-node
```

## 🔑 Environment Variables

Required environment variables:

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `AUTH_SALT`: Salt for password hashing
- `JWT_ACCESS_SECRET`: Secret for access token generation
- `JWT_REFRESH_SECRET`: Secret for refresh token generation

## 🛠️ Features

- Clean Architecture implementation
- TypeScript support
- Express.js with middleware setup
- MongoDB integration with Mongoose
- JWT authentication with refresh tokens
- Cookie-based authentication
- Comprehensive error handling
- Unit and E2E testing setup
- ESLint and Prettier configuration
- Docker support
