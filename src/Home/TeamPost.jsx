import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router"; // fixed typo

import useAuth from "../hooks/useAuth";
import Loader from "../shared/Loader";

const TeamPost = () => {
  const { user } = useAuth();

  // ✅ Fetch posts and inject userVote
  const { isPending, data: postData = [] } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/forums`);
      const rawPosts = res?.data;

      const postsWithUserVote = rawPosts.map((post) => {
        const vote = post.voters?.find((v) => v.userEmail === user?.email);
        return {
          ...post,
          userVote: vote?.voteType || null,
        };
      });

      return postsWithUserVote;
    },
  });

  // ✅ Handle Vote

  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Latest Conversations in the Forum
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with recent discussions from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postData?.slice(0, 6).map((post) => (
            <div
              key={post._id}
              className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              {/* Header with author info */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      post.authorImage ||
                      "https://i.ibb.co/1tqTQbmM/images-3.jpg"
                    }
                    alt={post.authorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {post.authorName}
                      </span>
                      <span
                        className={`py-1 px-3 rounded-full uppercase text-xs font-semibold ${
                          post.authhorRole === "admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : post.authhorRole === "trainer"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {post.authhorRole}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Post content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Footer with action button */}
              <div className="px-6 pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400"></span>
                  <Link to={`/forums/${post._id}`} className="tom-btn">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPost;
