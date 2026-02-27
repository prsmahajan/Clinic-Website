# Dr. Arafath Ahmed Khan - Medical Clinic Website

## Overview
A professional medical clinic website for Dr. Arafath Ahmed Khan, a Family Physician & Pediatrician based in Frazer Town, Bangalore, India.

## Architecture
- **Frontend**: React SPA with Tailwind CSS and Shadcn UI components
- **Backend**: Express.js API server
- **Routing**: wouter (client-side)
- **State**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Theme**: Light/Dark mode with custom ThemeProvider (localStorage persistence)

## Key Features
- Single-page design with smooth scroll navigation
- Hero section with CTAs (Book Appointment, Call Now)
- About section with professional bio
- Services section (7 medical services)
- Testimonial slider with Google reviews
- Why Choose Us section
- Clinic information with address, phone (080 507 65999), hours, and Google Maps embed
- Appointment booking form (name, phone, age, preferred time, message)
- FAQ section with accordion
- Light/Dark mode toggle
- Fully responsive mobile design
- SEO optimized

## Clinic Details
- **Address**: 127, St Johns Church Rd, near Coles Park, Pulikeshi Nagar, Frazer Town, Bengaluru, Karnataka 560005
- **Phone**: 080 507 65999
- **Hours**: Mon-Thu: 11am-2pm, 6-8pm | Fri: 11am-12:30pm, 6-8pm | Sat: 11am-3:30pm | Sun: Closed

## File Structure
- `client/src/pages/home.tsx` - Main single-page layout with all sections
- `client/src/components/theme-provider.tsx` - Light/dark mode context provider
- `shared/schema.ts` - Appointment form Zod schema
- `server/routes.ts` - POST /api/appointments endpoint
- `server/storage.ts` - In-memory appointment storage

## Design
- Color theme: Medical teal/green (hue 168) with clean white/gray
- Font: Open Sans
- Dark mode: Complementary dark palette with same teal accent