import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DashBoard from "./pages/DashBoard.jsx"
import Create from "./pages/Create.jsx"
import Update from "./pages/Update.jsx"
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function Logout() {
    localStorage.clear();
    return <Navigate to="/" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
  return (
      <BrowserRouter>
          <Routes>
                <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <DashBoard />
                      </ProtectedRoute>
                  }
                />
                <Route
                  path="/create"
                  element={
                      <ProtectedRoute>
                          <Create />
                      </ProtectedRoute>
                  }
                />
                <Route
                  path="/update"
                  element={
                      <ProtectedRoute>
                          <Update />
                      </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App