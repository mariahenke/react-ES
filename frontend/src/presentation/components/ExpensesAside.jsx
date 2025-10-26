import React, { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../infrastructure/services/ExpenseService";
import ExpenseModal from "./ExpenseModal";

export default function ExpensesAside() {
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function handleSave(data) {
    if (editing) await updateExpense(editing.id, data);
    else await createExpense(data);
    setOpenModal(false);
    setEditing(null);
    loadExpenses();
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
        <h3>Despesas</h3>
        <button onClick={() => setOpenModal(true)}>+ Nova</button>
      </div>

      <div style={styles.list}>
        {expenses.map((exp) => (
          <div key={exp.id} style={styles.item}>
            <div>
              <strong>{exp.name}</strong>
              <div>R$ {parseFloat(exp.value).toFixed(2)}</div>
              <small>Categoria: {exp.category_name}</small>
            </div>
            <div style={styles.actions}>
              <button
                onClick={() => {
                  setEditing(exp);
                  setOpenModal(true);
                }}
              >
                Editar
              </button>
              <button onClick={() => handleDelete(exp.id)}>Excluir</button>
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

const styles = {
  aside: {
    width: "320px",
    background: "#f9f9f9",
    borderLeft: "1px solid #ddd",
    padding: "16px",
    overflowY: "auto",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  item: {
    background: "#fff",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "8px",
  },
};
