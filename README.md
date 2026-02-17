# 🌙 Litium

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/Arviixzuhs/litium?style=for-the-badge)](https://github.com/Arviixzuhs/litium/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Arviixzuhs/litium?style=for-the-badge)](https://github.com/Arviixzuhs/litium/network)
[![GitHub issues](https://img.shields.io/github/issues/Arviixzuhs/litium?style=for-the-badge)](https://github.com/Arviixzuhs/litium/issues)

**Full-stack application built with NestJS, React and Prisma.  
Designed with scalability, modularity and clean architecture in mind.**

</div>

---

## 📚 Table of Contents

- [About The Project](#-about-the-project)
- [Architecture Overview](#-architecture-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Backend Setup](#-backend-setup)
  - [Frontend Setup](#-frontend-setup)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Production Build](#-production-build)
- [Design Principles](#-design-principles)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🚀 About The Project

**Litium** is a production-oriented full-stack application built with a modern TypeScript ecosystem.

The project demonstrates:

- Clean and scalable backend architecture
- Modular NestJS design
- Type-safe development across frontend and backend
- Centralized state management
- Structured separation of concerns
- ORM-based database access using Prisma

It is structured as two independent services:

- `backend` → REST API (NestJS)
- `frontend` → SPA Client (React)

---

## 🏗 Architecture Overview

```
litium/
├── backend/   # NestJS API
└── frontend/  # React SPA
```

### Backend
- NestJS
- Prisma ORM
- MySQL
- JWT Authentication
- Modular architecture
- TypeScript

### Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- Service-based API layer
- TypeScript

---

## ✨ Key Features

- 🔐 JWT Authentication
- 🧩 Modular backend structure
- 📦 Prisma ORM integration
- ⚡ Predictable state management with Redux Toolkit
- 🎨 Responsive UI with Tailwind CSS
- 🛡 Full TypeScript implementation
- 🏗 Clean separation between API and client

---

## 🛠 Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- TypeScript
- Vite

### Backend
- Node.js
- NestJS
- Prisma ORM
- TypeScript

### Database
- MySQL

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Arviixzuhs/litium.git
cd litium
```

---

## 🧠 Backend Setup

```bash
cd backend
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Configure `.env`:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=your_secret_key
PORT=3000
```

Run migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start development server:

```bash
npm run start:dev
```

Backend runs at:

```
http://localhost:3000
```

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Configure `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📁 Project Structure

### Backend

```
backend/
├── src/
│   ├── auth/
│   ├── modules/
│   ├── main.ts
│   └── app.module.ts
├── prisma/
│   └── schema.prisma
├── package.json
└── tsconfig.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                            | Required |
|----------------|----------------------------------------|----------|
| DATABASE_URL  | MySQL connection string               | Yes      |
| JWT_SECRET    | Secret for JWT generation             | Yes      |
| PORT          | Backend server port                   | No       |

### Frontend (`frontend/.env`)

| Variable        | Description                     | Required |
|-----------------|---------------------------------|----------|
| VITE_API_URL   | Base URL for backend API        | Yes      |

---

## 🧪 Scripts

### Backend

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run lint
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🚀 Production Build

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

Build outputs:

- `backend/dist`
- `frontend/dist`

---

## 🎯 Design Principles

- Clean modular architecture
- Scalable backend design
- Predictable frontend state
- Strong typing everywhere
- Clear separation of business logic and infrastructure
- Maintainable folder structure

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Follow TypeScript best practices  
4. Open a Pull Request  

---

## 👨‍💻 Author

Developed by **Arviixzuhs**

If you find this project useful, consider leaving a ⭐ on the repository.
