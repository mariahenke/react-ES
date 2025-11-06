import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function FinancialGoals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Carrega metas salvas ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("financialGoals");
    if (stored) setGoals(JSON.parse(stored));
  }, []);

  // Salva metas sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem("financialGoals", JSON.stringify(goals));
  }, [goals]);

  // Adicionar ou editar meta
  const handleSave = () => {
    if (!newGoal.trim() || !newAmount.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Informe um valor válido!");
      return;
    }

    const newData = { goal: newGoal, amount };

    if (editingIndex !== null) {
      const updated = [...goals];
      updated[editingIndex] = newData;
      setGoals(updated);
      toast.success("Meta atualizada com sucesso!");
    } else {
      setGoals([...goals, newData]);
      toast.success("Meta adicionada!");
    }

    setNewGoal("");
    setNewAmount("");
    setEditingIndex(null);
  };

  // Excluir meta
  const handleDelete = (index) => {
    const updated = goals.filter((_, i) => i !== index);
    setGoals(updated);
    toast.info("Meta removida.");
  };

  // Editar meta
  const handleEdit = (index) => {
    setNewGoal(goals[index].goal);
    setNewAmount(goals[index].amount);
    setEditingIndex(index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Definição de Metas Financeiras</h2>

        <label style={styles.label}>Meta</label>
        <input
          type="text"
          placeholder="Ex: Comprar um carro"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Valor (R$)</label>
        <input
          type="number"
          placeholder="Ex: 50000"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSave} style={styles.button}>
          {editingIndex !== null ? "Atualizar Meta" : "Adicionar Meta"}
        </button>

        <div style={styles.goalsList}>
          {goals.length === 0 ? (
            <p style={styles.emptyText}>Nenhuma meta cadastrada ainda.</p>
          ) : (
            goals.map((item, index) => (
              <div key={index} style={styles.goalItem}>
                <div>
                  <strong>{item.goal}</strong>
                  <p>R$ {item.amount.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(index)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p style={styles.linkText}>
          <Link to="/home">Voltar para Home</Link>
        </p>
      </div>
    </div>
  );
}

// 💅 Estilo idêntico às outras telas
const styles = {
  container: {
    backgroundColor: "#f7f7ff",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#cbb3ff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    width: "400px",
    textAlign: "center",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  label: { display: "block", textAlign: "left", marginBottom: "5px" },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#12111f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  goalsList: {
    marginTop: "10px",
    textAlign: "left",
  },
  goalItem: {
    backgroundColor: "#f1e7ff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#12111f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#ff5252",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  emptyText: {
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
  },
};
