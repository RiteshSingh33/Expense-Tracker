import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  // Prepare category data
  const categorySummary = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categorySummary);
  const categoryValues = Object.values(categorySummary);

  const categoryColors = [
    "#36A2EB",
    "#FF6384",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // Prepare month data
  const monthSummary = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + exp.amount;
    return acc;
  }, {});

  const monthLabels = Object.keys(monthSummary);
  const monthValues = Object.values(monthSummary);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-bold mb-2">Expenses by Category</h3>
          <Doughnut
            data={{
              labels: categoryLabels,
              datasets: [
                {
                  data: categoryValues,
                  backgroundColor: categoryColors,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              maintainAspectRatio: false, // 💡 let parent container control sizing
            }}
            style={{ maxHeight: "300px" }} // 💡 set max height
          />
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-bold mb-2">Expenses by Month</h3>
          <Bar
            data={{
              labels: monthLabels,
              datasets: [
                {
                  label: "Total",
                  data: monthValues,
                  backgroundColor: "#36A2EB",
                },
              ],
            }}
            options={{
              scales: {
                y: { beginAtZero: true },
              },
              maintainAspectRatio: false,
            }}
            style={{ maxHeight: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
