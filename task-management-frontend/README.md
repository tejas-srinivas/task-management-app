# Task Board Management Application

A modern web application for managing client requirements.

## Overview

The Task Board is a collaborative project management application that empowers teams to visually organize and track their work using boards, lists, and cards. It supports real-time updates, role-based access control, checklists, comments, and file attachments, enabling seamless workflow management and communication. Built with a modern React frontend and a robust Node.js/GraphQL backend, the platform is designed for flexibility, scalability, and enhanced team productivity.

## Technologies Used

- React 19
- TypeScript
- Vite
- Apollo Client for GraphQL
- Tailwind CSS
- Radix UI Components
- ShadCN UI Component Library
- React Router

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher recommended)
- yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/city-permit-frontend.git
   cd city-permit-frontend
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_GRAPHQL_BACKEND_URL=your_graphql_endpoint
   VITE_GRAPHQL_CODEGEN_URL=your_graphql_schema_url
   ```

4. Generate GraphQL types (optional):

   ```bash
   yarn compile
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Development

### Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview the production build
- `yarn format` - Format code with Prettier
- `yarn compile` - Generate GraphQL types

### Project Structure

- `src/components` - Reusable UI components
- `src/routes` - Application routes and pages
- `src/utils` - Utility functions
- `src/hooks` - Custom React hooks
- `src/__generated__` - Generated GraphQL types
- `src/primitives` - Low-level UI components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This software is proprietary and confidential. Unauthorized copying, transferring or reproduction of this software, via any medium is strictly prohibited. This software is intended for use only by authorized personnel within our company.
