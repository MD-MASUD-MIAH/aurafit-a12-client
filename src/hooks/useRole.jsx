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
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user.email}`);
      return res.data?.role; // directly return 'admin' / 'trainer' / 'member'
    },
  });

  // Optional: Debug logs
  // console.log("useRole ->", { role: data, isRoleLoading, isError, error });

  return { role: data, isRoleLoading, isError, error };
};

export default useRole;
