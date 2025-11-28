import React, { useEffect, useContext, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";
import ExpensesAside from "../components/ExpensesAside";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { AuthService } from "../../infrastructure/services/AuthService";

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const authService = new AuthService();
  const navigate = useNavigate();

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

  function handleLogout() {
    authService.logout();
    navigate("/");
  }

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      {menuOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Savify</h2>

          <nav style={styles.nav}>

            <Link to="/goals" style={styles.link}>
              <FontAwesomeIcon icon={faBullseye} style={styles.icon} />
              Metas Financeiras
            </Link>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              <FontAwesomeIcon icon={faRightFromBracket} style={styles.icon} />
              Sair
            </button>

          </nav>
        </aside>
      )}

      {/* Main content */}
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
    </div>
  );
}

/* ====================== */
/* ======== STYLES ====== */
/* ====================== */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    background: "#f0f2f5",
    fontFamily: "Inter, sans-serif",
  },

  /* Sidebar */
  sidebar: {
    width: "260px",
    backgroundColor: "#ffffff",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    boxShadow: "2px 0 14px rgba(0,0,0,0.08)",
    borderRight: "1px solid #eee",
    animation: "slideIn 0.25s ease",
  },

  sidebarTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "32px",
    textAlign: "center",
    color: "#7D5BA6",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#444",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "10px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    backgroundColor: "transparent",
  },

  icon: {
    fontSize: "18px",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#ffe5e5",
    color: "#b02020",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  /* Main content */
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

