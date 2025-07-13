import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

import Loader from "../shared/Loader";
import useAuth from "../hooks/useAuth";

const TeamPost = () => {
  const queryClient = useQueryClient();
  const {user} = useAuth()
  // Fetch posts
  const { isPending, data: postData = [] } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/forums`);
      return res?.data;
    },
  });

  // Vote mutation
   const voteMutation = useMutation({
    mutationFn: async ({ postId, voteType }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/forums/${postId}/vote`,
        { voteType, userEmail: user.email },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]);
      toast.success("✅ Vote recorded!");
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
    console.log("📌 Vote sent:", postId, voteType);
  };


  if(isPending){
    return <Loader></Loader>
  }
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="w-11/12 overflow-hidden mx-auto pb-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Community Discussions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Recent forum posts from our fitness community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postData?.map((post) => (
            <div
              key={post._id}
              className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 dark:bg-gray-800 dark:text-gray-300"
            >
              <div className="p-6">
                <header className="flex gap-4">
                  <div>
                    <p className="bg-blue-200 py-1 px-2 rounded-2xl uppercase text-xs mb-2 text-blue-600 dark:bg-blue-800 dark:text-blue-200 inline-block">
                      {post.authhorRole}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {post.authorName}
                    </p>
                    <h3 className="text-xl text-black dark:text-white font-bold">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </header>
              </div>

              <div className="px-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {post.description.slice(0, 150)}{" "}
                  <Link
                    to={`/forums/${post._id}`}
                    className="text-blue-600 dark:text-blue-400 underline text-bold text-sm"
                  >
                    read more
                  </Link>
                </p>
              </div>

              <div className="px-6 py-4">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Community votes
                  </p>

   
                <div className="flex gap-2">
  {/* 👍 Upvote Button */}
  <button
    onClick={() => handleVote(post._id, "upvote")}
    disabled={
      voteMutation.isLoading || post.userVote === "downvote" // block if already downvoted
    }
    className={`px-3 py-1 text-sm rounded-md flex items-center gap-1
      ${post.userVote === "upvote"
        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
      ${post.userVote === "downvote" ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <span>👍</span>
    <span>{post.upvoteCount || 0}</span>
    {post.userVote === "upvote" && <span className="ml-1 font-bold">Voted</span>}
  </button>

  {/* 👎 Downvote Button */}
  <button
    onClick={() => handleVote(post._id, "downvote")}
    disabled={
      voteMutation.isLoading || post.userVote === "upvote" // block if already upvoted
    }
    className={`px-3 py-1 text-sm rounded-md flex items-center gap-1
      ${post.userVote === "downvote"
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
      ${post.userVote === "upvote" ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    <span>👎</span>
    <span>{post.downvoteCount || 0}</span>
    {post.userVote === "downvote" && <span className="ml-1 font-bold">Voted</span>}
  </button>
</div>




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
