import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/classes`, data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "New class added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add class.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Class Name */}
        <div>
          <label className="block mb-1 font-medium">Class Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Yoga for Beginners"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter image URL"
          />
        </div>

        {/* Class Details */}
        <div>
          <label className="block mb-1 font-medium">Class Description</label>
          <textarea
            {...register("details", { required: true })}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Describe the class"
          ></textarea>
        </div>

        {/* Optional: Extra Info */}
        <div>
          <label className="block mb-1 font-medium">Additional Info (optional)</label>
          <input
            type="text"
            {...register("extraInfo")}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., duration, level, equipment needed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
