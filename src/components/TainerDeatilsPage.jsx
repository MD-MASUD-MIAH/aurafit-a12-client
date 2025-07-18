import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router";
import Loader from "../shared/Loader";
import { PageName } from "./PageName";
const TainerDeatilsPage = () => {
  const { id } = useParams();

  PageName("Booking Slot");

  const { isPending, data: singleData = {} } = useQuery({
    queryKey: ["singleData", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/${id}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loader />;
  }

  

  return (
    <div className="w-11/12 mx-auto md:p-6 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Trainer Profile */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <img
                className="w-48 h-48 object-cover rounded-full border-4 border-blue-100"
                src={singleData?.photo}
                alt={singleData?.fullName}
              />
              <div
                className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  singleData.status === "pending"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {singleData.status}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
              {singleData?.fullName}
            </h2>
            <p className="text-gray-600">{singleData?.age} years old</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">Experience:</span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-500 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {singleData.experience} years
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {singleData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold mb-2">Contact</h3>
              <a
                href={`mailto:${singleData?.email}`}
                className="text-blue-600 hover:underline break-all"
              >
                {singleData?.email}
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-gray-700">"{singleData.bio}"</p>
            </div>
          </div>
        </div>

        {/* Right Column - Skills & Availability */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Skills Section */}

          <div className="space-y-6">
            {/* Availability Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Available slots You Can Book Now
              </h3>

              <div className="grid grid-cols-2  gap-2">
                {singleData.timeSlots.map((slot, i) => (
                  <Link
                    to={`/book/${singleData._id}?slot=${encodeURIComponent(
                      slot
                    )}`}
                    key={i}
                    className="flex items-center bg-gray-50 px-3 py-2 rounded tom-btn"
                  >
                    <button className="w-2 h-2 bg-blue-500 rounded-full mr-2"></button>
                    <span className="text-white text-sm">{slot}</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Max Classes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Capacity</h3>
              <p className="text-gray-700">
                Maximum classes per day:{" "}
                <span className="font-bold text-blue-600">
                  {singleData.maxClassesPerDay}
                </span>
              </p>
            </div>
          </div>

          <div className=" space-y-6 w-11/12 mx-auto py-4  ">
            <h1 className="font-bold">
              Share your passion, empower people, and build your fitness career
              with Aurafit. Apply now to become one of our certified trainers!
            </h1>
            <Link
              to="/beTrainer"
              className="tom-btn w-full text-center flex items-center justify-center"
            >
              Become a Trainer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TainerDeatilsPage;
