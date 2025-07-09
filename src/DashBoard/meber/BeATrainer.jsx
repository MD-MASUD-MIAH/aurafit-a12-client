import axios from "axios";
import { useState } from "react";
import {
  FaAlignLeft,
  FaCalendarAlt,
  FaCamera,
  FaChalkboardTeacher,
  FaEnvelope,
  FaHistory,
  FaListUl,
  FaUser,
} from "react-icons/fa";
import { imageUpload } from "../../utilits/utilits";

const fitnessSkills = ["Yoga", "Cardio", "HIIT", "Zumba", "Strength"];
const daysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const timeSlots = [
  "Morning (6am - 9am)",
  "Afternoon (12pm - 3pm)",
  "Evening (5pm - 8pm)",
  "Night (8pm - 10pm)",
];

const TrainerApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
   
    maxClassesPerDay: "",
    experience: "",
    skills: [],
    availableDays: [],
    timeSlots: [],
    bio: "",
    status: "pending",
     createAt:new Date().toISOString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const image = e.target.files[0];

    const imageUrl = await imageUpload(image);

    setFormData((prev) => ({ ...prev, photo:imageUrl }));

    console.log(imageUrl);
  };

  const handleSkillToggle = (value) => {
    setFormData((prev) => {
      const updated = prev.skills.includes(value)
        ? prev.skills.filter((item) => item !== value)
        : [...prev.skills, value];
      return { ...prev, skills: updated };
    });
  };

  const handleDayToggle = (value) => {
    setFormData((prev) => {
      const updated = prev.availableDays.includes(value)
        ? prev.availableDays.filter((item) => item !== value)
        : [...prev.availableDays, value];
      return { ...prev, availableDays: updated };
    });
  };

  const handleTimeToggle = (value) => {
    setFormData((prev) => {
      const updated = prev.timeSlots.includes(value)
        ? prev.timeSlots.filter((item) => item !== value)
        : [...prev.timeSlots, value];
      return { ...prev, timeSlots: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can use this to send to backend or log it
    console.log("Form Submitted:", formData);
const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/trainer`,
      formData
    );
    // If sending via FormData (for file upload):
    const submitData = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        submitData.append(key, JSON.stringify(formData[key]));
      } else {
        submitData.append(key, formData[key]);
      }
    }

    

    console.log(data);
  };

  return (
    <div className="w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md my-14 md:my-0">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Trainer Application Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Full Name */}
            <Input
              label="Full Name"
              icon={<FaUser />}
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />

            {/* Email */}
            <Input
              label="Email Address"
              icon={<FaEnvelope />}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />

            {/* Age */}
            <Input
              label="Age"
              icon={<FaCalendarAlt />}
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="70"
              placeholder="30"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaCamera className="mr-2 text-blue-500" /> Profile Photo
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Max Classes */}
            <Input
              label="Maximum Classes Per Day"
              icon={<FaChalkboardTeacher />}
              name="maxClassesPerDay"
              type="number"
              value={formData.maxClassesPerDay}
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="4"
            />

            {/* Experience */}
            <Input
              label="Years of Experience"
              icon={<FaHistory />}
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="50"
              placeholder="5"
            />
          </div>
        </div>

        {/* Skills */}
        <CheckboxGroup
          title="Skills & Specializations"
          icon={<FaListUl />}
          options={fitnessSkills}
          selected={formData.skills}
          toggle={handleSkillToggle}
        />

        {/* Available Days */}
        <CheckboxGroup
          title="Days of Week"
          icon={<FaListUl />}
          options={daysOfWeek}
          selected={formData.availableDays}
          toggle={handleDayToggle}
        />

        {/* Time Slots */}
        <CheckboxGroup
          title="Time Slots"
          icon={<FaListUl />}
          options={timeSlots}
          selected={formData.timeSlots}
          toggle={handleTimeToggle}
        />

        {/* Bio */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaAlignLeft className="mr-2 text-blue-500" /> Biography
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your training philosophy and background..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

// Reusable input field
const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-700">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// Reusable checkbox group
const CheckboxGroup = ({ title, icon, options, selected, toggle }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-700">
      {icon}
      <span className="ml-2">{title}</span>
    </label>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default TrainerApplicationForm;
