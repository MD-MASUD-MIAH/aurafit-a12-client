import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCalendarAlt, FaFire } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../shared/Loader";
const FeaturedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: bookedData = [] } = useQuery({
    queryKey: ["bookedData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/totalbooked");
      return res.data;
    },
  });
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-booked-classes`
      );
      return res.data;
    },
  });

  console.log(classes);

  console.log(bookedData);

  if (isPending) {
    return <Loader></Loader>;
  }
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
      {/* Section Header */}
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaFire className="text-orange-500 mr-2" />
              Top Booked Classes
            </h2>
            <p className="text-gray-500 mt-1">
              Our community's favorite workouts
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-full shadow-sm">
            <p className="text-gray-700 font-medium flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              Total Booked:{" "}
              <span className="text-blue-600 ml-1 font-bold">
                {bookedData.length}
              </span>
            </p>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes?.map((classItem) => (
            <div
              data-aos="zoom-in-down"
              key={classItem._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Class Image */}
              <div className="relative pb-[56.25%] overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.className}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>

              {/* Class Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {classItem.skillName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {classItem.details}
                </p>

                {/* Footer with booking count */}
                <div className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span className="font-medium">
                      {classItem?.bookingCount || 0} bookings
                    </span>
                  </div>
                  <Link
                    to={"/allClass"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Join Class
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;
