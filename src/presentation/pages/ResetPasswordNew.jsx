import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPasswordNew() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (password.length < 6)
      return toast.error("A senha deve ter pelo menos 6 caracteres.");
    if (password !== confirm) return toast.error("As senhas não coincidem.");

    const email = localStorage.getItem("resetEmail");
    localStorage.removeItem("resetCode");

    toast.success(`Senha redefinida com sucesso para ${email}!`);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Nova Senha</h2>
        <label style={styles.label}>Nova Senha</label>
        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Confirmar Senha</label>
        <input
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleReset} style={styles.button}>
          Redefinir Senha
        </button>
      </div>
    </div>
  );
}

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
    width: "350px",
    textAlign: "center",
  },
  title: { fontSize: "22px", fontWeight: "bold", marginBottom: "20px" },
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
  },
};
