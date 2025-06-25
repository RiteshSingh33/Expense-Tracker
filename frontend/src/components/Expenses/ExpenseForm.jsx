import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ExpenseForm = ({ initialData = null, onSubmit, onCancel, onAdded}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setDescription(initialData.description);
      setDate(initialData.date.slice(0, 10)); 
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { amount, category, description, date };
    if (onSubmit) {
      await onSubmit(data);
    } else {
      try {
        await api.post('/expenses', data);
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');
        if(onAdded) onAdded();
      } catch (err) {
        console.error(err);
        alert('Failed to add expense');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-5 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">{initialData ? 'Edit Expense' : 'Add Expense'}</h2>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {initialData ? 'Update' : 'Add Expense'}
          </button>
          {initialData && (
            <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded">
              Cancel
            </button>
          )}
      </div>
    </form>
  );
};

export default ExpenseForm;
