// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiActivity, FiAward, FiClock, FiHeart, FiUser } from "react-icons/fi";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://i.ibb.co/JRY9CpFg/675c8f2a46f9748ac270d1a2-landscap-011-1775p.jpg",
    "https://i.ibb.co/vt9LKTZ/65d3674df1397c34b67e7e9a-IMG-8049.jpg",
    "https://i.ibb.co/NdJH3TkT/VEN06242-min-2048x1365-CZSg-I9qf.jpg",
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-full md:h-[calc(100vh-150px)]">
      {/* Background images with fade transition */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt={`Fitness ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-black/20" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8 flex py-30">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Transform Your{" "}
                <span className="text-[#2563EB]">Fitness Journey</span>
              </h1>
              <p className="text-lg md:text-xl text-white mb-8">
                Track your progress, smash your goals, and become the best
                version of yourself.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
                >
                  Get Started - It's Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 shadow-lg transition-all duration-300"
                >
                  Explore Plans
                </motion.button>
              </div>

              {/* Icons Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex flex-wrap gap-6 "
              >
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <FiUser className="text-[#2563EB] text-xl" />
                  </div>
                  <span>Personalized Plans</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <FiActivity className="text-[#2563EB] text-xl" />
                  </div>
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <FiAward className="text-[#2563EB] text-xl" />
                  </div>
                  <span>Expert Guidance</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="hidden lg:block lg:w-1/2 pl-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Today's Featured Workout
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#2563EB]/20 p-3 rounded-full">
                  <FiClock className="text-[#2563EB] text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">
                    High Intensity Interval
                  </h4>
                  <p className="text-white/80">30 min • 450 kcal</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#2563EB]/20 p-3 rounded-full">
                  <FiHeart className="text-[#2563EB] text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Beginner Yoga Flow</h4>
                  <p className="text-white/80">45 min • 280 kcal</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300">
                Join Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-white text-center"
            >
              <p className="text-sm opacity-80">
                Trusted by fitness enthusiasts worldwide
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold">AF</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold">FC</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold">GF</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated pulse element */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg
          className="w-8 h-8 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
