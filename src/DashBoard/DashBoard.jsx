// RoleBasedDashboardRedirect.jsx
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../shared/Loader";

const RoleBasedDashboardRedirect = () => {
  const { role, isRoleLoading } = useRole();
  console.log(isRoleLoading);
  
  if (isRoleLoading) return <Loader></Loader>;

  if (role === "admin") return <Navigate to="/dashboard/balance" />;
  if (role === "trainer") return <Navigate to="/dashboard/menageSlots" />;
  if (role === "member") return <Navigate to="/dashboard/my-profile" />;

  return <Navigate to="/login" />; // fallback in case of unexpected role
};

export default RoleBasedDashboardRedirect;
