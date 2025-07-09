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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {trainer.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{trainer.role}</p>
                </div>
                <p className="text-gray-600 mb-5">{trainer.bio}</p>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.expertise.map((item, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
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
