import React, { useState } from 'react';
import api from '../../services/api';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      alert('Registration successful! Please log in.');
      onRegister();  // Can switch view to Login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input 
        type="email" 
        placeholder="Email"
        className="w-full border p-2 mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input 
        type="password" 
        placeholder="Password"
        className="w-full border p-2 mb-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
