import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPasswordCode() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerifyCode = () => {
    const savedCode = localStorage.getItem("resetCode");
    if (code === savedCode) {
      toast.success("Código verificado com sucesso!");
      navigate("/reset-password/new");
    } else {
      toast.error("Código incorreto!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verificar Código</h2>
        <label style={styles.label}>Digite o código recebido</label>
        <input
          type="text"
          placeholder="Ex: 123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleVerifyCode} style={styles.button}>
          Verificar Código
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
