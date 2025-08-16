// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: delay * 0.1 }}
  data-aos="fade-up"
  data-aos-delay={delay * 100}
  data-aos-once="false"
  className="relative bg-white  p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border-l-4 border-blue-500 overflow-hidden group"
>
  {/* Animated background element */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white  opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
  
  {/* Icon container with pulse effect */}
  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
    <span className="text-3xl">{icon}</span>
    {/* Subtle pulse animation */}
    <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-xl font-bold mb-3  text-gray-800 group-hover:text-blue-600  transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600  text-sm leading-relaxed">
      {description}
    </p>
  </div>

  {/* Learn more link */}
  
</motion.div>
  );
};

export default FeatureCard;