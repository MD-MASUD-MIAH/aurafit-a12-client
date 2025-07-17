// RoleBasedDashboardRedirect.jsx
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const RoleBasedDashboardRedirect = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (role === "admin") return <Navigate to="/dashboard/balance" />;
  if (role === "trainer") return <Navigate to="/dashboard/menageSlots" />;
  if (role === "member") return <Navigate to="/dashboard/my-profile" />;

  return <Navigate to="/login" />; // fallback in case of unexpected role
};

export default RoleBasedDashboardRedirect;
