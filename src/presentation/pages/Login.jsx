import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { AuthService } from "../../infrastructure/services/AuthService.js";
import { loginUser } from "../../application/usecases/loginUser.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const service = new AuthService();

    try {
      const response = await loginUser(service, email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Falha no login. Verifique suas credenciais.");
      console.log("Login failed", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bem-vindo</h1>
        <p style={styles.subtitle}>Faça login para continuar</p>

        <div style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ textAlign: "right" }}>
            <Link to="/reset-password" style={styles.linkSmall}>
              Esqueci minha senha
            </Link>
          </div>

          <Button text="Entrar" onClick={handleLogin} />
        </div>

        <p style={styles.bottomText}>
          Não tem conta?{" "}
          <Link to="/register" style={styles.linkBold}>
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f4f4fc, #e9e7ff)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    borderRadius: "1.2rem",
    padding: "2.5rem",
    boxShadow: "0 8px 25px rgba(0,0,0,0.10)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    animation: "fadeIn 0.3s ease",
  },

  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "-1rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  linkSmall: {
    fontSize: "0.85rem",
    color: "#6366f1",
    textDecoration: "none",
  },

  bottomText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "0.95rem",
  },

  linkBold: {
    color: "#4f46e5",
    fontWeight: "600",
    textDecoration: "none",
  },
};
