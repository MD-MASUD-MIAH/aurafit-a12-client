import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/Loader";
import AlltrainerCard from "./AlltrainerCard";

const AllTrainer = () => {
  const {
    isPending,
    isError,
    data: allTrainer = [],
  } = useQuery({
    queryKey: ["allTrainer"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trainer`);
      return res?.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  if (isError) {
    return console.log("error");
  }

  console.log(allTrainer);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-11/12 mx-auto gap-5 py-20 overflow-hidden">
      {allTrainer.map((res) => (
        <AlltrainerCard key={res._id} trainerData={res}></AlltrainerCard>
      ))}
    </div>
  );
};

export default AllTrainer;
