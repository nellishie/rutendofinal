# Rutendo Chingamuka Portfolio Website

## Overview

This is a professional portfolio website for Rutendo Chingamuka, a pharmacy student, mental health advocate, and AMR enthusiast. The application showcases her educational background, professional experience, skills, blog insights, professional testimonials, and provides a functional contact form for visitors to reach out.

The portfolio follows a modern, clean design approach inspired by professional platforms like LinkedIn and Notion, with a healthcare-oriented color scheme featuring deep teal and navy blue accents. The site includes smooth Framer Motion animations, dark/light mode toggle, and interactive elements to enhance user engagement while maintaining professional credibility.

## Recent Updates (October 2025)

- ✅ Added dark/light mode toggle with localStorage persistence
- ✅ Implemented downloadable CV functionality
- ✅ Created Blog/Publications section featuring pharmacy insights
- ✅ Added Testimonials section with professional recommendations
- ✅ Enhanced all sections with advanced Framer Motion animations
- ✅ Improved contact form with graceful email delivery handling

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**UI Components**: Radix UI primitives with shadcn/ui component library
- Provides accessible, unstyled component primitives
- Custom-styled with Tailwind CSS following the "new-york" design system
- Components include forms, dialogs, toasts, navigation menus, and more

**Styling**: Tailwind CSS with custom design tokens
- CSS variables for theming with full dark/light mode support
- Custom color palette featuring teal and navy healthcare-oriented colors
- Responsive design with mobile-first approach
- Animation support via Framer Motion library

**Theme System**: 
- ThemeToggle component with animated sun/moon icons
- Persists user preference to localStorage
- Applies `.dark` class to document root for theme switching
- Smooth transitions between themes

**Key Sections**:
- Navigation: Fixed header with smooth scroll links and theme toggle
- HeroSection: Profile photo, gradient name, social media buttons
- AboutSection: Professional summary with downloadable CV button
- ExperienceSection: 6 experience cards (IPSF, ZPSA, Nexmed, Stillwaters, etc.)
- EducationSection: University of Zimbabwe BPharm details
- SkillsSection: 9 skill badges + technical proficiencies
- BlogSection: 3 blog posts on AMR, mental health, and leadership
- TestimonialsSection: 3 professional recommendations with star ratings
- ContactSection: Functional contact form with email integration

**State Management**: TanStack Query (React Query) for server state
- Handles API requests and caching
- Form state managed by React Hook Form with Zod validation

**Animations**: Framer Motion library
- Scroll-based animations using `useInView` hook
- Smooth transitions and interactive elements throughout the site

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Design**: RESTful API with two endpoints
- POST `/api/contact` - Handles contact form submissions with graceful email handling
- GET `/api/download-cv` - Generates and downloads CV as text file

**Development Server**: Vite middleware integration for hot module replacement during development

**Production Build**: 
- Frontend built to `dist/public` using Vite
- Backend bundled to `dist/index.js` using esbuild
- Static file serving in production mode

**Validation**: Zod schemas for runtime type validation
- Shared between client and server for consistent validation
- Form data validated on both client and server sides

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts`
- Tables: `users` and `contact_messages`

**Database Provider**: Neon Database (serverless PostgreSQL)
- Connection via `@neondatabase/serverless` driver

**In-Memory Fallback**: MemStorage class implementation
- Used when database is not provisioned
- Stores data in-memory with Map structures
- Implements the same IStorage interface as database storage

**Schema Structure**:
- `users` table: id, username, password
- `contact_messages` table: id, name, email, message, createdAt

### External Dependencies

**Email Service**: Nodemailer with Gmail SMTP
- Sends contact form submissions to `rutendochingamuka4@gmail.com`
- Configured via environment variables (`EMAIL_USER`, `EMAIL_PASSWORD`)
- HTML-formatted emails with branded styling
- Graceful degradation: Messages saved to storage even if email delivery fails
- Requires Gmail App Password (not regular password) for authentication

**Database**: Neon Database (PostgreSQL)
- Serverless PostgreSQL database
- Connection string via `DATABASE_URL` environment variable
- Drizzle ORM for schema management and migrations

**Asset Management**: Static assets stored in `attached_assets` directory
- Profile images and icons
- Accessed via Vite's asset handling with `@assets` alias

**Third-Party UI Libraries**:
- Radix UI - Accessible component primitives
- Framer Motion - Animation library
- React Icons - Icon library (including react-icons/si for social media icons)
- Lucide React - Icon system

**Development Tools**:
- Replit-specific plugins for runtime error handling and development banner
- Source mapping support for debugging

**Session Management**: Connect-pg-simple for PostgreSQL session store
- Dependency included but session implementation not currently active in codebase