
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from "./pages/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import NoMatch from "./pages/noMatch/NoMatch"
import PostUser from "./pages/employee/PostUser";
import UpdateUser from "./pages/employee/UpdateUser";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/employee" element={
          <ProtectedRoute>
            <PostUser />
          </ProtectedRoute>
        } />
        <Route path="/employee/:id" element={
          <ProtectedRoute>
            <UpdateUser />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
