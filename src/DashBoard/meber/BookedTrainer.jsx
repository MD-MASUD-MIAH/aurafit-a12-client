import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

import FindTrainer from "./FindTrainer";
import axios from "axios";
import Loader from "../../shared/Loader";


const BookedTrainer = () => {
  const { user } = useAuth();

  
 const { data: booked = [], } = useQuery({
  queryKey: ["booked", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/booked/${user.email}`);
    return res.data;
  },
});




  console.log(booked);
  

  return (
    <div> <div className="text-center mb-10">
        {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-8">
        Trainer Booking Details
      </h1>
       
      </div>

     {
        booked?.map(bookingData=><FindTrainer key={bookingData._id}  bookingData={bookingData}></FindTrainer>)
     }
    </div>
  );
};

export default BookedTrainer;
