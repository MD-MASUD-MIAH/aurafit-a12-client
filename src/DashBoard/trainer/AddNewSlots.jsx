import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClock,
  FaListUl,
  FaUser,
} from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";
import { PageName } from "../../components/PageName";
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
  const { handleSubmit, control } = useForm();

  PageName("Add slot");

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slots/${user.email}`
      );
      return res.data;
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
  console.log(trainer);
  

  const classOptions = rawClassData.map((cls) => ({
    value: cls?.skillName?.toLowerCase(),
    label: cls?.skillName,
  }));

  const timeSlotOptions = timeSlots.map((slot) => ({
    value: slot,
    label: slot,
  }));

  const selectedSlots =
    trainer?.timeSlots?.map((slot) => ({
      value: slot,
      label: slot,
    })) || [];

  const onSubmit = async (data) => {
    try {
      const availableDays = data.availableDays.map((d) => d.value);
      const timeSlots = data.timeSlots.map((t) => t.value);
      const classes = data.availableClasses.map((c) => c.value);
      const newSkills = [
        ...new Set(classes.map((c) => c.charAt(0).toUpperCase() + c.slice(1))),
      ];

     
      const existingRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/slots/${user.email}`
      );
      const existingTrainer = existingRes.data;
      const previousSkills = existingTrainer?.skills || [];

    
      const mergedSkills = [...new Set([...previousSkills, ...newSkills])];

      // 🔵 Prepare data
      const payload = {
        availableDays,
        timeSlots,
        classes,
        skills: mergedSkills,
      };

      // 🔴 Send PATCH request
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/trainer/${user.email}`,
        payload
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Availability and skills updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "No updates were made.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating. Please try again.",
      });
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg w-11/12 mt-10 shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaClock className="mr-2 text-blue-500" />
        Manage Your Time Slots
      </h2>

      {/* Trainer Info */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Available Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCalendarAlt className="inline mr-1 text-blue-500" />
            Available Days *
          </label>
          <Controller
            name="availableDays"
            control={control}
            defaultValue={
              trainer?.availableDays?.map((day) => ({
                value: day,
                label: day,
              })) || []
            }
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "Monday", label: "Monday" },
                  { value: "Tuesday", label: "Tuesday" },
                  { value: "Wednesday", label: "Wednesday" },
                  { value: "Thursday", label: "Thursday" },
                  { value: "Friday", label: "Friday" },
                  { value: "Saturday", label: "Saturday" },
                  { value: "Sunday", label: "Sunday" },
                ]}
                isMulti
                classNamePrefix="select"
              />
            )}
          />
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaClock className="inline mr-1 text-blue-500" />
            Select Your Time Slots *
          </label>
          <Controller
            name="timeSlots"
            control={control}
            defaultValue={selectedSlots}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={timeSlotOptions}
                isMulti
                classNamePrefix="select"
              />
            )}
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
          <Controller
            name="availableClasses"
            control={control}
            defaultValue={
              trainer.classes?.map((cls) => {
                const matched = rawClassData.find(
                  (c) => c?.name?.toLowerCase() === cls.toLowerCase()
                );
                return {
                  value: cls.toLowerCase(),
                  label: matched ? matched.name : cls,
                };
              }) || []
            }
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={classOptions}
                isMulti
                classNamePrefix="select"
              />
            )}
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
