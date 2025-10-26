import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getExpenses, getCategories } from "../../infrastructure/services/ExpenseService";

const DEFAULT_COLORS = [
  "#7D5BA6",
  "#CBB3E3",
  "#EFD9F2",
  "#A2D2FF",
  "#B9FBC0",
  "#FFB4A2",
  "#FF6384",
  "#36A2EB",
];

export default function ExpenseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [expenses, categories] = await Promise.all([
          getExpenses(),
          getCategories(),
        ]);

        console.log("Expenses:", expenses);
        console.log("Categories:", categories);

        const grouped = categories
          .map((cat, index) => {
            const matchedExpenses = expenses.filter((e) => e.category_id === cat.id);
            const total = matchedExpenses.reduce((acc, e) => acc + parseFloat(e.value || 0), 0);

            console.log(`Categoria: ${cat.name}`);
            console.log("  Matched Expenses:", matchedExpenses);
            console.log("  Total:", total);

            return {
              name: cat.name,
              value: total,
              color: cat.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
            };
          })
          .filter((g) => g.value > 0);

        console.log("Grouped Data:", grouped);
        setData(grouped);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
      }
    }

    loadData();
  }, []);

  if (!data.length) {
    return (
      <div style={styles.container}>
        <h3>Despesas por Categoria</h3>
        <p>Nenhuma despesa encontrada.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>Despesas por Categoria</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.name}: R$ ${entry.value.toFixed(2)}`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `R$ ${parseFloat(value).toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    margin: "20px",
  },
};
