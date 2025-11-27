import AppRoutes from "./presentation/routes/AppRoutes.jsx";
import { AuthProvider } from "./presentation/contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
