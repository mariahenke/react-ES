import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../infrastructure/services/GoalService.js";

import ReaderLayout from "../../presentation/components/RenderLayout";
import { AuthContext } from "../contexts/AuthContext";
import authService from "../../infrastructure/services/AuthService";

export default function MetasFinanceiras() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [form, setForm] = useState({ title: "", amount: "" });

  const { user, loading } = useContext(AuthContext);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      const response = await listGoals(userId);
      setGoals(response);
    } catch (err) {
      toast.error("Erro ao carregar metas");
    }
  }

  async function handleSubmit() {
    if (!form.title || !form.amount) {
      toast.error("Preencha todos os campos");
      return;
    }

    const parsedAmount = parseFloat(form.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Valor inválido");
      return;
    }

    if (!userId) {
      toast.error("Usuário não identificado");
      return;
    }

    const payload = { title: form.title, amount: parsedAmount, userId };

    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, payload);
        toast.success("Meta atualizada!");
      } else {
        await createGoal(payload);
        toast.success("Meta criada!");
      }

      setForm({ title: "", amount: "" });
      setEditingGoal(null);
      loadGoals();
    } catch (err) {
      console.error("Erro ao salvar meta:", err.response?.data || err.message);
      toast.error("Erro ao salvar meta");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Deseja excluir esta meta?")) return;

    try {
      await deleteGoal(id);
      toast.success("Meta excluída!");
      loadGoals();
    } catch (err) {
      toast.error("Erro ao excluir meta");
    }
  }

  function startEdit(goal) {
    setEditingGoal(goal);
    setForm({ title: goal.title, amount: goal.amount });
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Carregando...</div>;
  }

  if (!user) {
    return <div style={{ padding: 20 }}>Usuário não autenticado.</div>;
  }

  return (
    <ReaderLayout user={user} onLogout={() => authService.logout()}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Metas Financeiras</h1>

          <input
            placeholder="Título da meta"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Valor desejado (R$)"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            style={styles.input}
          />

          <button style={styles.button} onClick={handleSubmit}>
            {editingGoal ? "Salvar alterações" : "Adicionar meta"}
          </button>

          <ul style={styles.list}>
            {goals.map((goal) => (
              <li key={goal.id} style={styles.listItem}>
                <div>
                  <strong>{goal.title}</strong> — R$ {goal.amount}
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.editButton}
                    onClick={() => startEdit(goal)}
                  >
                    Editar
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(goal.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button style={styles.backButton} onClick={() => navigate("/Home")}>
            ← Voltar para Home
          </button>
        </div>
      </div>
    </ReaderLayout>
  );
}

const styles = {
  container: {
    background: "#f3f4f6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "40px 0",
  },
  card: {
    background: "#d7c4ff",
    padding: "30px",
    width: "480px",
    borderRadius: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "12px",
  },
  button: {
    width: "100%",
    background: "#1d4ed8",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "20px",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  actions: { display: "flex", gap: "10px" },
  editButton: {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  backButton: {
    marginTop: "20px",
    background: "#6b7280",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
  },
};
