import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const Testimonials = () => {
  // Demo data
  const demoReviews = [
    {
      id: 1,
      userName: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      comment:
        "This fitness tracker changed my life! I lost 15kg in 3 months following the personalized workouts.",
      date: "2 days ago",
    },
    {
      id: 2,
      userName: "Sarah Miller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      comment:
        "Love the sleep tracking feature. Helped me improve my sleep quality significantly.",
      date: "1 week ago",
    },
    {
      id: 3,
      userName: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      comment:
        "The nutrition tracking is so accurate. Makes meal planning effortless!",
      date: "2 weeks ago",
    },
    {
      id: 4,
      userName: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      comment:
        "Best fitness app Ive ever used. The heart rate monitoring is extremely precise.",
      date: "3 weeks ago",
    },
    {
      id: 5,
      userName: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4,
      comment:
        "Great variety of workout plans. I never get bored with my routines anymore.",
      date: "1 month ago",
    },
    {
      id: 6,
      userName: "Olivia Taylor",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 5,
      comment:
        "The progress reports are so motivating! I can actually see my improvements over time.",
      date: "1 month ago",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews] = useState(demoReviews);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= reviews.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, reviews.length - 3) : prevIndex - 1
    );
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  // Fill with empty cards if less than 3 reviews
  while (visibleReviews.length < 3 && visibleReviews.length > 0) {
    visibleReviews.push({ empty: true });
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-11/12 mx-auto overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Member Reviews
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            What people say about our fitness tracker
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              <AnimatePresence mode="wait">
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={review.id || `empty-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full ${
                      review.empty ? "invisible" : ""
                    }`}
                  >
                    {!review.empty && (
                      <>
                        <div className="flex items-center mb-4">
                          <img
                            src={review.avatar}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              {review.userName}
                            </h4>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {reviews.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous reviews"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next reviews"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
