import React, { useState, useMemo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ReaderLayout from "../../presentation/components/RenderLayout";
import { AuthContext } from "../contexts/AuthContext";


export default function SimulationPage() {
    const [percent, setPercent] = useState(10);
    const [income, setIncome] = useState("");
    const [months, setMonths] = useState(6);
    const [investmentType, setInvestmentType] = useState("cdb");
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div style={{ padding: 20 }}>Carregando...</div>;
    }

    if (!user) {
        return <div style={{ padding: 20 }}>Usuário não autenticado.</div>;
    }


    const investmentRates = {
        cdb: 0.9,
        cdi: 1.0,
        tesouro: 1.1,
    };

    const monthlySavings = useMemo(() => {
        if (!income) return 0;
        return (income * (percent / 100));
    }, [income, percent]);

    const projection = useMemo(() => {
        if (!income) return 0;
        const rate = investmentRates[investmentType] ?? 1;
        return (monthlySavings * months * rate).toFixed(2);
    }, [months, investmentType, monthlySavings]);

    return (
        <ReaderLayout user={user} onLogout={() => authService.logout()}>
            <div style={styles.page}>

                <div style={styles.header}>
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                    <h1 style={styles.title}>Simulação de Investimento</h1>
                </div>

                <div style={styles.card}>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Percentual reservado</label>
                            <input
                                type="number"
                                min="5"
                                max="20"
                                value={percent}
                                onChange={(e) => setPercent(Number(e.target.value))}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.field}>
                            <label>Renda mensal (R$)</label>
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(Number(e.target.value))}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.field}>
                            <label>Meses</label>
                            <input
                                type="number"
                                min="1"
                                max="60"
                                value={months}
                                onChange={(e) => setMonths(Number(e.target.value))}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Tipo de investimento</label>
                        <select
                            value={investmentType}
                            onChange={(e) => setInvestmentType(e.target.value)}
                            style={styles.select}
                        >
                            <option value="cdb">CDB</option>
                            <option value="cdi">CDI</option>
                            <option value="tesouro">Tesouro Direto</option>
                        </select>
                    </div>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.subtitle}>Visão Geral</h3>

                    <div style={styles.resultRow}>
                        <strong>Total separado mensalmente:</strong>
                        <span>R$ {monthlySavings.toFixed(2)}</span>
                    </div>

                    <div style={styles.resultRow}>
                        <strong>Em {months} meses você terá:</strong>
                        <span style={styles.total}>R$ {projection}</span>
                    </div>

                    <div style={styles.smallInfo}>
                        * Valores incluem ajuste de férias e 13º salário.
                    </div>
                </div>
            </div>
        </ReaderLayout>
    );
}

const styles = {
    page: {
        padding: 24,
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        color: "#7D5BA6",
    },
    card: {
        background: "#fff",
        padding: 18,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        marginBottom: 18,
    },
    row: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16,
        width: "100%",
    },

    field: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },

    input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "10px",
        border: "1px solid #d2cde8",
        background: "#F7F3FF",
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box",
    },

    select: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "10px",
        border: "1px solid #d2cde8",
        background: "#F7F3FF",
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box",
    },

    subtitle: {
        marginBottom: 12,
        color: "#7D5BA6",
        fontSize: 18,
        fontWeight: 600,
    },
    resultRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
        fontSize: 16,
    },
    total: {
        color: "#4caf50",
        fontWeight: "bold",
    },
    smallInfo: {
        fontSize: 13,
        color: "#666",
        marginTop: 10,
    },
};
