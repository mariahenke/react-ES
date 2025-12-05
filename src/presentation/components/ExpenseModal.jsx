import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../../infrastructure/services/ExpenseService";
import { AuthContext } from "../contexts/AuthContext";

export default function ExpenseModal({ open, onClose, onSave, expense }) {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!user) return;

    if (expense) {
      setForm({
        name: expense.name,
        value: expense.value,
        category_id: expense.category_id,
        description: expense.description,
        expense_date: expense.expense_date.substring(0, 10),
      });
    } else {
      setForm({
        name: "",
        value: "",
        category_id: "",
        description: "",
        expense_date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [expense, user]);

  if (!open || !form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, user.investor_id);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{expense ? "Editar Despesa" : "Nova Despesa"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Nome</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome da despesa"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Valor</label>
            <input
              name="value"
              type="number"
              value={form.value}
              onChange={handleChange}
              placeholder="0,00"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Categoria</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label>Data</label>
            <input
              type="date"
              name="expense_date"
              value={form.expense_date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detalhes adicionais"
              style={styles.textarea}
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" style={styles.saveBtn}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const sharedField = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d5d5d5",
  fontSize: "15px",
  outline: "none",
  transition: "0.2s ease",
  background: "#fafafa",
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(3px)",
  },

  modal: {
    background: "white",
    padding: "32px",
    borderRadius: "18px",
    width: "480px",
    maxWidth: "90%",
    boxShadow: "0px 12px 35px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.25s ease",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    margin: "0 0 20px 0",
    fontSize: "22px",
    textAlign: "center",
    color: "#333",
    fontWeight: 600,
  },

  form: { display: "flex", flexDirection: "column", gap: "18px" },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  input: {
    ...sharedField,
  },

  select: {
    ...sharedField,
    appearance: "none",
    cursor: "pointer",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #777 50%), linear-gradient(135deg, #777 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 20px) calc(50% - 3px), calc(100% - 15px) calc(50% - 3px)",
    backgroundSize: "5px 5px, 5px 5px",
    backgroundRepeat: "no-repeat",
  },

  textarea: {
    ...sharedField,
    minHeight: "80px",
    resize: "none",
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelBtn: {
    padding: "10px 18px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "0.3s",
  },

  saveBtn: {
    padding: "10px 20px",
    background: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "white",
    fontWeight: "600",
    transition: "0.3s",
  },
};
