import React, { useEffect, useContext } from "react";
import ExpenseChart from "../components/ExpenseChart";
import ExpensesAside from "../components/ExpensesAside";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Home | Savify";
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando...</div>;
  }

  if (!user) {
    return <div style={{ padding: 20 }}>Usuário não autenticado.</div>;
  }

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        <div style={styles.menuIcon}>☰</div>

        <div style={styles.userInfo}>
          <h2>Olá, {user.name}!</h2>
          <div style={styles.avatar}>{firstLetter}</div>
        </div>
      </header>

      {/* Layout principal */}
      <div style={styles.content}>
        <main style={styles.main}>
          <ExpenseChart />
        </main>

        <ExpensesAside />
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f0f2f5",
    fontFamily: "Inter, sans-serif",
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
    fontWeight: "bold",
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
