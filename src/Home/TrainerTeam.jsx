/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../shared/Loader";

const TrainerTeam = () => {
  const { isPending, data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-trainers`
      );
      return res.data;
    },
  });

  console.log(trainers);

  if (isPending) {
    return <Loader></Loader>;
  }
  return (
    <section className="py-16 px-4 md:px-0">
      <div className="w-11/12 overflow-hidden mx-auto">
        <div className="text-center mb-12">
          <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
            Meet Our Expert Trainers
          </h2>
          <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
            Certified professionals dedicated to helping you achieve your
            fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1  gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-full mx-auto bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div
                data-aos="fade-up"
                className={`flex flex-col overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm sm:mx-auto
      ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Image Section - Golden Ratio Width (38.2%) */}
                <div className="relative lg:w-[38.2%]">
                  <img
                    src={trainer.photo}
                    alt={`Portrait of ${trainer.fullName}, professional trainer`}
                    loading="lazy"
                    className="object-cover w-full lg:absolute h-80 lg:h-full"
                  />
                  {/* Diagonal separator with golden ratio angle */}
                </div>

                {/* Content Section - Golden Ratio Width (61.8%) */}
                <div className="flex flex-col justify-center p-6 bg-white lg:p-10 lg:pl-12 lg:w-[61.8%]">
                  <div>
                    <p className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-white uppercase rounded-full bg-[#3B82F6]">
                      <span className="mr-2">🏆</span>
                      Specialist: {trainer.skills.join(", ")}
                    </p>
                  </div>

                  <h5 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                    {trainer.fullName}
                  </h5>

                  <div className="mb-6 text-gray-700 space-y-3">
                    <p className="flex items-start">
                      <span className="inline-block mr-2 text-teal-600">
                        ⏳
                      </span>
                      <span>
                        <span className="font-bold">
                          {trainer.experience} years
                        </span>{" "}
                        of training experience
                      </span>
                    </p>

                    <p className="flex items-start">
                      <span className="inline-block mr-2 text-[#2563EB]">
                        📅
                      </span>
                      <span>
                        <span className="font-bold">Availability:</span>{" "}
                        {trainer.availableDays?.join(", ") || "Flexible"}
                      </span>
                    </p>

                    <p className="flex items-start">
                      <span className="inline-block mr-2 text-teal-600">
                        ⏰
                      </span>
                      <span>
                        <span className="font-bold">Time Slots:</span>{" "}
                        {trainer.timeSlots?.join(", ") || "Various times"}
                      </span>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="flex">
                      <span className="inline-block mr-2 text-teal-600">
                        📝
                      </span>
                      <span className="italic">
                        "
                        {trainer.bio ||
                          "Dedicated to helping clients achieve their fitness goals through personalized training programs."}
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainerTeam;
