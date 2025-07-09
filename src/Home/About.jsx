import AOS from "aos";
import "aos/dist/aos.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section className="pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 ">
      <div className="w-11/12 overflow-hidden mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Fitness Philosophy
          </h2>
          <div className="mt-4 h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering your health journey through technology and science
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            data-aos="fade-right"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="https://i.ibb.co/B2XZK3pz/fitness-friends-gym-portrait-by-happy-relax-proud-group-ready-training-fitness-challenge-personal-tr.jpg"
              alt="Our fitness team"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-blue-500 opacity-10" />
          </motion.div>

          {/* Right Column - Text */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">
                  🏆
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Founded in 2020
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Born from a passion to make advanced fitness tracking
                  accessible to everyone.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">
                  🌎
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  500,000+ Users Worldwide
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Helping people across 45 countries achieve their fitness
                  goals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl">
                  🔬
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Science-Backed Methods
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our algorithms are developed with sports scientists and
                  nutritionists.
                </p>
              </div>
            </div>

            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Meet Our Team →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
