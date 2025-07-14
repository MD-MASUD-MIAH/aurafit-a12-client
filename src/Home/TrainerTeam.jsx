/* eslint-disable no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import Aos from "aos";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../shared/Loader";

const TrainerTeam = () => {
  Aos.init({
    duration: 1000,
    once: false,
  });

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
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-11/12 overflow-hidden mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Meet Our Expert Trainers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Certified professionals dedicated to helping you achieve your
            fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1  gap-8">
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl  overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
                className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded s lg:flex-row sm:mx-auto"
              >
                <div className="relative lg:w-1/2">
                  <img
                    src={trainer.photo}
                    alt=""
                    className="object-cover w-full lg:absolute h-80 lg:h-full"
                  />
                  <svg
                    className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
                    viewBox="0 0 20 104"
                    fill="currentColor"
                  >
                    <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
                  <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                      Specialist : {trainer.skills.join(",")}
                    </p>
                  </div>
                  <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                    Meet {trainer.fullName}
                  </h5>
                  <div className="mb-5 text-gray-800">
                    <p className="mb-3">
                      <span className="font-bold">
                        {trainer.experience} years
                      </span>{" "}
                      of training experience
                    </p>
                    <p className="mb-3">
                      <span className="font-bold">Availability:</span>{" "}
                      {trainer.availableDays?.join(", ")}
                    </p>
                    <p className="mb-3">
                      <span className="font-bold">Time Slots:</span>{" "}
                      {trainer.timeSlots?.join(", ")}
                    </p>
                    <p className="mb-3">
                      <span className="font-bold">Bio:</span>{" "}
                      {trainer.bio || "Professional fitness trainer"}
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
