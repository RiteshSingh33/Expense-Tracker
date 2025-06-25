const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }); 
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user,      
      amount,
      category,
      description,
      date
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updateExpense = async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
};


