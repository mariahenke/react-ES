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
    <div className="container">
      <h1>Login</h1>
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Entrar" onClick={handleLogin} />
      <p>
        Não possui conta? <Link to="/register">Registrar</Link>
      </p>
    </div>
  );
}
