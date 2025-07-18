import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utilits/utilits";
import { PageName } from "../../components/PageName";

const AddClass = () => {

  PageName('Add Class')
  const { register, handleSubmit, reset } = useForm();
  const [isImage, setIsImage] = useState("");

  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    
    data.image = isImage;

    try {
      const res = await axiosSecure.post(`/addClass`, data);
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

  const handleChange = async (e) => {
    const image = await imageUpload(e.target.files[0]);

   

    setIsImage(image);
  };

  return (
    <div className=" w-11/12 mx-auto mt-20 md:mt-10">
      <div className="max-w-2xl  mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          <span className="inline-block mr-2">➕</span>
          Add New Fitness Class
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Class Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Needed Skills For Class
            </label>
            <div className="relative">
              <select
                {...register("skillName", { required: true })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  � Select a class type
                </option>
                <option value="Yoga">🧘‍♀️ Yoga</option>
                <option value="HIIT">🔥 HIIT</option>
                <option value="Strength Training">💪 Strength Training</option>
                <option value="Cardio">🏃‍♂️ Cardio</option>
                <option value="Pilates">🌟 Pilates</option>
                <option value="CrossFit">🏋️‍♂️ CrossFit</option>
                <option value="Zumba">💃 Zumba</option>
                <option value="Boxing">🥊 Boxing</option>
                <option value="Martial Arts">🥋 Martial Arts</option>
                <option value="Dance">💃 Dance</option>
                <option value="Nutrition">🥗 Nutrition</option>
                <option value="Weight Loss">⚖️ Weight Loss</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: true,
                    onChange: handleChange,
                  })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div className="hidden sm:block">
                <div className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Class Details */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Class Description
            </label>
            <textarea
              {...register("details", { required: true })}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              rows="5"
              placeholder="Describe what members can expect from this class..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
