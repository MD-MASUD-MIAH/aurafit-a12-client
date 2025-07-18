import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../shared/Loader";
import AlltrainerCard from "./AlltrainerCard";
import { PageName } from "./PageName";

const AllTrainer = () => {
  PageName("AllTrainer");
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

 

  return (
    <div>
      <div className="text-center w-11/12 mx-auto mb-12">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 my-4">
          All Trainers at a Glance
        </h2>
        <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
          Explore our team of certified, passionate, and experienced fitness
          professionals. Whether you're aiming to build strength, improve
          flexibility, lose weight, or stay active
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 mx-auto gap-5 pb-10 overflow-hidden">
        {allTrainer.map((res) => (
          <AlltrainerCard key={res._id} trainerData={res}></AlltrainerCard>
        ))}
      </div>
    </div>
  );
};

export default AllTrainer;
