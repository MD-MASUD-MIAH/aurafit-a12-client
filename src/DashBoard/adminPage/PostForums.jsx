import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { PageName } from "../../components/PageName";

const PostForums = () => {
  const { user } = useAuth();
  PageName('Post Forums')
  const { data: userData } = useQuery({
    queryKey: ["trainerOrAdmin", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainers-and-admins/${user.email}`
      );
      return res.data;
    },
  });

  console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const postData = {
      title: data.get("title"),
      description: data.get("description"),
      authorImage: userData.image,
      authorName: userData.name,
      authhorRole: userData.role,
      createdAt: new Date().toISOString(),
    };
    console.log(postData);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/forums`, postData)
      .then((res) => {
        console.log(res.data);

        Swal.fire({
          title: "Success!",
          text: "Your forum post has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })

      .catch((err) => {
        console.log(err.message);

        Swal.fire({
          title: "❌ Error!",
          text: "Failed to submit the post. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    // Add your submission logic here
  };

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Enter your post content"
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="tom-btn">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForums;
