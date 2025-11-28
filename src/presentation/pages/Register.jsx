import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";
import { AuthService } from "../../infrastructure/services/AuthService.js";
import { registerUser } from "../../application/usecases/registerUser.js";
import { getProfiles } from "../../infrastructure/services/ProfileService.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [profileId, setProfileId] = useState("");
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await getProfiles();

        if (Array.isArray(data)) setProfiles(data);
      } catch (err) {
        console.error("Erro ao buscar perfis", err);
      }
    }

    loadProfiles();
  }, []);

  const handleRegister = async () => {
    const service = new AuthService();

    try {
      const data = {
        name,
        email,
        password,
        birth_date : birthdate,
        profile_id: profileId,
      };

      console.log('data');
      console.log(data);

      const response = await registerUser(service, data);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Cadastro realizado com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Falha no cadastro. Tente novamente.");
      console.error("Register failed", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Criar Conta</h1>
        <p style={styles.subtitle}>Preencha os dados abaixo</p>

        <div style={styles.form}>
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <Input
            label="Data de Nascimento"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          {/* Select modernizado */}
          <div>
            <label style={styles.label}>Tipo de Perfil</label>
            <select
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              style={styles.select}
            >
              <option value="">Selecione...</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.description}
                </option>
              ))}
            </select>
          </div>

          <Button text="Cadastrar" onClick={handleRegister} />
        </div>

        <p style={styles.bottomText}>
          Já possui conta?{" "}
          <Link to="/" style={styles.linkBold}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  ...{
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
      maxWidth: "450px",
      backgroundColor: "#fff",
      borderRadius: "1.2rem",
      padding: "2.5rem",
      boxShadow: "0 8px 25px rgba(0,0,0,0.10)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },

    title: {
      fontSize: "2rem",
      fontWeight: "700",
      textAlign: "center",
      color: "#1f2937",
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

    label: {
      display: "block",
      marginBottom: "4px",
      fontSize: "0.9rem",
      fontWeight: 500,
      color: "#374151",
    },

    select: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      backgroundColor: "#f9f9ff",
      fontSize: "0.95rem",
      outline: "none",
      transition: "0.2s",
    },

    bottomText: {
      marginTop: "0.5rem",
      textAlign: "center",
      fontSize: "0.95rem",
      color: "#6b7280",
    },

    linkBold: {
      color: "#4f46e5",
      fontWeight: 600,
      textDecoration: "none",
    },
  }
};
