import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllClasses from "./AllClass";
const ClassContainer = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-11/12 mx-auto">
      <div className="text-center my-12 w-11/12 mx-auto">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
          Join Our Expert-Led Classes
        </h2>
        <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
       Take your fitness to the next level with certified trainers.
Our expert-led classes are designed for everyone.
From beginners to pros, we help you reach your goals.
        </p>
      </div>

      <div className="relative mb-6 w-full px-4 lg:px-0 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-8 lg:pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search classes..."
          className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200 hover:border-gray-300"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <AllClasses searchText={searchText}></AllClasses>
    </div>
  );
};

export default ClassContainer;
