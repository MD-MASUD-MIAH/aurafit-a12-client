// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TrainerTeam = () => {
  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Head Strength Coach",
      bio: "With 10+ years in competitive powerlifting, Sarah specializes in strength training and functional movement. She's helped 200+ clients achieve their strength goals.",
      expertise: ["Powerlifting", "Functional Training", "Injury Prevention"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "HIIT & Conditioning Specialist",
      bio: "Former collegiate athlete turned certified personal trainer, Marcus creates high-energy workouts that maximize fat loss while preserving muscle mass.",
      expertise: ["HIIT", "Metabolic Conditioning", "Sports Performance"],
      image:
        "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Yoga & Mobility Coach",
      bio: "E-RYT 500 certified yoga instructor with a background in physical therapy. Elena focuses on mobility, recovery, and mind-body connection.",
      expertise: ["Vinyasa Yoga", "Restorative Yoga", "Myofascial Release"],
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
             <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <img
            src={trainers.photo}
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
              {trainers.status === "pending"
                ? "New Trainer"
                : "Available Now"}
            </p>
          </div>
          <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
            Meet {trainers.fullName}
          </h5>
          <div className="mb-5 text-gray-800">
            <p className="mb-3">
              <span className="font-bold">{trainers.experience} years</span>{" "}
              of training experience
            </p>
            <p className="mb-3">
              <span className="font-bold">Availability:</span>{" "}
              {trainers.availableDays?.join(", ")}
            </p>
            <p className="mb-3">
              <span className="font-bold">Time Slots:</span>{" "}
              {trainers.timeSlots?.join(", ")}
            </p>
            <p className="mb-3">
              <span className="font-bold">Bio:</span>{" "}
              {trainers.bio || "Professional fitness trainer"}
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
