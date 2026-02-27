# 📇 Contacts Manager App
**Live Full-Stack CRUD Application (Production Deployed)**

A production-ready full-stack contact management system built and deployed independently using **Node.js, Express, MySQL, and Vanilla JavaScript**.

🔗 **Live Demo:**
Frontend: [https://contacts-manager-app-delta.vercel.app/](https://contacts-manager-app-delta.vercel.app/)

Backend API: [https://contacts-manager-app.up.railway.app/contacts](https://contacts-manager-app.up.railway.app/contacts)

## 🎯 Project Overview
This project demonstrates my ability to:
* Design and implement RESTful APIs
* Integrate a relational database (MySQL)
* Manage environment variables securely
* Handle backend deployment issues (timeouts, DB connectivity)
* Deploy full-stack applications to production (Railway + Vercel)
* Structure frontend logic using modular JavaScript architecture

The application performs complete CRUD operations with persistent storage and live production hosting.

## 🏗 Architecture
Frontend (Vercel) ⬇ REST API (Express.js on Railway) ⬇ MySQL Database (Railway Managed Service)

The frontend dynamically detects local vs production environments and connects accordingly.

## 🛠 Technical Stack
### Frontend
* HTML5 / CSS3
* Vanilla JavaScript (ES Modules)
* Fetch API
* Modular structure (`api.js`, `main.js`, `utils.js`)

### Backend
* Node.js
* Express.js
* MySQL2
* dotenv
* CORS configuration
* Error handling middleware

### Deployment
* Vercel (Frontend)
* Railway (Backend + MySQL)
* Environment-based configuration


### 📁 Project Structure
```
contacts-manager-app/
├── backend/
│   ├── server.js # Express app entry point
│   ├── db.js # MySQL connection configuration
│   ├── routes/
│   │   └── contacts.js # CRUD API routes
│   ├── package.json
│   ├── package-lock.json
│   └── .env # Environment variables (not committed)
│
└── frontend/
    ├── index.html # Main UI structure
    ├── styles.css # Application styling
    ├── api.js # API communication layer
    ├── main.js # UI state & event handling
    └── utils.js # Helper functions
```

## 🔑 Key Engineering Decisions
* Used environment variables for database security instead of hardcoding credentials.
* Separated frontend concerns (API layer vs UI state management).
* Implemented proper async/await error handling.
* Solved production connection issues (ETIMEDOUT) by configuring correct DB host and Railway networking.
* Ensured frontend avoids `file://` CORS issues by using proper local server setup.

## 📡 API Endpoints
GET `/contacts` – Retrieve all contacts
POST `/contacts` – Create a new contact
PUT `/contacts/:id` – Update a contact
DELETE `/contacts/:id` – Delete a contact

## 💡 What This Project Proves
* I can build and deploy full-stack applications independently.
* I understand backend connectivity issues beyond just writing code.
* I can debug production-level errors.
* I can move a project from local development to public deployment.

## 🚀 Future Improvements
* Authentication & authorization
* Input validation layer (Joi / Zod)
* Pagination and search
* Rate limiting
* Unit and integration testing
* Dockerization

## 👨‍💻 Developer
**Rex Roshan**
Full-Stack Developer
