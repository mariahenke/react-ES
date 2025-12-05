import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faRightFromBracket, faHouse, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../infrastructure/services/AuthService";


export default function ReaderLayout({ user, onLogout, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const handleLogout = async () => {
    try {
      if (typeof onLogout === "function") {
        await onLogout();
      } else {
        await authService.logout();
        navigate("/");
      }
    } catch (err) {
      console.warn("Logout falhou:", err);
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) {}
      navigate("/");
    }
  };

  return (
    <div style={styles.container}>
      {/* SIDEMENU */}
      {menuOpen && (
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Savify</h2>

          <nav style={styles.nav}>
            <Link to="/home" style={styles.link}>
              <FontAwesomeIcon icon={faHouse} style={styles.icon} />
              Home
            </Link>

            <Link to="/goals" style={styles.link}>
              <FontAwesomeIcon icon={faBullseye} style={styles.icon} />
              Metas Financeiras
            </Link>

            <Link to="/simulation" style={styles.link}>
              <FontAwesomeIcon icon={faChartLine} style={styles.icon} />
              Simulações
            </Link>

            <button onClick={handleLogout} style={styles.logoutBtn}>
              <FontAwesomeIcon icon={faRightFromBracket} style={styles.icon} />
              Sair
            </button>
          </nav>
        </aside>
      )}

      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div
            style={styles.menuIcon}
            onClick={() => setMenuOpen((s) => !s)}
            title="Abrir/Fechar menu"
          >
            ☰
          </div>

          <div style={styles.userInfo}>
            <h2>{user?.name ? `Olá, ${user.name}!` : "Usuário"}</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* <button
                onClick={handleLogout}
                title="Sair"
                style={styles.headerLogoutBtn}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button> */}

              <Link to="/user" style={{ textDecoration: "none" }}>
                <div style={styles.avatar}>{firstLetter}</div>
              </Link>
            </div>
          </div>
        </header>

        <div style={styles.pageContent}>{children}</div>
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

  /* SIDEBAR */
  sidebar: {
    width: "260px",
    backgroundColor: "#ffffff",
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

  /* MAIN */
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

  headerLogoutBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    padding: "6px",
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

  pageContent: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
  },
};
