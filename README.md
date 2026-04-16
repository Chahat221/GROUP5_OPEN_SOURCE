# GROUP5_OPEN_SOURCE

Backend application built with **Node.js**, **TypeScript**, and **Express** for the course final project.

## Team Members
- Chahat Gautam
- Sania Sania

## Project Structure
- `src/domain/entities` → entities
- `src/application/use-cases` → business logic
- `src/controllers` → controllers
- `src/server.ts` → server entry point

## Features
### Authentication
- Register user
- Login user

### Booking System
- Create booking
- View bookings

## MongoDB Integration Completed
- Connected backend to MongoDB Atlas
- Implemented booking system with conflict prevention

## Tech Stack
- Node.js
- TypeScript
- Express

## How to Run
```bash
npm install
npx ts-node-dev src/server.ts