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
      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Falha no login. Verifique suas credenciais.");
      console.log("Login failed", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "#c4b5fd",
          borderRadius: "1rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          padding: "2rem",
          width: "24rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "1.5rem",
          }}
        >
          Login
        </h1>

        {/* Campo de email */}
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Campo de senha */}
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔹 Link de esqueci minha senha */}
        <div style={{ textAlign: "right", marginBottom: "1rem" }}>
          <Link
            to="/reset-password"
            style={{
              color: "#1d4ed8",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            Esqueci minha senha?
          </Link>
        </div>

        {/* Botão de entrar */}
        <Button text="Entrar" onClick={handleLogin} />

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#374151",
          }}
        >
          Não possui conta?{" "}
          <Link
            to="/register"
            style={{ color: "#1d4ed8", textDecoration: "none" }}
          >
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}
