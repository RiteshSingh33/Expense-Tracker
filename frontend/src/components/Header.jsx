import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex items-center relative sticky top-0 z-50 shadow-lg">
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-wide">
        Expense Tracking App
      </h1>

      <nav className="ml-auto flex gap-6">
        <a href="/" className="text-xl pt-1.5 hover:underline hover:text-yellow-200 transition duration-300">Home</a>
        <a href="/dashboard" className="text-xl pt-1.5 hover:underline hover:text-yellow-200 transition duration-300">Dashboard</a>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
