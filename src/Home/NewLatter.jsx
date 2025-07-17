import axios from "axios";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import fitness from "../../public/ftiness.json";
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
    <section
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="bg-blue-600 pb-6 md:pb-0  "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side: Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="">
              <Lottie
                animationData={fitness}
                loop={true}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left py-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Subscribe To Our Newsletter
            </h2>
            <p className="text-white text-sm sm:text-base md:text-lg mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
              Stay up-to-date with the latest news, updates, and exclusive
              offers. Subscribe to our newsletter and never miss out on what’s
              happening!
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto lg:mx-0"
            >
              <input
                type="email"
                placeholder="Your Email Address"
                required
                name="email"
                className="px-6 py-3 sm:py-4  border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-300"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-8  transition duration-300 ease-in-out transform hover:scale-105 shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLatter;
