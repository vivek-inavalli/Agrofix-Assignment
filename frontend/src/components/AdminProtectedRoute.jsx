import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminProtectedRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
