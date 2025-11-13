import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseChart from "../components/ExpenseChart";
import ExpensesAside from "../components/ExpensesAside";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    document.title = "Home | Savify";
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      {menuOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Savify</h2>
          <nav style={styles.nav}>
            <Link to="/goals" style={styles.link}>
              🎯 Metas Financeiras
            </Link>

            <Link to="/" style={styles.link}>
              🚪 Sair
            </Link>
          </nav>
        </aside>
      )}

      {/* Conteúdo principal */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div
            style={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Abrir/Fechar menu"
          >
            ☰
          </div>
          <div style={styles.userInfo}>
            <h2>Olá, Usuário!</h2>
            <div style={styles.avatar}>👤</div>
          </div>
        </header>

        {/* Corpo da página */}
        <div style={styles.content}>
          <main style={styles.main}>
            <ExpenseChart />
          </main>
          <ExpensesAside />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    background: "#f0f2f5",
    fontFamily: "Inter, sans-serif",
  },

  /* Sidebar */
  sidebar: {
    width: "240px",
    backgroundColor: "#cbb3ff",
    color: "#121111",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "30px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#1f1f1f",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 10px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  linkHover: {
    backgroundColor: "#b497ff",
  },

  /* Main content area */
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    background: "#7D5BA6",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
  },
  menuIcon: {
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    background: "#fff",
    color: "#7D5BA6",
    borderRadius: "50%",
    padding: "8px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
  },
};
