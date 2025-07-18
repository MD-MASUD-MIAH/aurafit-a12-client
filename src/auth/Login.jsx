import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PageName } from "../components/PageName";
import useAuth from "../hooks/useAuth";
import GoogleLogin from "../social/GoogleLogin";
import { saveUserMongo } from "../utilits/utilits";
const Login = () => {
  const location = useLocation();

  PageName("Login");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { logInUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      const result = await logInUser(email, password);

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      // update user
      await saveUserMongo(userData);
      navigate(location?.state ? location.state : "/");
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      setErrors(err.message);
    }
  };
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-[calc(100vh-200px)]">
      <div className="w-11/12 mx-auto py-10 flex flex-col items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-blue-600 md:mt-6">
          <div className="p-8 ">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-600">
                Login Account
              </h2>
            </div>

            <form className="space-y-6  " onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2 border-b ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-600 transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
                  } focus:outline-none focus:border-[#550527] transition-colors`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
              you new in this site please,{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
               register here
              </Link>
            </p>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <GoogleLogin></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
