import React, { useEffect, useState, useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getExpenses, getCategories } from "../../infrastructure/services/ExpenseService";
import { AuthContext } from "../contexts/AuthContext";

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

export default function ExpenseChart({ refresh }) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.investor_id) return;

    async function loadData() {
      try {
        const [expenses, categories] = await Promise.all([
          getExpenses(user.investor_id),
          getCategories(),
        ]);

        const grouped = categories
          .map((cat, index) => {
            const matchedExpenses = expenses.filter(
              (e) => e.category_id === cat.id
            );

            const total = matchedExpenses.reduce(
              (acc, e) => acc + Number(e.value || 0),
              0
            );

            return {
              name: cat.name,
              value: total,
              color: cat.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
            };
          })
          .filter((g) => g.value > 0);

        setData(grouped);
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
      }
    }

    loadData();
  }, [user, refresh]);

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
          <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
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
