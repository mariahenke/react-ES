import React, { useEffect, useState } from "react";
import { getCategories } from "../../infrastructure/services/ExpenseService";

export default function ExpenseModal({ open, onClose, onSave, expense }) {
  const [form, setForm] = useState({
    name: "",
    value: "",
    expense_category_id: "",
    description: "",
    expense_date: new Date().toISOString().slice(0, 10), // data atual por padrão
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (expense) setForm(expense);
    else
      setForm({
        name: "",
        value: "",
        expense_category_id: "",
        description: "",
        expense_date: new Date().toISOString().slice(0, 10),
      });
  }, [expense]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{expense ? "Editar Despesa" : "Nova Despesa"}</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            name="value"
            type="number"
            value={form.value}
            onChange={handleChange}
            placeholder="Valor"
            required
          />
          <select
            name="expense_category_id"
            value={form.expense_category_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="expense_date"
            value={form.expense_date}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição"
          />
          <div style={styles.actions}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    minWidth: "400px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  actions: { display: "flex", justifyContent: "flex-end", gap: "10px" },
};
