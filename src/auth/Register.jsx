import {  useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import GoogleLogin from "../social/GoogleLogin";
import { imageUpload } from "../utilits/utilits";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate =useNavigate()
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const { registerUser, setUser, upDateUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Simple validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!previewImage) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser(email, password);
      await upDateUser({ displayName: name, photoURL: previewImage });

      setUser({
        ...res.user,
        displayName: name,
        photoURL: previewImage,
      });

      Swal.fire({
        title: "Register Success!",
        icon: "success",
        confirmButtonColor: "#550527",
      });

      form.reset();
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }finally{
      navigate('/')
    }
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        const imageUrl = await imageUpload(image);
        setPreviewImage(imageUrl);
        setErrors((prev) => ({ ...prev, image: null }));
      } catch (error) {
        console.log(error);

        setErrors((prev) => ({
          ...prev,
          image: "Image upload failed. Try again.",
        }));
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="w-11/12 mx-auto py-10 flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#550527]">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#550527]">
                Create Your Account
              </h2>
              <p className="text-gray-600 mt-2">Join our community today</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  className={`w-full px-4 py-2 border-b ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-[#550527]`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>
                {errors.image && (
                  <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2 border-b ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-[#550527]`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className={`w-full px-4 py-2 border-b ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-[#550527]`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#550527] hover:bg-[#44041f] text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Register
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#550527] font-medium hover:underline"
              >
                Login here
              </Link>
            </p>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
