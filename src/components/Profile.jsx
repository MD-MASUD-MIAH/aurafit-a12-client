import {
  FaCamera,
 
  FaEnvelope,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();

  const { role } = useRole();
  return (
    <div className="w-11/12 md:max-w-md mx-auto my-20 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      {/* Background + Profile Image */}
      <div
        className="relative h-36 bg-cover"
        style={{
          backgroundImage: `url('https://i.ibb.co/LXbsCJr6/paper-style-dynamic-lines-background-23-2149008629.jpg')`,
        }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-3rem]">
          <div className="relative group">
            <img
              className="rounded-full h-32 w-32 object-cover"
              src={user.photoURL}
              alt="User"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCamera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-24 pb-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.displayName || "User"}
        </h2>

        {/* Role Badge */}
        <span className="inline-block mt-3 px-4 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full font-medium shadow-sm">
          <FaUserCircle className="inline mr-1" /> {role}
        </span>

        <div className="text-left space-y-4 mt-8">
          <div className="flex items-start">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <FaUser className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-gray-800">
                {user?.displayName || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <FaEnvelope className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-gray-800">{user?.email}</p>
            </div>
          </div>

        
        </div>

        {/* Edit Profile Button (opens modal) */}
      </div>
    </div>
  );
};

export default Profile;
