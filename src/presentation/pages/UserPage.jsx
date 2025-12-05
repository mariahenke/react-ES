import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
} from "../../infrastructure/services/UserService";
    import { useNavigate } from "react-router-dom";
import ReaderLayout from "../../presentation/components/RenderLayout";
import { AuthService } from "../../infrastructure/services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UserPage() {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const authService = new AuthService();

    const [loggedUserData, setLoggedUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        if (!loading && user) {
            loadLoggedUser();
            if (user.usertype === 2) loadAllUsers();
        }
    }, [loading, user]);

    async function loadLoggedUser() {
        try {
            const data = await getUserById(user.id);
            setLoggedUserData(data);
        } catch (err) {
            console.error("Erro ao carregar usuário logado:", err);
        }
    }

    async function loadAllUsers() {
        try {
            const data = await getUsers();
            setAllUsers(data);
        } catch (err) {
            console.error("Erro ao carregar usuários:", err);
        }
    }

    async function handleSaveEdit() {
        try {
            await updateUser(editingUser.id, editingUser);
            setEditingUser(null);
            loadAllUsers();
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
        }
    }

    async function handleDelete(id) {
        if (!confirm("Deseja realmente excluir este usuário?")) return;

        try {
            await deleteUser(id);
            loadAllUsers();
        } catch (err) {
            console.error("Erro ao deletar usuário:", err);
        }
    }

    if (loading) {
        return <div style={{ padding: 20 }}>Carregando...</div>;
    }

    if (!user) {
        return <div style={{ padding: 20 }}>Usuário não autenticado.</div>;
    }

    const firstLetter =
        user.name?.charAt(0).toUpperCase() ||
        loggedUserData?.name?.charAt(0).toUpperCase() ||
        "?";

    return (
        <ReaderLayout user={user} onLogout={() => authService.logout()}>
            <div style={styles.page}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.avatar}>{firstLetter}</div>
                    <h1 style={styles.userName}>Minha Conta</h1>
                </div>

                {/* Dados do usuário logado */}
                {loggedUserData && (
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}>Seus Dados</h2>

                        <label style={styles.label}>Nome</label>
                        <div style={styles.value}>{loggedUserData.name}</div>

                        <label style={styles.label}>Email</label>
                        <div style={styles.value}>{loggedUserData.email}</div>

                        <label style={styles.label}>Data de Nascimento</label>
                        <div style={styles.value}>
                            {loggedUserData.Investor?.birth_date || "Não informado"}
                        </div>

                        <label style={styles.label}>Perfil</label>
                        <div style={styles.value}>
                            {loggedUserData.Investor?.Profile?.description || "Não informado"}
                        </div>
                    </div>
                )}

                {/* Tabela */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nome</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Perfil</th>
                            <th style={styles.thCenter}>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUsers.map((u, index) => {
                            const rowStyle = index % 2 === 0 ? styles.trEven : styles.trOdd;

                            return (
                                <tr key={u.id} style={rowStyle}>
                                    {editingUser?.id === u.id ? (
                                        <>
                                            <td style={styles.td}>
                                                <input
                                                    style={styles.input}
                                                    value={editingUser.name}
                                                    onChange={(e) =>
                                                        setEditingUser({
                                                            ...editingUser,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>

                                            <td style={styles.td}>
                                                <input
                                                    style={styles.input}
                                                    value={editingUser.email}
                                                    onChange={(e) =>
                                                        setEditingUser({
                                                            ...editingUser,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>

                                            {/* Perfil */}
                                            <td style={styles.td}>
                                                {u.Investor?.Profile?.description || "Não informado"}
                                            </td>

                                            <td style={styles.actionCell}>
                                                <div style={styles.actions}>
                                                    <button
                                                        style={styles.iconButton}
                                                        onClick={handleSaveEdit}
                                                        title="Salvar"
                                                    >
                                                        <i className="fa-solid fa-save"></i>
                                                    </button>

                                                    <button
                                                        style={{
                                                            ...styles.iconButton,
                                                            background: "#ccc",
                                                            color: "#333",
                                                        }}
                                                        onClick={() => setEditingUser(null)}
                                                        title="Cancelar"
                                                    >
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td style={styles.td}>{u.name}</td>
                                            <td style={styles.td}>{u.email}</td>

                                            <td style={styles.td}>
                                                {u.Investor?.Profile?.description || "Não informado"}
                                            </td>

                                            <td style={styles.actionCell}>
                                                <div style={styles.actions}>
                                                    <button
                                                        style={styles.iconButton}
                                                        onClick={() => setEditingUser(u)}
                                                        title="Editar"
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>

                                                    <button
                                                        style={styles.iconButtonDelete}
                                                        onClick={() => handleDelete(u.id)}
                                                        title="Excluir"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </ReaderLayout>
    );
}

/* ------------------------- ESTILOS ------------------------- */

const styles = {
    page: {
        padding: "32px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
        color: "#333",
    },

    header: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "32px",
    },

    avatar: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "#7D5BA6",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "26px",
        fontWeight: "bold",
    },

    userName: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#7D5BA6",
    },

    card: {
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        marginBottom: "24px",
    },

    sectionTitle: {
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "16px",
        color: "#7D5BA6",
    },

    label: {
        fontWeight: "600",
        color: "#555",
    },

    value: {
        padding: "12px",
        background: "#f7f4fa",
        borderRadius: "10px",
        border: "1px solid #e6dff0",
        marginBottom: "14px",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        border: "1px solid #e5e5e5",
        borderRadius: "10px",
        overflow: "hidden",
    },

    th: {
        background: "#7D5BA6",
        color: "#fff",
        padding: "12px",
        textAlign: "left",
        fontWeight: "600",
        borderBottom: "2px solid #694a8a",
    },

    thCenter: {
        background: "#7D5BA6",
        color: "#fff",
        padding: "12px",
        textAlign: "center",
        fontWeight: "600",
        borderBottom: "2px solid #694a8a",
    },

    trEven: {
        background: "#f7f4fa",
    },

    trOdd: {
        background: "#ffffff",
    },

    td: {
        padding: "12px",
        borderBottom: "1px solid #e5e5e5",
        color: "#444",
    },

    actionCell: {
        padding: "12px",
        textAlign: "center",
        width: "120px",
        borderBottom: "1px solid #e5e5e5",
    },

    actions: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    },

    iconButton: {
        backgroundColor: "#7D5BA6",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "34px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        transition: "0.2s",
    },

    iconButtonDelete: {
        backgroundColor: "#ff4d6d",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "34px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        transition: "0.2s",
    },
};
