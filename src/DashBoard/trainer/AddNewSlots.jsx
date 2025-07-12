import { useQuery } from "@tanstack/react-query";
import {
  FaAlignLeft,
  FaCalendarAlt,
  FaCamera,
  FaChalkboardTeacher,
  FaClock,
  FaEnvelope,
  FaHistory,
  FaListUl,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader";
const AddNewSlots = () => {
  const { user } = useAuth();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/slots/${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  console.log(trainer);

  return (
    <div>
    
    </div>
  );
};

export default AddNewSlots;
