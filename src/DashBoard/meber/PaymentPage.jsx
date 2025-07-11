import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
import StripeCheckout from "../../Form/StripeCheckout";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentPage = () => {
  const location = useLocation();
  const formData = location.state;

  console.log(formData);

  return (
    <div className=" w-11/12
     md:max-w-[500px] mx-auto p-6 bg-white rounded-xl shadow-lg my-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Booking Summary
        </h2>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Trainer Name:</span>
              <span className="text-gray-800 font-semibold">
                {formData.trainerName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Slot:</span>
              <span className="text-gray-800 font-semibold">
                {formData.selectedSlot}
              </span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Class:</span>
              <span className="text-gray-800 font-semibold">
                {formData.selectClass}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Member Name:</span>
              <span className="text-gray-800 font-semibold">
                {formData.memberName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Member Email:</span>
              <span className="text-gray-800 font-semibold">
                {formData.memberEmail}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600 font-medium">Package:</span>
              <span className="text-gray-800 font-semibold">
                {formData.package}
              </span>
            </div>

            <div className="flex justify-between pt-3">
              <span className="text-lg text-gray-600 font-medium">
                Total Amount:
              </span>
              <span className="text-xl text-blue-600 font-bold">
                ${formData.amount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Elements stripe={stripePromise}>
          <StripeCheckout formData={formData} className="w-full" />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
