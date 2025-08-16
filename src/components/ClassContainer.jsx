import { useState } from "react";
import AllClasses from "./AllClass";
const ClassContainer = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  return (
    <div className="w-11/12 mx-auto">
      <div className="text-center my-12 w-11/12 mx-auto">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">
          Join Our Expert-Led Classes
        </h2>
        <p className="md:text-xl text-xs text-gray-600 max-w-3xl mx-auto">
          Take your fitness to the next level with certified trainers. Our
          expert-led classes are designed for everyone. From beginners to pros,
          we help you reach your goals.
        </p>
      </div>

      <div className=" ">
        <div className="flex flex-col-reverse gap-5 lg:flex-row justify-between items-center w-full">
          <div className="flex  items-center gap-1">
            <h1 className="text-xl font-bold"> Top Booked Classes :</h1>{" "}
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "" : "desc")}
              className="tom-btn"
            >
              {sortOrder === "desc" ? "Unsort" : "Sort"}
            </button>
          </div>
          <div>
            <label className="input w-[275px]">
              <svg
                className="h-[1.2em] "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                onChange={(e) => setSearchText(e.target.value)}
                className="grow"
                placeholder="Search"
              />
            </label>
          </div>
        </div>
      </div>

      <AllClasses sortOrder={sortOrder} searchText={searchText}></AllClasses>
    </div>
  );
};

export default ClassContainer;
