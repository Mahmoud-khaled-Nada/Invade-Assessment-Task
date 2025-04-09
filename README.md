### 📝 To-Do List Application – Full Stack (Laravel + React)

## 🚀 Overview

**This project is a full-stack To-Do List Application built using modern technologies like Laravel (with SQLite) on the backend and ReactJS with TypeScript on the frontend. It supports full task management, user authentication, soft deletes with recovery, and role-based state management using Redux. The UI is crafted with shadcn/ui components for a modern, accessible look.**

---

## 🛠️ Technologies Used

**🔧 Backend**

Laravel 12 – Web framework (API only)

SQLite – Lightweight database for simplicity

WT Auth – Token-based API authentication (secure and stateless)

💻 Frontend

ReactJS – Component-based frontend

TypeScript – Type-safe developmen

Redux – State management (task list, auth state, etc.)

shadcn/ui – UI component library based on Radix & Tailwind

Axios – HTTP client for API requests

---

**✅ Features**

1. 🔐 Authentication
2. User Registration & Login via JWT

**Protected API routes**
**📋 To-Do Task Management**
3. Add / Edit / Delete (soft delete) tasks
4. Restore deleted tasks
5. Mark tasks as completed or pending
6. Filter tasks (Completed / Pending)
7. Due date assignment for tasks
8. Pagination for task listing

---
**⚙️ Operating Steps**
**🔌 1. Backend Setup (Laravel)**

`
cd server
composer install
cp .env.example .env
php artisan key:generate
**Configure SQLite database**
touch database/database.sqlite
php artisan migrate
**Optional: seed data**
php artisan db:seed
**JWT Auth Setup**
php artisan jwt:secret
**Serve API**
php artisan serve
`

**💻 2. Frontend Setup (React + TypeScript)**
`
cd frontend
npm install
Configure API base URL
In .en
BASE_URL = 'http://localhost:8000/api/v1';
Start React App
npm run dev
`

