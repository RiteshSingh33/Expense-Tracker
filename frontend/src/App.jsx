import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ExpenseList from './components/Expenses/ExpenseList';
import ExpenseForm from './components/Expenses/ExpenseForm';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const triggerRefresh = () => setRefresh(!refresh);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {showRegister ? (
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <p className="mt-2 text-sm">
              Already have an account?{' '}
              <button onClick={() => setShowRegister(false)} className="text-blue-500 underline">
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={() => setLoggedIn(true)} />
            <p className="mt-2 text-sm">
              Don’t have an account?{' '}
              <button onClick={() => setShowRegister(true)} className="text-blue-500 underline">
                Register
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <Router>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 p-4">
              <ExpenseForm onAdded={triggerRefresh} />
              <ExpenseList onLogout={handleLogout} key={refresh} />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
