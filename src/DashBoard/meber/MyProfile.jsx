import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  FaCamera,
  FaClock,
  FaEdit,
  FaEnvelope,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { PageName } from "../../components/PageName";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { imageUpload } from "../../utilits/utilits";

const MyProfile = () => {
  PageName("My Profile");
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  const { role } = useRole();
  const { user, upDateUser, setLoading } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString()
    : "N/A";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoURL = user.photoURL;

      if (imageFile) {
        const uploaded = await imageUpload(imageFile);
        photoURL = uploaded;
      }

      await upDateUser({
        displayName: name,
        photoURL,
      });

      setModalIsOpen(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your name and photo have been updated.",
      });

      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="w-11/12 md:max-w-md mx-auto mt-15 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
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
        <span className="inline-block mt-3 px-4 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full font-medium shadow-sm capitalize">
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

          <div className="flex items-start">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <FaClock className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Login</p>
              <p className="text-gray-800">{lastLogin || "Never logged in"}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button (opens modal) */}
        <button
          onClick={() => setModalIsOpen(true)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Modal for Edit Profile */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto my-8 mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-white bg-opacity-30 flex items-start md:items-center justify-center p-4"
        contentLabel="Edit Profile Modal"
        ariaHideApp={false}
      >
        <div data-aos="zoom-in" className="p-6 relative">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MyProfile;
