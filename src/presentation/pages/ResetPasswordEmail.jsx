import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPasswordEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = () => {
    if (!email) {
      toast.error("Informe um e-mail válido.");
      return;
    }

    // Gera um código falso e salva localmente
    const fakeCode = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("resetEmail", email);
    localStorage.setItem("resetCode", fakeCode);

    toast.success("Código gerado! (simulado)");
    navigate("/reset-password/code");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Esqueci minha senha</h2>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSendEmail} style={styles.button}>
          Enviar Email
        </button>
        <p style={styles.linkText}>
          Lembrou sua senha? <Link to="/">Voltar ao login</Link>
        </p>
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
  },
  linkText: { marginTop: "15px", fontSize: "14px" },
};
