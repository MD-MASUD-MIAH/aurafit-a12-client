// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TeamPost = () => {
  // Demo data - replace with real data from your CMS/backend
  const recentPosts = [
    {
      id: 1,
      title: "How I Improved My 5K Time in 30 Days",
      excerpt:
        "Sharing my training regimen and nutrition plan that helped me shave 2 minutes off my personal best...",
      author: "MarathonMike92",
      date: "May 15, 2023",
      category: "Running",
      url: "/forum/running/improve-5k-time",
    },
    {
      id: 2,
      title: "Essential Strength Exercises for Cyclists",
      excerpt:
        "These 5 exercises transformed my cycling performance and reduced injury risk...",
      author: "PedalPower",
      date: "May 12, 2023",
      category: "Cycling",
      url: "/forum/cycling/strength-exercises",
    },
    {
      id: 3,
      title: "Plant-Based Nutrition for Muscle Growth",
      excerpt:
        "My complete guide to building muscle on a vegan diet with meal plans and supplement tips...",
      author: "VeganGains",
      date: "May 10, 2023",
      category: "Nutrition",
      url: "/forum/nutrition/plant-based-muscle",
    },
    {
      id: 4,
      title: "Recovering from ACL Injury - My Journey",
      excerpt:
        "Month-by-month breakdown of my rehabilitation process and what worked best...",
      author: "ComebackQueen",
      date: "May 8, 2023",
      category: "Injury Prevention",
      url: "/forum/injury/acl-recovery",
    },
    {
      id: 5,
      title: "Best Budget Fitness Trackers 2023",
      excerpt:
        "Comparing features and accuracy of trackers under $100 based on 3 months of testing...",
      author: "TechFit",
      date: "May 5, 2023",
      category: "Gear Reviews",
      url: "/forum/gear/budget-trackers",
    },
    {
      id: 6,
      title: "Morning vs Evening Workouts - Science Breakdown",
      excerpt:
        "Examining the latest research on optimal training times for different goals...",
      author: "ScienceOfFit",
      date: "May 3, 2023",
      category: "Training Science",
      url: "/forum/science/timing-workouts",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="w-11/12 overflow-hidden mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Community Discussions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Recent forum posts from our fitness community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded-full">
                    {post.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  <a
                    href={post.url}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    @{post.author}
                  </span>
                  <a
                    href={post.url}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPost;
