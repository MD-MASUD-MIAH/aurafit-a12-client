import { useState } from "react";
import {
  FaAlignLeft,
  FaCalendarAlt,
  FaCamera,
  FaChalkboardTeacher,
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaHistory,
  FaInstagram,
  FaLinkedin,
  FaListUl,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utilits/utilits";

const TrainerApplicationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    fullName: user.displayName,
    email: user.email,
    age: "",
    skills: [],
    photo: null,
    availableDays: [],
    timeSlots: [],
    maxClassesPerDay: "",
    experience: "",
    bio: "",
    created_at:new Date().toISOString(),
    status: "pending",socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

 const timeSlots = [
  "Early Morning (5:00 AM - 6:30 AM)",
  "Morning (6:00 AM - 9:00 AM)",
  "Late Morning (9:00 AM - 11:00 AM)",
  "Midday (11:00 AM - 12:30 PM)",
  "Afternoon (12:00 PM - 3:00 PM)",
  "Late Afternoon (3:00 PM - 5:00 PM)",
  "Evening (5:00 PM - 8:00 PM)",
  "Late Evening (8:00 PM - 9:30 PM)",
  "Night (9:00 PM - 10:30 PM)",
  "Late Night (10:30 PM - 12:00 AM)",
];

  const fitnessSkills = [
    { value: "Yoga", label: "Yoga" },
    { value: "HIIT", label: "HIIT" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Cardio", label: "Cardio" },
    { value: "Pilates", label: "Pilates" },
    { value: "CrossFit", label: "CrossFit" },
    { value: "Zumba", label: "Zumba" },
    { value: "Boxing", label: "Boxing" },
    { value: "Martial Arts", label: "Martial Arts" },
    { value: "Dance", label: "Dance" },
    { value: "Nutrition", label: "Nutrition" },
    { value: "Weight Loss", label: "Weight Loss" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSkillChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      skills: selectedOptions.map((option) => option.value),
    }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const newDays = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: newDays };
    });
  };

  const handleTimeToggle = (slot) => {
    setFormData((prev) => {
      const newSlots = prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter((t) => t !== slot)
        : [...prev.timeSlots, slot];
      return { ...prev, timeSlots: newSlots };
    });
  };

  const handleFileChange = async (e) => {
    const image = await imageUpload(e.target.files[0]);
    setFormData((prev) => ({ ...prev, photo: image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await axiosSecure
      .post("/trainer", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/allTrainer");
        Swal.fire("success");
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className=" max-w-7xl mx-auto mt-12  md:p-6 p-4 bg-white rounded-xl shadow-lg my-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Join Our Trainer Team
        </h1>
        <p className="text-gray-600">
          Please fill out this form to apply as a fitness trainer
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <Input
                label="Full Name"
                icon={<FaUser className="text-blue-500" />}
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="your name"
                required
              />

              <Input
                label="Email Address"
                icon={<FaEnvelope className="text-blue-500" />}
                name="email"
                type="email"
                value={user.email}
                placeholder="enter you email"
                required
              />
            </div>

            <div className="space-y-5">
              <Input
                label="Age"
                icon={<FaCalendarAlt className="text-blue-500" />}
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="70"
                placeholder="30"
                required
              />

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FaCamera className="mr-2 text-blue-500" />
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Professional Information Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
            Professional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Maximum Classes Per Day"
              icon={<FaChalkboardTeacher className="text-blue-500" />}
              name="maxClassesPerDay"
              type="number"
              value={formData.maxClassesPerDay}
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="4"
              required
            />

            <Input
              label="Years of Experience"
              icon={<FaHistory className="text-blue-500" />}
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="50"
              placeholder="5"
              required
            />
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaListUl className="text-blue-500 mr-2" />
            Skills & Specializations
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Select all that apply to your expertise
          </p>
          <Select
            isMulti
            options={fitnessSkills}
            onChange={handleSkillChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select your skills..."
          />
        </section>

        {/* Social Media Links */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 mr-3 w-5 h-5" />
              <input
                type="url"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialLinkChange}
                placeholder="https://facebook.com/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex items-center">
              <FaTwitter className="text-blue-400 mr-3 w-5 h-5" />
              <input
                type="url"
                name="twitter"
                value={formData.socialLinks.twitter}
                onChange={handleSocialLinkChange}
                placeholder="https://twitter.com/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex items-center">
              <FaInstagram className="text-pink-600 mr-3 w-5 h-5" />
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialLinkChange}
                placeholder="https://instagram.com/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex items-center">
              <FaLinkedin className="text-blue-700 mr-3 w-5 h-5" />
              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialLinkChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
            <FaClock className="text-blue-500 mr-2" />
            Availability
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Select when you're available to train
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Days Available</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {daysOfWeek.map((day) => (
                  <CheckboxItem
                    key={day}
                    label={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-3">Time Slots</h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <CheckboxItem
                    key={slot}
                    label={slot}
                    checked={formData.timeSlots.includes(slot)}
                    onChange={() => handleTimeToggle(slot)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
            <FaAlignLeft className="text-blue-500 mr-2" />
            Your Qualifications.
          </h2>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Your training philosophy, certifications, and why you'd be a great fit..."
          />
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Components
const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-700">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 bg-white hover:bg-gray-50 rounded-lg p-3 cursor-pointer border border-gray-200 transition">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export default TrainerApplicationForm;
