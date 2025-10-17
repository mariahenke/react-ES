import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../styles/Home.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Mercado", value: 500 },
    { id: 2, name: "Lazer", value: 300 },
    { id: 3, name: "Cartão", value: 800 },
    { id: 4, name: "Gasolina", value: 200 },
    { id: 5, name: "Aluguel", value: 1200 },
    { id: 6, name: "Outros", value: 150 },
  ]);

  const chartData = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        data: categories.map((c) => c.value),
        backgroundColor: [
          "#7D5BA6",
          "#CBB3E3",
          "#EFD9F2",
          "#A2D2FF",
          "#B9FBC0",
          "#FFB4A2",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    document.title = "Home | Savify";
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon">☰</div>
        <div className="user-info">
          <h2>Olá, Usuário!</h2>
          <div className="user-avatar">👤</div>
        </div>
      </header>

      <main className="home-content">
        <section className="chart-section">
          <h3>Despesas por Categoria</h3>
          <div className="chart-wrapper">
            <Pie data={chartData} />
          </div>
        </section>

        <aside className="categories-aside">
          <div className="aside-header">
            <h4>Categorias</h4>
            <button className="add-btn">+</button>
          </div>
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.id} className="category-item">
                <span className="category-name">{cat.name}</span>
                <span className="category-value">R$ {cat.value}</span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
