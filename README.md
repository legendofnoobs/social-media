# Social Media App - Next.js

This project is a social media application built using Next.js, Prisma, Clerk, Tailwind CSS, and Uploadthing.

## Table of Contents

*   [Introduction](#introduction)
*   [Features](#features)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Environment Variables](#environment-variables)
*   [Technologies Used](#technologies-used)
*   [Project Structure](#project-structure)
*   [Key Components and Logic](#key-components-and-logic)
*   [Database Schema](#database-schema)
*   [Authentication](#authentication)
*   [UI Library](#ui-library)
*   [File Uploads](#file-uploads)
*   [Deployment](#deployment)
*   [Contributing](#contributing)
*   [License](#license)

## Introduction

This application aims to provide a platform for users to connect, share posts, and interact with each other. It includes features like user authentication, post creation and management, following/followers, liking and commenting, and a search functionality.

## Features

*   **User Authentication:** Secure user authentication using Clerk.
*   **Post Creation:** Users can create and share text-based posts.
*   **Following/Followers:** Users can follow other users and view their posts.
*   **Liking and Commenting:** Users can like posts and add comments.
*   **Search:** Functionality to search for users and posts.
*   **Profile Management:** Users can update their profile information.
*   **Responsive Design:** The application is designed to be responsive and work well on different devices.
*   **Edit Posts:** The ability to edit existing posts.
*   **Image Uploads:** Functionality to upload images using Uploadthing.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 20 or later)
*   [npm](https://www.npmjs.com/) (or yarn, pnpm, or bun)
*   [PostgreSQL](https://www.postgresql.org/) database
*   [Clerk Account](https://clerk.com/) (for authentication)
*   [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-line-interface)
*   [Uploadthing Account](https://uploadthing.com/) (for file uploads)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Set up your PostgreSQL database and note the connection URL.

4.  Set up your Clerk account and obtain the necessary API keys.

5.  Set up your Uploadthing account and obtain your API key.

6.  Copy the `.env.example` file to `.env` and configure the environment variables.

7.  Push the Prisma schema to the database:

    ```bash
    npx prisma db push
    ```

    or, if you prefer to use migrations:

    ```bash
    npx prisma migrate dev
    ```

8.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

*   `DATABASE_URL`: The connection string to your PostgreSQL database.  Example: `postgresql://user:password@host:port/database?schema=public`
*   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key.
*   `CLERK_SECRET_KEY`: Your Clerk secret key.

*   `UPLOADTHING_TOKEN`:  Your Uploadthing API token.

## Technologies Used

*   **[Next.js](https://nextjs.org/)**: A React framework for building performant web applications.
*   **[Prisma](https://www.prisma.io/)**: A modern database toolkit for type-safe database access.
*   **[Clerk](https://clerk.com/)**: Authentication and user management.
*   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
*   **[Radix UI](https://www.radix-ui.com/)**: A set of unstyled, accessible UI primitives.
*   **[Lucide React](https://lucide.dev/)**: A library of beautiful, consistent icons.
*   **[Typescript](https://www.typescriptlang.org/)**: Adds type safety to javascript
*   **[Uploadthing](https://uploadthing.com/)**: File upload service

## Project Structure

The project structure is organized as follows:

```
social-media/
├── .next/                   # Next.js build output
├── node_modules/            # Dependencies
├── prisma/                 # Prisma-related files
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── src/                    # Source code
│   ├── actions/            # Server actions for data fetching and mutations
│   │   ├── post.action.ts  # Post-related actions
│   │   └── user.action.ts  # User-related actions
│   ├── app/                # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Utility functions and database connection
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility functions and database connection
│   ├── middleware.ts        # Clerk Middleware
├── components.json          # shadcn-ui config
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Key Components and Logic

*   **`prisma/schema.prisma`:** Defines the database schema, including models for User, Post, Comment, Like, Follows, and Notification.
*   **`src/actions/`:** Contains server actions that interact with the database using Prisma.  These actions handle data fetching and mutations, such as creating posts, following users, and liking posts.  Server actions provide a secure way to interact with the database from client components, without exposing database credentials to the browser.
*   **`src/app/`:** Leverages the Next.js app directory structure to define routes and pages.
*   **`src/components/`:** Contains reusable UI components, such as PostCard, FollowButton, and Avatar. The `components.json` file configures shadcn-ui.
*   **`src/lib/prisma.ts`:** Initializes the Prisma client and makes it available for use throughout the application.  It uses a singleton pattern to ensure that only one Prisma client instance is created.
*   **`src/lib/utils.ts`:** Contains utility functions, such as `cn` for merging Tailwind CSS classes.

## Database Schema

The Prisma schema (`prisma/schema.prisma`) defines the following models:

*   **User:** Stores user information, including authentication details (clerkId), profile information, and relations to posts, comments, likes, follows, and notifications.
*   **Post:** Stores post information, including the author, content, image, creation and update timestamps, and relations to comments, likes, and notifications.
*   **Comment:** Stores comment information, including the author, content, post, and creation timestamp.
*   **Like:** Stores information about which users have liked which posts.
*   **Follows:** Stores information about which users are following which other users.
*   **Notification:** Stores information about notifications, including the user, creator, type, read status, post, comment, and creation timestamp.

## Authentication

This application uses Clerk for authentication and user management. Clerk provides a set of pre-built UI components and server-side helpers for handling authentication.  The `middleware.ts` file protects routes using Clerk's middleware. The `ClerkProvider` component in `src/app/layout.tsx` wraps the application and provides the necessary context for Clerk to function.

## UI Library

This application uses a combination of Tailwind CSS and Radix UI components.  Tailwind CSS provides a utility-first CSS framework for styling the application. Radix UI provides a set of unstyled, accessible UI primitives for building UI components.  The `components.json` file configures shadcn-ui, which helps to easily add Radix components to the project.

## File Uploads

This application uses Uploadthing for handling file uploads. The `UPLOADTHING_TOKEN` environment variable is used to authenticate with the Uploadthing API.  The `src/components/ImageUpload.tsx` component provides a reusable way to upload images.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

