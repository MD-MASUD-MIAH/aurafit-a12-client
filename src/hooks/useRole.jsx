import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading: isRoleLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`);
      return res.data?.role; 
    },
  });

 console.log("user:", user);
console.log("auth loading:", loading);
console.log("query enabled:", !loading && !!user?.email);
console.log("isRoleLoading:", isRoleLoading);

  return { role: data, isRoleLoading, isError, error,refetch };
};

export default useRole;
