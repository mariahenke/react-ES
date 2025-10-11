import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { AuthService } from "../../infrastructure/services/AuthService.js";
import { registerUser } from "../../application/usecases/registerUser.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const service = new AuthService();
    try {
      const response = await registerUser(service, name, email, password);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Falha no cadastro. Tente novamente.");
      console.error("Register failed", error);
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Cadastrar" onClick={handleRegister} />
      <p>
        Já possui conta? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
