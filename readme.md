# Expense Tracker

A full-stack Expense Tracker application that allows users to record, view, edit, and delete their expenses, and visualize spending patterns with charts.

## 🌟 Features

- User authentication (JWT based)
- Add, edit, delete expenses
- View expenses filtered by logged-in user
- Dashboard with:
  - Doughnut chart: Expenses by category
  - Bar chart: Monthly expenses
- Responsive frontend built with **React + Tailwind CSS**
- Backend built with **Node.js + Express**
- Data stored in **MongoDB**
- Axios used for API communication

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|-----------|---------|----------|
| React + Vite | Node.js + Express | MongoDB |
| Tailwind CSS | JWT for auth | Mongoose |
| Chart.js (via react-chartjs-2) | | |

---

## ⚡ Getting Started

### 1️. Clone the repo
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Update the .env file
```ini
MONGO_URI=your_mongo_connection_string
PORT=PORT_NUMBER
JWT_SECRET=your_secret_key
```
### 4. Run server:
```bash
node server.js
# or use nodemon
```

### 5. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
