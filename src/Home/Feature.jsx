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
    <section className="pt-16 pb-2 px-4 md:px-0 lg:px-0   overflow-hidden  w-11/12 mx-auto">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
            Your Complete Fitness Companion
          </h2>
          <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
            Everything you need to achieve your health and fitness goals in one
            place
          </p>
        </div>

        <div
          data-aos="fade-right"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
        >
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
