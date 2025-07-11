import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import Loader from "../shared/Loader";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "../Form/StripeCheckout";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingPage = () => {
  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slot = queryParams.get("slot");

  console.log(slot);

  const price = 50;
  const { isPending, data: singleData = {} } = useQuery({
    queryKey: ["singleData", id],
    queryFn: async () => {
      const res = await axios?.get(
        `${import.meta.env.VITE_API_URL}/trainer/${id}`
      );
      return res.data;
    },
  });

  const { data: classData = {} } = useQuery({
    queryKey: ["classData", id],
    queryFn: async () => {
      const res = await axios?.get(
        `${
          import.meta.env.VITE_API_URL
        }/trainer-classes/${id}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  console.log(singleData);

  console.log(classData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all form data at once
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Form submitted:", data);
    alert("Registration submitted successfully!");
  };

  return (
    <div className="w-11/12  mx-auto">
      <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-bold tracking-wider uppercase dark:text-violet-600">
              Pricing
            </span>
            <h2 className="text-4xl font-bold lg:text-5xl">
              Choose your best plan
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-stretch -mx-4">
              {/* Beginner Plan */}
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 text-sm">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Basic Plan</h4>
                    <span className="text-6xl font-bold">$25</span>
                  </div>
                  <p className="mt-3 leading-relaxed dark:text-gray-600">
                    Free trial for fitness beginners with core features.
                  </p>
                  <ul className="flex-1 mb-6 dark:text-gray-600">
                    <li className="flex mb-2 space-x-2">
                      ✅ Basic fitness assessment
                    </li>
                    <li className="flex mb-2 space-x-2">
                      ✅ 3-day access to group classes
                    </li>
                    <li className="flex mb-2 space-x-2">
                      ✅ Introductory nutrition guide
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 text-sm">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-violet-600 dark:text-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Standard Plan</h4>
                    <span className="text-6xl font-bold">
                      $50
                      <span className="text-sm tracking-wide">/month</span>
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    Includes all beginner features plus extended training.
                  </p>
                  <ul className="flex-1 space-y-2">
                    <li>✅ Access to group fitness classes</li>
                    <li>✅ Use of cardio & strength equipment</li>
                    <li>✅ Access to locker rooms and showers</li>
                    <li>✅ 1-on-1 session per month with a trainer</li>
                  </ul>
                  <a
                    href="#"
                    className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded dark:bg-gray-100 dark:text-violet-600"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 text-sm">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Premium Plan</h4>
                    <span className="text-6xl font-bold">
                      $100
                      <span className="text-sm tracking-wide">/month</span>
                    </span>
                  </div>
                  <p className="leading-relaxed dark:text-gray-600">
                    Everything in standard, plus exclusive care and discounts.
                  </p>
                  <ul className="space-y-2 dark:text-gray-600">
                    <li>✅ Personal training sessions</li>
                    <li>✅ Sauna and steam room access</li>
                    <li>✅ Discounts on massage & nutrition</li>
                    <li>✅ Priority class bookings</li>
                  </ul>
                  <button className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className=" p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Booked a Trainer
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trainer Name
                    </label>
                    <input
                      type="text"
                      value={singleData.fullName}
                      id="trainerName"
                      name="trainerName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Slot
                    </label>
                    <input
                      type="text"
                      id="selectedSlot"
                      value={slot}
                      name="selectedSlot"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="classes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Classes
                    </label>
                    <input
                      type="text"
                      id="classes"
                      name="classes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Packages
                    </label>
                    <div className="space-y-2">
                      {["Basic", "Standard", "Premium"].map((pkg) => (
                        <div key={pkg} className="flex items-center">
                          <input
                            type="radio"
                            id={pkg}
                            name="package"
                            value={pkg}
                            defaultChecked={pkg === "Basic"}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={pkg}
                            className="ml-2 block text-sm text-gray-700"
                          >
                            {pkg}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Join Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Elements stripe={stripePromise}>
        <StripeCheckout price={price}></StripeCheckout>
      </Elements>
    </div>
  );
};

export default BookingPage;
