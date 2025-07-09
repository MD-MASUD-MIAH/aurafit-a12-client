import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FeatureCard from "./FeatureCard";

const FitnessFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false, // This makes animations trigger every time
      mirror: true, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const features = [
    {
      icon: "🧭", // or "🚶‍♂️" for walking
      title: "Activity Tracking",
      description: "Monitor steps, distance & calories burned with precision",
      alternatives: ["🦶", "🧭"], // Footprint or compass
    },
    {
      icon: "❤️", // or "💗" (growing heart)
      title: "Heart Rate Monitor",
      description: "24/7 heart rate tracking with health insights",
      alternatives: ["📈", "🧫"], // Chart or test tube
    },
    {
      icon: "🌙", // or "🛏️" (bed)
      title: "Sleep Analysis",
      description: "Understand your sleep patterns and quality",
      alternatives: ["⏰", "😴"], // Clock or sleeping face
    },
    {
      icon: "💪", // or "🏅" (medal)
      title: "Workout Plans",
      description: "Personalized training programs for all levels",
      alternatives: ["🧘‍♀️", "🏊‍♂️"], // Yoga or swimming
    },
    {
      icon: "🥗", // or "🍽️" (fork and knife)
      title: "Nutrition Tracking",
      description: "Log meals and monitor macros with our food database",
      alternatives: ["🥦", "🧂"], // Broccoli or salt
    },
    {
      icon: "📈", // or "📉"
      title: "Progress Reports",
      description: "Visualize your fitness journey with detailed analytics",
      alternatives: ["📋", "✏️"], // Clipboard or pencil
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white  overflow-hidden  w-11/12 mx-auto">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Your Complete Fitness Companion
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to achieve your health and fitness goals in one
            place
          </p>
        </div>

        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index % 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitnessFeatures;
