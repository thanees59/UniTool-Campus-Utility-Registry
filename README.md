# UniTool – Campus Utility Register System

## Project Overview

UniTool is a full-stack MERN web application developed to manage university equipment rentals efficiently.

University students often organize:
- Media events
- Technical workshops
- Club activities
- Engineering projects
- Cultural programs

Students usually rent equipment from outside shops at high prices.  
UniTool solves this problem by providing a centralized university-managed rental platform where students can borrow equipment at lower rental costs.

---

# Problem Statement

Students face several problems when renting equipment outside the university:

- High rental costs
- No centralized management
- Difficulty checking availability
- No booking history tracking
- Lack of proper approval system

UniTool provides an organized digital solution for managing campus utility rentals.

---

# Proposed Solution

UniTool allows:
- Students to register and login
- Browse available equipment
- Request equipment bookings
- View booking status

Admins can:
- Add equipment
- Update equipment
- Delete equipment
- Approve or reject booking requests
- Manage equipment inventory

---

# Technologies Used

## Frontend
- React.js
- React Router DOM
- Axios
- Custom CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- MongoDB Compass

## Authentication
- JWT Authentication
- bcryptjs Password Hashing

---

# System Features

## Student Features
- User Registration
- User Login
- JWT Authentication
- Browse Equipment
- Search Equipment
- Filter Equipment
- Book Equipment
- View Booking History

## Admin Features
- Admin Dashboard
- Add Equipment
- Edit Equipment
- Delete Equipment
- Approve Bookings
- Reject Bookings
- Manage Inventory

---

# Folder Structure

```txt
UniTool/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md