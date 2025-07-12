import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../shared/Loader";
import { FaClock, FaUser, FaEnvelope, FaCalendarAlt, FaDollarSign, FaCheckCircle } from "react-icons/fa";

const ManageSlots = () => {
  const { user } = useAuth();

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
        `${import.meta.env.VITE_API_URL}/trainer/bookings/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Combine slot data with booking info
  const slotsWithBookings = trainer.timeSlots?.map(slot => {
    const booking = bookings.find(b => b.selectedSlot === slot);
    return {
      slot,
      booking
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaClock className="mr-2 text-blue-500" />
        My Time Slots & Bookings
      </h2>

      <div className="space-y-4">
        {slotsWithBookings?.map((item, index) => (
          <div 
            key={index} 
            className={`border rounded-lg p-4 ${
              item.booking ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-2" />
                <span className="font-medium">{item.slot}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.booking ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
              }`}>
                {item.booking ? "Booked" : "Available"}
              </span>
            </div>

            {item.booking && (
              <div className="mt-3 pt-3 border-t border-blue-100">
                <h4 className="font-medium flex items-center text-blue-700 mb-2">
                  <FaUser className="mr-2" /> Booking Details
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <FaUser className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Member</p>
                        <p>{item.booking.memberName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaEnvelope className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{item.booking.memberEmail}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Class</p>
                        <p>{item.booking.selectClass}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaDollarSign className="text-gray-500 mt-1 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Package</p>
                        <p>{item.booking.package} (${item.booking.amount})</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-blue-100">
                  <div className="flex items-center text-sm">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span className="font-medium">Payment Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      item.booking.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.booking.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Transaction ID: {item.booking.transactionId}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSlots;