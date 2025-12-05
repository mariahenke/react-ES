import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";

import ResetPasswordEmail from "../pages/ResetPasswordEmail.jsx";
import ResetPasswordCode from "../pages/ResetPasswordCode.jsx";
import ResetPasswordNew from "../pages/ResetPasswordNew.jsx";
import FinancialGoals from "../pages/FinancialGoals.jsx";
import User from "../pages/UserPage.jsx";
import Simulation from "../pages/SimulationPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password" element={<ResetPasswordEmail />} />
        <Route path="/reset-password/code" element={<ResetPasswordCode />} />
        <Route path="/reset-password/new" element={<ResetPasswordNew />} />
        <Route path="/goals" element={<FinancialGoals />} />
        <Route path="/user" element={<User />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}
