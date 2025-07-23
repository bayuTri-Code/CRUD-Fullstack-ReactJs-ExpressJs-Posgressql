# 🚀 Fullstack CRUD App – React Vite + Express + PostgreSQL

This is a complete **Fullstack CRUD Application** built with:

- ⚛️ React (Vite)
- 🌐 Express.js (Node.js backend)
- 🐘 PostgreSQL (via DBeaver)
- 🛠️ Postman for API testing

## 📋 Features

- Create, Read, Update, and Delete (CRUD) employee data
- Enum-based role selection (Manager, Developer, HR, Sales, Intern)
- Input validation on both frontend and backend
- Integrated PostgreSQL database
- Realtime updates using React Query
- Responsive UI with reusable components

## 🧩 Tech Stack

| Layer         | Tools Used           |
|---------------|----------------------|
| Frontend      | React Vite |
| Backend       | Node.js, Express.js  |
| Database      | PostgreSQL via DBeaver |
| API Testing   | Postman              |

## 📦 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/bayuTri-Code/CRUD-Fullstack-ReactVite-ExpressJs-Posgressql.git
cd your-repo-name
2. Setup Backend
cd backend
npm install
npm run dev
3. Setup Frontend
cd frontend
npm install
npm run dev
4. PostgreSQL Setup
Create a database (e.g., employee_db)

Use the included SQL schema to create role_type ENUM and employee_details table

Connect using DBeaver or your favorite SQL client

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/employee	Get all employees
POST	/api/employee	Create new employee
PUT	/api/employee/:id	Update employee
DELETE	/api/employee/:id	Delete employee
