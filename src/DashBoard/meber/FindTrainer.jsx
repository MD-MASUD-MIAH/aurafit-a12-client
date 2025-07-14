import { useState } from "react";
import { FaClock, FaDumbbell, FaInfoCircle, FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const TrainerBookingInfo = ({ bookingData }) => {

  const {user} = useAuth()
  const packageFeatures = {
    Basic: {
      color: "blue",
      features: [
        "Fundamental workout techniques",
        "1-2 training sessions per week",
        "General fitness assessment",
        "Basic nutrition guidance",
        "Email support",
        "Progress tracking",
      ],
    },
    Standard: {
      color: "purple",
      features: [
        "Everything in Basic plus:",
        "3-4 training sessions per week",
        "Personalized workout plan",
        "Advanced nutrition plan",
        "Weekly check-ins",
        "Priority email support",
        "Video exercise library access",
      ],
    },
    Premium: {
      color: "gold",
      features: [
        "Everything in Standard plus:",
        "5-7 training sessions per week",
        "24/7 trainer access",
        "Custom meal plans",
        "Bi-weekly body composition analysis",
        "Live video coaching",
        "Recovery session guidance",
        "Supplementation advice",
      ],
    },
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const reviewData = {
      rating: formData.get("rating"),
      feedback: formData.get("feedback"),
      userName: user.displayName ,
      userImage:user.photoURL
    };

    console.log("Submitting review:", reviewData);
    
    try {
     
      const  response = await axios.post(`${import.meta.env.VITE_API_URL}/review-post`,reviewData)

      console.log(response.data);
      

      if (response) {
       Swal.fire({
  icon: 'success',
  title: 'Review submitted successfully!',
  showConfirmButton: false,
  timer: 1500
});
        setShowReviewModal(false);
        setRating(0);
        event.target.reset();
      } else {


      Swal.fire({
  icon: 'error',
  title: 'Error submitting review',
  text: 'Please try again.',
  confirmButtonColor: '#d33'
});
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    Swal.fire({
  icon: 'error',
  title: 'Error submitting review',
  text: 'Please try again.',
  confirmButtonColor: '#d33'
});
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Trainer Information - Takes full width on mobile, 1/3 on desktop */}
        <div className="bg-white rounded-lg p-6 lg:w-1/3 flex flex-col">
          {/* Trainer Info Header */}
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Trainer Information</h2>
          </div>

          {/* Trainer Details */}
          <div className="space-y-3 flex-grow">
            <div className="flex items-start">
              <img
                src={bookingData?.trainerDetails?.photo}
                alt={bookingData?.trainerName}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
              />
              <div>
                <p className="font-bold">{bookingData?.trainerName}</p>
                <p className="text-sm text-gray-600">
                  {bookingData?.trainerEmail}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Experience:</span>{" "}
                  {bookingData?.trainerDetails?.experience} years
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium flex items-center">
                <FaInfoCircle className="mr-2 text-blue-500" />
                About
              </h3>
              <p className="text-sm text-gray-700 mt-1 break-words whitespace-pre-line">
                {bookingData?.trainerDetails?.bio}
              </p>
            </div>

            <div className="mt-3">
              <h3 className="font-medium">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {bookingData?.trainerDetails?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Review Button - Positioned at bottom */}
          <div className="mt-auto pt-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Right Column - Takes full width on mobile, 2/3 on desktop */}
        <div className="flex flex-col gap-6 lg:w-2/3">
          {/* Class Information */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaDumbbell className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Trainer Class Includes</h2>
            </div>

            {/* Package Features */}
            {bookingData?.package && (
              <div className="mt-4">
                <h3 className="text-md font-semibold text-blue-600 mb-2">
                  {bookingData.package} Package
                </h3>
                <div className="space-y-2">
                  {packageFeatures[bookingData.package]?.features.map(
                    (feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-500">✔</span>
                        <p className="text-sm text-gray-700">{feature}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Available Time Slots */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaClock className="text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Available Time Slots</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-medium">Slots</p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bookingData?.trainerDetails?.timeSlots?.map(
                    (slot, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-center text-sm ${
                          slot === bookingData?.selectedSlot
                            ? "bg-purple-100 text-purple-800 font-medium border border-purple-300"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {slot}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium">Available Days</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bookingData?.trainerDetails?.availableDays?.map(
                    (day, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {day}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-11/12 mx-auto max-w-md">
            <form onSubmit={handleSubmitReview} className="p-6">
              <h3 className="text-xl font-semibold mb-4">Rate Your Trainer</h3>
              
              {/* Hidden rating input */}
              <input type="hidden" name="rating" value={rating} />
              
              {/* Star Rating Display */}
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-3xl mx-1 focus:outline-none"
                  >
                    {star <= rating ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
              
              {/* Feedback Textarea */}
              <textarea
                name="feedback"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                rows="4"
                placeholder="Share your experience..."
                required
              />
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onClick={() => {
                    setShowReviewModal(false);
                    setRating(0);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={rating === 0}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerBookingInfo;