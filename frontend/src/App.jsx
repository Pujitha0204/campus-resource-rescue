import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddResource from "./pages/AddResource";
import Resources from "./pages/Resources";
import Requests from "./pages/Requests";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <nav>
        {!user && (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {" | "}
            <Link to="/resources">Resources</Link>
            {" | "}
            <Link to="/add-resource">Add Resource</Link>
            {" | "}
            <Link to="/requests">Requests</Link>

            {user.role === "ADMIN" && (
              <>
                {" | "}
                <Link to="/admin">Admin</Link>
              </>
            )}
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "ADMIN" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-resource"
          element={
            <ProtectedRoute>
              <AddResource />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;