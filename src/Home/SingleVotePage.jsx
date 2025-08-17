import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const fetchForumPost = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/forumSingle/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const ForumPostPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch post by ID
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forumPost", id],
    queryFn: () => fetchForumPost(id),
    enabled: !!id,
  });

  // Vote Mutation
  const voteMutation = useMutation({
    mutationFn: async (voteType) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/forums/${id}/vote`,
        {
          voteType,
          userEmail: user?.email,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["forumPost", id]);

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

  const handleVote = (voteType) => {
    if (!user?.email) {
      toast.error("Please login to vote");
      return;
    }

    voteMutation.mutate(voteType);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!post) return <p>No post found.</p>;

  // Detect user vote
  const userVote =
    post.voters?.find((v) => v.userEmail === user?.email)?.voteType || null;

  return (
    <div className="w-full px-4 md:w-11/12 mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-6">
      <div className="w-full max-w-3xl p-4 md:p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 ">
        {/* Author Info - Stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={post.authorImage || "https://i.ibb.co/1tqTQbmM/images-3.jpg"}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 ">
                  {post.authorName}
                </span>
                <span className="text-xs px-2 py-0.5 bg-blue-100  text-blue-800  rounded-full">
                  {post.authhorRole || "member"}
                </span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500  sm:ml-auto">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Post Content */}
        <h1 className="text-xl md:text-3xl font-bold text-gray-800  mb-3">
          {post.title || "Best Bodyweight Workouts for Busy Schedules"}
        </h1>
        <p className="text-gray-600  mb-6 leading-relaxed">
          {post.description ||
            "My daily routine is hectic, and I barely get time to visit the gym. I…"}
        </p>

        {/* Voting Section - Stack buttons on small screens */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
          <button
            onClick={() => handleVote("upvote")}
            disabled={voteMutation.isLoading}
            className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 flex-1
          ${voteMutation.isLoading ? "opacity-70 cursor-not-allowed" : ""}
          ${
            userVote === "upvote"
              ? "bg-green-500 text-white shadow-lg sm:transform sm:scale-105"
              : "bg-gray-100  text-gray-800  hover:bg-green-50 "
          }`}
          >
            <span className="text-lg">👍</span>
            <span className="whitespace-nowrap">Upvote</span>
            <span className="font-bold">{post.upvoteCount || 0}</span>
            {userVote === "upvote" && (
              <span className="ml-1 text-xs animate-pulse">✓</span>
            )}
          </button>

          <button
            onClick={() => handleVote("downvote")}
            disabled={voteMutation.isLoading}
            className={`px-4 py-3 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 flex-1
          ${voteMutation.isLoading ? "opacity-70 cursor-not-allowed" : ""}
          ${
            userVote === "downvote"
              ? "bg-red-500 text-white shadow-lg sm:transform sm:scale-105"
              : "bg-gray-100  text-gray-800  hover:bg-red-50 "
          }`}
          >
            <span className="text-lg">👎</span>
            <span className="whitespace-nowrap">Downvote</span>
            <span className="font-bold">{post.downvoteCount || 1}</span>
            {userVote === "downvote" && (
              <span className="ml-1 text-xs animate-pulse">✓</span>
            )}
          </button>
        </div>

        {/* Stats - Stack on mobile */}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span>
            Total votes: {(post.upvoteCount || 0) + (post.downvoteCount || 1)}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            {post.upvoteCount || 0 > (post.downvoteCount || 1)
              ? "👍 Positive community rating"
              : "👎 Needs improvement"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumPostPage;
