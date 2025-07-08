import { use, useState } from "react";
import { Link } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import GoogleLogin from "../social/GoogleLogin";

const Register = () => {
  

  const [errors, setErrors] = useState({});
 
 
  
const {registerUser} = use(AuthContext)
      // Create preview
     

  
  const handleSubmit = (e) => { 
    e.preventDefault() 
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const user = Object.fromEntries(formData.entries());

  console.log(user,email,password); 

 registerUser(email,password).then(res=>{

  console.log(res);
  
 }).catch(err=>{

  setErrors(err.message)
  
 })
 
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
                  } focus:outline-none focus:border-[#550527] transition-colors`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                {/* <div className="flex items-center space-x-4">
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
                  <label className="flex-1 cursor-pointer">
                    <input
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div
                      className={`px-4 py-2 border-b ${
                        errors.image ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-[#550527] transition-colors`}
                    >
                      {formData.image ? formData.image.name : "Choose an image"}
                    </div>
                  </label>
                </div> */}

               <input
                  name="image"
                  type="file"
                
                  className={`w-full px-4 py-2 border-b ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-[#550527] transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
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
                  } focus:outline-none focus:border-[#550527] transition-colors`}
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
              
                className="w-full bg-[#550527] hover:bg-[#44041f] text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
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

            <div className="flex justify-center space-x-4">
            
           
            <GoogleLogin></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
