import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FaAlignLeft,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClock,
  FaListUl,
  FaUser,
} from "react-icons/fa";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader";

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

const AddNewSlots = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slots/${user.email}`
      );
      return res.json();
    },
  });

  const { data: rawClassData = [] } = useQuery({
    queryKey: ["classNames"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/class-names`
      );
      return res.data;
    },
  });

  console.log(rawClassData);

  
const classOptions = rawClassData.map(cls => ({
  value: cls?.name?.toLowerCase(), // Convert to lowercase for consistency
  label: cls.name
}));

  // Convert timeSlots to React Select options
  const timeSlotOptions = timeSlots.map((slot) => ({
    value: slot,
    label: slot,
  }));

  // Get trainer's currently selected slots
  const selectedSlots =
    trainer.timeSlots?.map((slot) => ({
      value: slot,
      label: slot,
    })) || [];

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = true;
      if (response.ok) {
        alert("Time slots updated successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating slots. Please try again.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaClock className="mr-2 text-blue-500" />
        Manage Your Time Slots
      </h2>

      {/* Trainer Info Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <FaUser className="mr-2 text-blue-500" />
          Trainer Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Name</p>
            <p className="text-gray-900">{trainer.fullName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-gray-900">{trainer.email || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Time Slot Selection Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Available Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCalendarAlt className="inline mr-1 text-blue-500" />
            Available Days *
          </label>
          <Select
            options={[
              { value: "Monday", label: "Monday" },
              { value: "Tuesday", label: "Tuesday" },
              { value: "Wednesday", label: "Wednesday" },
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Saturday", label: "Saturday" },
              { value: "Sunday", label: "Sunday" },
            ]}
            defaultValue={trainer.availableDays?.map((day) => ({
              value: day,
              label: day,
            }))}
            isMulti
            name="availableDays"
            {...register("availableDays", { required: true })}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Time Slots Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaClock className="inline mr-1 text-blue-500" />
            Select Your Time Slots *
          </label>
          <Select
            options={timeSlotOptions}
            defaultValue={selectedSlots}
            isMulti
            name="timeSlots"
            {...register("timeSlots", { required: true })}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <p className="mt-1 text-sm text-gray-500">
            Select all time slots you're available for training sessions
          </p>
        </div>

        {/* Available Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaChalkboardTeacher className="inline mr-1 text-blue-500" />
            Available Classes *
          </label>
         <Select
  options={classOptions}
  defaultValue={trainer.classes?.map(cls => {
    // Find the matching class from rawClassData
    const matchedClass = rawClassData.find(c => c.name.toLowerCase() === cls.toLowerCase());
    return {
      value: cls.toLowerCase(),
      label: matchedClass ? matchedClass.name : cls
    };
  })}
  isMulti
  name="availableClasses"
  {...register("availableClasses", { required: true })}
  className="basic-multi-select"
  classNamePrefix="select"
/>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaAlignLeft className="inline mr-1 text-blue-500" />
            Additional Notes
          </label>
          <textarea
            {...register("notes")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            placeholder="Any special instructions or notes..."
            defaultValue={trainer.notes || ""}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <FaListUl className="mr-2" />
            Save Availability
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSlots;
