import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllClasses from "./AllClass";
const ClassContainer = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col items-center gap-3 pt-5 pb-19">
        <h1 className="text-3xl font-bold text-center  ">
          Join Our Expert-Led Classes
        </h1>
        <p className="max-w-2xl text-center">
          Take your fitness journey to the next level with guidance from
          certified trainers. Our expert-led classes are designed for all
          fitness levels — whether you're just starting out or pushing for peak
          performance.
        </p>
      </div>

      <div className="relative mb-6 w-full max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
