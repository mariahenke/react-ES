import React, { useEffect, useContext, useState} from "react";
import ExpenseChart from "../components/ExpenseChart";
import ExpensesAside from "../components/ExpensesAside";
import { AuthContext } from "../contexts/AuthContext";

import ReaderLayout from "../../presentation/components/RenderLayout";

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const [refreshExpenses, setRefreshExpenses] = useState(0);


  if (loading) {
    return <div style={{ padding: 20 }}>Carregando...</div>;
  }

  if (!user) {
    return <div style={{ padding: 20 }}>Usuário não autenticado.</div>;
  }

  return (
    <ReaderLayout user={user} onLogout={() => authService.logout()}>
      <div style={styles.pageContent}>
        <main style={styles.main}>
          <ExpenseChart refresh={refreshExpenses}/>
        </main>

        <ExpensesAside onChange={() => setRefreshExpenses(r => r + 1)} />
      </div>
    </ReaderLayout>
  );
}

const styles = {
  pageContent: {
    display: "flex",
    flex: 1,
    height: "100vh", // garante altura total sem scroll
    overflow: "hidden", // impede scroll na página inteira
  },

  main: {
    flex: 1,
    padding: "24px",
    // overflowY: "auto",
  },
};
