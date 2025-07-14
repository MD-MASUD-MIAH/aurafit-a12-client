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
    <section className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Side: Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://i.ibb.co/35Szc2jX/undraw-fitness-stats-uk0g-removebg-preview.png"
            alt="Newsletter Illustration"
            className="max-w-md w-full "
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold  mb-4">
            Subscribe To Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Want to get special offers before they run out? Subscribe to our
            email to get exclusive discounts and offers.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <input
              type="email"
              placeholder="Your Email Address"
              required
              name="email"
              className="px-5 py-3 rounded-full border border-gray-300 w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="tom-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewLatter;
