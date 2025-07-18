import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";


import { PageName } from "../../components/PageName";
import Loader from "../../shared/Loader";
import FindTrainer from "./FindTrainer";

import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const BookedTrainer = () => {
  const { user } = useAuth();
  PageName("Booked Trainer");

  const axiosSecure = useAxiosSecure()
  
  const { isPending, data: booked = [] } = useQuery({
    queryKey: ["booked", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/booked/${user.email}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  console.log(booked);

  return (
    <div>
      {" "}
      <div className="text-center md:mb-10 md:my-0 my-20">
        {/* Header */}
        <div className="text-center w-11/12 mx-auto">
          <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
            Detailed Trainer Booking Information
          </h2>
          <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
            Explore a comprehensive view of all your trainer bookings in one
            place. This section provides detailed information about each
            session,
          </p>
        </div>
      </div>
      {booked.length === 0 ? (
        <div className="w-11/12 mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Empty state illustration */}
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                No Booking Found
              </h2>

              <p className="text-gray-600 max-w-md">
                It looks like you haven't made any bookings yet or your booking
                details couldn't be loaded.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {/* Browse trainers button */}
                <Link
                  to="/allTrainer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Browse Trainers
                </Link>

                {/* Refresh button */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {booked?.map((bookingData) => (
            <FindTrainer
              key={bookingData._id}
              bookingData={bookingData}
            ></FindTrainer>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
