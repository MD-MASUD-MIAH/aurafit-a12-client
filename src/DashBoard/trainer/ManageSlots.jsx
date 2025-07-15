import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaClock, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { PageName } from "../../components/PageName";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";

const ManageSlots = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  PageName("Manage Slots");

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
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/trainer/bookings/${trainer._id}`
      );
      return res.data;
    },
  });

  console.log(bookings);

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

  return (
    <div>
      <div className="w-11/12 mx-auto p-4 mt-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaClock className="mr-2 text-blue-500" />
          My Time Slots
        </h2>

        {/* All Slots Section */}
        <div className="space-y-4">
          {trainer.timeSlots?.length > 0 ? (
            trainer.timeSlots.map((slot, index) => (
              <div
                key={`slot-${index}`}
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
            ))
          ) : (
            <p className="text-gray-500 italic">No time slots available</p>
          )}
        </div>
      </div>

      <div className="w-11/12  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Slots Bookings</h2>
            <p className="text-gray-600 mt-1">Recent member reservations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time Slot
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Member
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings?.map((booking, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking?.selectedSlot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {booking?.selectClass}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking?.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking?.memberEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${booking?.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {booking?.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        booking?.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : booking.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing of{" "}
                  <span className="font-medium">{bookings.length}</span> member
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSlots;
