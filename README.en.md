# Study Assistant

**Study Assistant** is a personal web system developed to help you organize and manage your studies across multiple areas such as Programming, Mathematics, and English. The system allows you to get a consolidated view of your progress and quickly access your courses.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [System Usage](#system-usage)
5. **[Versão em Português](README.md)**

---

## Overview

**Study Assistant** is built using a modern technology stack to provide a user-friendly and functional interface for managing your learning. The system has two main areas:

- **Roadmap**: Visualize and plan your study progress.
- **Courses**: Direct links to access your courses and learning materials.

## Features

- **Roadmap Area**: Plan and track your progress in Programming, Mathematics, and English.
- **Course Links**: Quickly access your courses through integrated links in the navigation bar.
- **Responsive Interface**: Adaptive design for different screen sizes, ensuring a consistent user experience.

## Technologies Used

- **Next.js**: React framework for building web applications with server-side rendering and static site generation.
- **TypeScript**: JavaScript superset that adds static typing to improve code robustness.
- **Tailwind CSS**: Utility-first CSS framework for responsive and styled design.
- **ShadCN**: Component library for creating modern interfaces.
- **Zod**: Library for schema and type validation.
- **Lucide React**: SVG icon set for React.
- **Firebase**: Development platform providing services like authentication and real-time database.
- **Firebase Authentication**: Service for managing user authentication with support for email/password and social logins.
- **Firebase Realtime Database**: NoSQL database that allows storing and syncing data in real-time.

## System Usage

1. **Authentication**: When accessing the system, you will need to log in. The user receives a token that expires daily, so you will need to log in again each day. The login form is validated using the Zod library to ensure accurate and secure data.

2. **Study Areas**: After logging in, you will be directed to the main page where you can choose to study **Mathematics**, **Programming**, or **English**.

3. **Navigating the Study Area**:
   - **Roadmap**: In each study area, view a roadmap with checklists to track what has been studied. Check items off as you progress in your studies.
   - **Course Links**: Access course links directly from the page of the selected study area.