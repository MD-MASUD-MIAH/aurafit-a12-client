import { FaFireAlt, FaUsers, FaWalking } from "react-icons/fa";

const About = () => {
  return (
    <div className="  mx-auto w-11/12 py-16 ">
      <div className="text-center mb-12 ">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
          Health & Wellness Philosophy
        </h2>
        <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
          We believe fitness is not just about working out—it's a lifestyle.
          That’s why we focus on holistic wellness, combining activity tracking
          with nutrition tips,
        </p>
      </div>
      <div className="grid mx-auto w-11/12 gap-8 lg:grid-cols-2 sm:mx-auto">
        <div className="flex flex-col justify-center">
          <div className="flex">
            <div className="mr-4">
              <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-indigo-100 text-red-600">
                <FaFireAlt className="text-2xl" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 text-lg font-semibold leading-6">
                10,000+ Calories Burned
              </h6>
              <p className="text-base text-gray-800">
                Aurafit users have collectively burned over 10,000 calories by
                staying consistent with their fitness routines, challenges, and
                workouts.
              </p>
              <hr className="w-full my-6 border-gray-300" />
            </div>
          </div>

          <div className="flex">
            <div className="mr-4">
              <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-indigo-100 text-blue-600">
                <FaWalking className="text-2xl" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 text-lg font-semibold leading-6">
                5,000+ Steps Tracked
              </h6>
              <p className="text-base text-gray-800">
                With Aurafit, users track over 5,000 steps every day on average
                — promoting healthy movement and activity throughout their daily
                routines.
              </p>
              <hr className="w-full my-6 border-gray-300" />
            </div>
          </div>

          <div className="flex">
            <div className="mr-4">
              <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-indigo-100 text-green-600">
                <FaUsers className="text-2xl" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 text-lg font-semibold leading-6">
                100+ Active Members
              </h6>
              <p className="text-base text-gray-800">
                More than 100 active users log in daily to track progress,
                participate in community challenges, and share their fitness
                journey with Aurafit.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <img
            className="object-cover w-full h-56 col-span-2 rounded shadow-lg"
            src="https://i.ibb.co/ns9bbZh9/Team-Photo.jpg"
            alt=""
          />
          <img
            className="object-cover w-full h-48 rounded shadow-lg"
            src="https://i.ibb.co/NgmQFt4s/how-much-personal-trainer-cost.jpg;"
            alt=""
          />
          <img
            className="object-cover w-full h-48 rounded shadow-lg"
            src="https://i.ibb.co/6c3v3T2s/MAX02823.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
