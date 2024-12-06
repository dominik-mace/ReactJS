import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FormPage from "./components/Forma";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminPage";
import './App.css'

const App = () => {
  const isAdmin = localStorage.getItem("jeAdmin");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
