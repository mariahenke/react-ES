import React, { useEffect, useState, useContext } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../infrastructure/services/ExpenseService";
import ExpenseModal from "./ExpenseModal";
import { AuthContext } from "../contexts/AuthContext";

export default function ExpensesAside() {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) loadExpenses();
  }, [user]);

  async function loadExpenses() {
    try {
      const data = await getExpenses(user.id);
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao carregar despesas:", err);
      setExpenses([]);
    }
  }

  async function handleSave(data) {
    try {
      if (editing) await updateExpense(editing.id, data);
      else await createExpense(data);
      setOpenModal(false);
      setEditing(null);
      loadExpenses();
    } catch (e) {
      console.error("Erro ao salvar despesa:", e);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Deseja excluir esta despesa?")) {
      await deleteExpense(id);
      loadExpenses();
    }
  }

  return (
    <aside style={styles.aside}>
      <div style={styles.header}>
        <h3 style={styles.title}>Despesas</h3>

        <button style={styles.newButton} onClick={() => setOpenModal(true)}>
          + Nova
        </button>
      </div>

      <div style={styles.list}>
        {expenses.map((exp) => (
          <div key={exp.id} style={styles.item}>
            <div style={styles.itemHeader}>
              <strong style={styles.itemTitle}>{exp.name}</strong>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditing(exp);
                    setOpenModal(true);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(exp.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <div style={styles.itemBody}>
              <span style={styles.value}>R$ {parseFloat(exp.value).toFixed(2)}</span>
              <small style={styles.category}>{exp.category_name}</small>
            </div>
          </div>
        ))}
      </div>

      <ExpenseModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        onSave={handleSave}
        expense={editing}
      />
    </aside>
  );
}

// 🎨 ESTILOS MODERNOS
const styles = {
  aside: {
    width: "340px",
    background: "#fafafa",
    borderLeft: "1px solid #e5e5e5",
    padding: "20px 18px",
    overflowY: "auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8px",
    borderBottom: "1px solid #eee",
  },

  title: {
    margin: 0,
    color: "#222",
    fontWeight: 600,
  },

  newButton: {
    background: "#1e88e5",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "0.2s",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  item: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: "1px solid #f1f1f1",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },

  itemTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
    flex: 1,
  },

  itemBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  value: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#333",
  },

  category: {
    fontSize: "13px",
    color: "#666",
    fontStyle: "italic",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "#2196f3",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
  },

  deleteBtn: {
    background: "#e53935",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
  },
};
