import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Loader from "../shared/Loader";

const ForumsPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch posts and inject userVote
  const {
    isPending,
    data: postData = [],
    refetch,
  } = useQuery({
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

  // Handle Vote
  const voteMutation = useMutation({
    mutationFn: async ({ postId, voteType }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/forums/${postId}/vote`,
        { voteType, userEmail: user.email },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["forums"]);
      refetch();

      if (data.message === "Vote removed") {
        toast.success("🗑️ Vote removed!");
      } else if (data.message === "Vote added") {
        toast.success("✅ Vote recorded!");
      } else if (data.message === "Vote switched") {
        toast.success("🔁 Vote changed!");
      } else {
        toast.success(data.message || "✅ Vote updated!");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "❌ Failed to vote");
    },
  });

  const handleVote = (postId, voteType) => {
    if (!user?.email) {
      toast.error("Please login to vote");
      return;
    }
    voteMutation.mutate({ postId, voteType });
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postData?.slice(indexOfFirstPost, indexOfLastPost) || [];
  const totalPages = Math.ceil(postData?.length / postsPerPage) || 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (isPending) {
    return <Loader />;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Post Header */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {post.authorImage ? (
                      <img
                        src={post.authorImage}
                        alt={post.authorName}
                        className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <FaUser className="text-gray-500 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                        {post.authorName}
                      </p>
                      <span
                        className={`py-0.5 px-2 rounded-full text-xs font-semibold ${
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

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-5 pb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <Link
                  to={`/forums/${post._id}`}
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Post Footer */}
              <div className="px-5 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 justify-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Cast your vote</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(post._id, "upvote")}
                      disabled={voteMutation.isLoading}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition
                        ${
                          post.userVote === "upvote"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      <FaThumbsUp />
                      <span>{post.upvoteCount || 0}</span>
                    </button>

                    <button
                      onClick={() => handleVote(post._id, "downvote")}
                      disabled={voteMutation.isLoading}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition
                        ${
                          post.userVote === "downvote"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      <FaThumbsDown />
                      <span>{post.downvoteCount || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {postData?.length > postsPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForumsPage;
