# Task Management Application

<img width="1792" height="929" alt="Task Board Screenshot" src="https://github.com/user-attachments/assets/ab3795ed-8747-4a43-97a6-b9b433b8a2bf" />

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)

A modern, full-stack task management application built with React and Node.js, featuring a Kanban-style board interface for organizing and tracking tasks across teams and clients.

## 📋 Overview

The Task Management Application is a collaborative project management platform that empowers teams to visually organize and track their work using boards, lists, and tasks. It supports multi-client architecture with role-based access control, enabling organizations to manage multiple clients and their respective projects seamlessly.

### Key Highlights

- **Multi-Client Support**: Manage multiple clients with isolated boards and members
- **Role-Based Access Control**: Three-tier permission system (Super Admin, Client Admin, Member)
- **Kanban Board Interface**: Intuitive drag-and-drop task management
- **Collaborative Features**: Task assignments, comments, and checklists
- **Comprehensive Dashboard**: Analytics and statistics for better project insights

## ✨ Features

### 🔐 Authentication & User Management

- **User Authentication**: Secure login with JWT-based authentication
- **Password Management**: 
  - Forgot password functionality with email reset
  - Password reset via secure tokens
  - Change password with old password verification
- **User Invitations**: Invite users via email with secure token-based acceptance
- **User Status Management**: Active, Inactive, and Invited status tracking

### 👥 Role-Based Access Control

- **Super Admin**: Full system access, can manage all clients and users
- **Client Admin**: Manage their client's boards, members, and tasks
- **Member**: Access to assigned boards and tasks

### 🏢 Client Management

- Create and manage multiple clients
- Client-specific user and board isolation
- Client status management (Active/Inactive)
- Client descriptions for better organization

### 📊 Board Management

- **Board Creation**: Create boards for different projects or workflows
- **Board Descriptions**: Add context and details to boards
- **Board Status**: Active/Inactive board management
- **Board Members**: Invite and manage board access
- **Board Organization**: Organize boards by client

### 📝 List Management

- **Dynamic Lists**: Create unlimited lists within boards
- **List Reordering**: Drag and drop lists to reorganize workflow
- **List Positioning**: Automatic position management
- **List Customization**: Rename lists to match your workflow

### ✅ Task Management

- **Task Creation**: Create tasks with titles and descriptions
- **Task Details**:
  - Rich text descriptions
  - Due dates with timezone support (IST)
  - Priority levels (Immediate, High, Medium, Low)
  - Multiple tags for categorization
  - Task completion status
- **Task Organization**:
  - Drag and drop tasks between lists
  - Reorder tasks within lists
  - Position-based sorting
- **Task Filtering**:
  - Search by task title
  - Filter by due date (Today, Tomorrow, This Week, Overdue, Custom)
  - Filter by priority
  - Filter by tags
  - Filter by assignee
- **Task Assignments**: Assign tasks to multiple team members
- **Task Comments**: Collaborative commenting system with edit and delete functionality
- **Task Checklists**: Create and manage subtasks with checklists
- **Task Tags**: Comprehensive tag system (100+ predefined tags for Development, Project Management, Business, etc.)

### 📈 Dashboard & Analytics

- **Overview Statistics**:
  - Total boards count
  - Total members count
  - Total clients count (Super Admin only)
  - Total tasks count
  - Completed tasks count
  - Pending tasks count
  - Immediate priority tasks count
  - High priority tasks count
- **Role-Based Views**: Dashboard adapts based on user role
- **Quick Navigation**: Click statistics to navigate to relevant sections

### 🎨 User Interface

- **Modern Design**: Built with Tailwind CSS and Radix UI components
- **Dark Mode**: Theme toggle support
- **Responsive Layout**: Works on desktop and mobile devices
- **Drag & Drop**: Smooth drag-and-drop interactions using @hello-pangea/dnd
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error alerts and notifications

### 🔍 Search & Filtering

- **Advanced Filtering**: Multi-criteria task filtering
- **Text Search**: Search tasks by title
- **Date Filters**: Smart due date filtering
- **Tag Filtering**: Filter by multiple tags
- **Assignee Filtering**: Filter tasks by assigned team members
- **Priority Filtering**: Filter by task priority levels

### 🔔 Notifications & Communication

- **Email Notifications**: SendGrid integration for email communications
- **User Invitations**: Email-based board and user invitations
- **Password Reset**: Email-based password recovery

## 🛠️ Tech Stack

### Frontend

- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Apollo Client**: GraphQL client for data fetching
- **React Router 7**: Client-side routing
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **ShadCN UI**: High-quality component library
- **@hello-pangea/dnd**: Drag and drop functionality
- **date-fns & dayjs**: Date manipulation utilities
- **Lucide React**: Icon library

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **GraphQL**: API query language
- **Apollo Server**: GraphQL server
- **TypeScript**: Type-safe backend development
- **Prisma**: Modern ORM for database management
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **SendGrid**: Email service integration
- **GraphQL Shield**: Permission framework
- **GraphQL Rate Limit**: API rate limiting
- **Winston**: Logging library

## 🏗️ Architecture

### Project Structure

```
task-management-app/
├── task-management-frontend/     # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── routes/               # Page components and routes
│   │   ├── layouts/              # Layout components
│   │   ├── primitives/           # Form and UI primitives
│   │   ├── utils/                # Utility functions
│   │   ├── hooks/                # Custom React hooks
│   │   └── __generated__/        # GraphQL generated types
│   └── package.json
│
└── task-management-backend/      # Node.js backend application
    ├── src/
    │   ├── schema/               # GraphQL schema definitions
    │   │   ├── board/            # Board-related schemas
    │   │   ├── client/           # Client management schemas
    │   │   ├── task/             # Task management schemas
    │   │   ├── user/             # User and auth schemas
    │   │   └── dashboard/        # Dashboard schemas
    │   ├── interfaces/           # TypeScript interfaces
    │   ├── datasources/          # Data source configurations
    │   ├── utils/                # Utility functions
    │   └── permissions.ts         # Permission rules
    ├── prisma/
    │   ├── schema.prisma         # Database schema
    │   └── migrations/           # Database migrations
    └── package.json
```

### Database Schema

- **Users**: Authentication, roles, and client associations
- **Clients**: Client organizations and metadata
- **Boards**: Project boards with client associations
- **Board Members**: Many-to-many relationship for board access
- **Lists**: Task lists within boards with positioning
- **Tasks**: Task entities with rich metadata
- **Task Assignees**: Many-to-many task assignments
- **Comments**: Task comments with author tracking
- **Checklist Items**: Subtasks within tasks

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **PostgreSQL** database
- **Yarn** package manager
- **SendGrid Account** (for email services - optional)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd task-management-backend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on `.env-example`:
   ```env
   PORT=8081
   APP_SECRET="your_secret_key"
   DATABASE_URL="your_postgresql_connection_string"
   NODE_ENV="DEV"
   SENDGRID_API_KEY="your_sendgrid_api_key"
   ```

4. **Set up database**:
   ```bash
   npx prisma db push
   ```

5. **Start the development server**:
   ```bash
   yarn dev
   ```

   The GraphQL server will be available at `http://localhost:8081/graphql`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd task-management-frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on `.env-example`:
   ```env
   VITE_GRAPHQL_BACKEND_URL=http://localhost:8081/graphql
   VITE_GRAPHQL_CODEGEN_URL=http://localhost:8081/graphql
   NODE_ENV=development
   ```

4. **Generate GraphQL types** (optional):
   ```bash
   yarn compile
   ```

5. **Start the development server**:
   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:5173`

## 📖 Use Cases

### 1. **Agency Managing Multiple Clients**

- **Super Admin** creates client organizations
- Each client gets their own isolated workspace
- **Client Admins** manage their client's projects
- Team members are assigned to specific boards
- Tasks are organized by project/board

### 2. **Project Management for Development Teams**

- Create boards for different projects or sprints
- Organize tasks in lists (To Do, In Progress, Review, Done)
- Assign tasks to team members
- Track progress with task completion
- Use tags to categorize work (Frontend, Backend, Bug Fix, Feature)

### 3. **Task Tracking with Priorities**

- Set task priorities (Immediate, High, Medium, Low)
- Filter tasks by priority to focus on urgent work
- Use due dates to track deadlines
- Get dashboard insights on high-priority tasks

### 4. **Collaborative Task Management**

- Add comments to tasks for discussions
- Edit and delete comments
- Create checklists for breaking down complex tasks
- Assign multiple team members to tasks

### 5. **Workflow Customization**

- Create custom lists for your workflow stages
- Reorder lists and tasks via drag-and-drop
- Use tags to create custom categorization systems
- Filter and search to find specific tasks quickly

### 6. **Client Reporting & Analytics**

- View dashboard statistics for project overview
- Track completed vs pending tasks
- Monitor high-priority task counts
- Get insights on team productivity

## 🔧 Available Scripts

### Backend

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn prod` - Run production build
- `yarn db:start` - Start local database with Docker

### Frontend

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn compile` - Generate GraphQL types

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Role-Based Permissions**: GraphQL Shield for permission enforcement
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: GraphQL schema validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CORS Configuration**: Configurable CORS for API security

## 📝 API Documentation

The application uses GraphQL for all API interactions. The GraphQL schema includes:

- **Queries**: Fetch boards, tasks, users, dashboard stats, lists
- **Mutations**: Create, update operations for tasks, boards, lists, users, and comments

Access the GraphQL playground at `http://localhost:8081/graphql` when the backend is running.

## 🎯 Key Features Breakdown

### Task Features
- ✅ Create and update tasks
- ✅ Task descriptions
- ✅ Due date management with timezone support (IST)
- ✅ Priority levels (Immediate, High, Medium, Low)
- ✅ Multiple tag support (100+ predefined tags)
- ✅ Task assignment to multiple users
- ✅ Task comments with edit and delete functionality
- ✅ Checklist items for subtasks
- ✅ Task completion status tracking
- ✅ Drag and drop reordering within and between lists
- ✅ Advanced filtering and search (by title, due date, priority, tags, assignee)

### Board Features
- ✅ Create and update boards
- ✅ Board descriptions
- ✅ Board member management (add/remove members)
- ✅ Board status management (Active/Inactive)
- ✅ Close board functionality
- ✅ List management within boards
- ✅ Drag and drop list reordering

### User Management
- ✅ Three-tier role system (Super Admin, Client Admin, Member)
- ✅ User signup and login
- ✅ User invitations via email with token-based acceptance
- ✅ Forgot password and password reset functionality
- ✅ Change password with old password verification
- ✅ User status management (Active, Inactive, Invited)
- ✅ User role updates
- ✅ Remove users (Super Admin only)
- ✅ Client-based user isolation

## 🚧 Potential Enhancements

While the application is feature-rich, here are some potential enhancements you might consider:

- [ ] Real-time updates (GraphQL subscriptions/WebSocket)
- [ ] File attachments functionality (UI currently commented out)
- [ ] Delete task functionality
- [ ] Task activity history/audit log
- [ ] Task templates
- [ ] Recurring tasks
- [ ] Calendar view for tasks
- [ ] Gantt chart view
- [ ] Time tracking
- [ ] Task dependencies
- [ ] Export functionality (PDF, Excel)
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] Integration with third-party tools (Slack, Jira, etc.)
- [ ] Custom fields for tasks
- [ ] Task automation/workflows
- [ ] Board templates
- [ ] Advanced search with saved filters

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, TypeScript, GraphQL, and Node.js**
