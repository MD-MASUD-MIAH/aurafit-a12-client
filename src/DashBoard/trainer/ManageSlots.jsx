import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaEnvelope,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";

const ManageSlots = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

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

  const { data: bookings = [] } = useQuery({
    queryKey: ["trainerBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/bookings/${trainer._id}`
      );
      return res.data;
    },
  });

  console.log(trainer);

  const deleteSlotMutation = useMutation({
    mutationFn: async (slotToDelete) => {
      const res = await axiosSecure.delete(
        `/slots/${user.email}?slot=${encodeURIComponent(slotToDelete)}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainer", user?.email]);
      Swal.fire({
        title: "Success!",
        text: "Time slot deleted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete time slot",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleDeleteSlot = (slot) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlotMutation.mutate(slot);
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  // Separate available and booked slots
  const availableSlots =
    trainer.timeSlots?.filter(
      (slot) => !bookings.some((b) => b.selectedSlot === slot)
    ) || [];

  const bookedSlots =
    trainer.timeSlots
      ?.filter((slot) => bookings.some((b) => b.selectedSlot === slot))
      .map((slot) => {
        const booking = bookings.find((b) => b.selectedSlot === slot);
        return { slot, booking };
      }) || [];

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaClock className="mr-2 text-blue-500" />
        My Time Slots & Bookings
      </h2>

      {/* Available Slots Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-green-600">
          <FaClock className="mr-2" />
          Available Time Slots
        </h3>

        {availableSlots.length > 0 ? (
          <div className="space-y-3">
            {availableSlots.map((slot, index) => (
              <div
                key={`available-${index}`}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaClock className="text-green-500 mr-2" />
                    <span className="font-medium">{slot}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteSlot(slot)}
                    className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 hover:bg-red-200 flex items-center"
                    disabled={deleteSlotMutation.isLoading}
                  >
                    <FaTrash className="mr-1" />
                    Delete Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No available time slots</p>
        )}
      </div>

      {/* Booked Slots Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600">
          <FaClock className="mr-2" />
          Booked Time Slots
        </h3>

        {bookedSlots.length > 0 ? (
          <div className="space-y-4">
            {bookedSlots.map((item, index) => (
              <div
                key={`booked-${index}`}
                className="border border-blue-200 rounded-lg p-4 bg-blue-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <FaClock className="text-blue-500 mr-2" />
                    <span className="font-medium">{item.slot}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Booked
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-blue-100">
                  <h4 className="font-medium flex items-center text-blue-700 mb-2">
                    <FaUser className="mr-2" /> Booking Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaUser className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Member
                          </p>
                          <p>{item.booking.memberName}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaEnvelope className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Email
                          </p>
                          <p>{item.booking.memberEmail}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Class
                          </p>
                          <p>{item.booking.selectClass}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <FaDollarSign className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Package
                          </p>
                          <p>
                            {item.booking.package} (${item.booking.amount})
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <div className="flex items-center text-sm">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="font-medium">Payment Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${
                          item.booking.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.booking.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Transaction ID: {item.booking.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No booked time slots</p>
        )}
      </div>
    </div>
  );
};

export default ManageSlots;
