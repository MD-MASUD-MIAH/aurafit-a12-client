import axios from "axios";
import { toast } from "react-toastify";

const NewLatter = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const foms = e.target;

    const subscribers = new FormData(foms);
    const subsribe = Object.fromEntries(subscribers.entries());

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/subscribers`,
      subsribe
    );

    console.log(data);

    toast.success("subscribe successfully");
    foms.reset();
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 w-11/12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our newsletter for the latest fitness tips, workout plans, and
            exclusive offers.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button type="submit" className="tom-btn">
              Subscribe Now
            </button>
          </form>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="consent"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="consent"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to receive emails about fitness tips and special offers
            </label>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewLatter;
