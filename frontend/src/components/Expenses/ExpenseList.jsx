import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ExpenseForm from './ExpenseForm'; 

const ExpenseList = ({ onLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);  // track what we're editing

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to delete expense');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await api.put(`/expenses/${editingExpense._id}`, updatedData);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert('Failed to update expense');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Expenses</h2>
        
      </div>

      {editingExpense && (
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={handleUpdate}
          onCancel={() => setEditingExpense(null)}
        />
      )}

      <ul className="space-y-2 mt-4">
        {expenses.map(exp => (
          <li key={exp._id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <strong>{exp.category}</strong>: ₹{exp.amount} <br />
              <span className="text-sm">{exp.description}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm">{new Date(exp.date).toLocaleDateString()}</span>
              <button 
                onClick={() => handleEdit(exp)} 
                className="bg-green-600 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(exp._id)} 
                className="bg-red-400 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
