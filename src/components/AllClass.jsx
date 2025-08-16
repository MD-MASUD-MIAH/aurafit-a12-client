import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";
import { PageName } from "./PageName";
const AllClasses = ({ searchText,sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);

  console.log(searchText);
  PageName("AllClass");

   

  const {
    data: allClass = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["allClass", searchText, sortOrder], // dependency তে যোগ করলাম
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/class?search=${searchText}&sort=${sortOrder}`
      );
      return res.data;
    },
    enabled: true,
  });

  console.log(allClass);

  if (isPending) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading classes</div>
    );
  }

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allClass.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allClass.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div>
      <div className=" px-4 lg:px-0 py-8  overflow-hidden">
       
        {/* Class Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Image with gradient overlay */}
              <div className="relative">
                <img
                  src={
                    classItem.image ||
                    "https://via.placeholder.com/300x200?text=Class+Image"
                  }
                  alt={classItem.skillName}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Class+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                {/* Skill level badge */}
                {classItem.level && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {classItem.level}
                  </span>
                )}
              </div>

              <div className="p-6">
                {/* Title and category */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                      {classItem.skillName}
                    </h2>
                    <div className="flex items-center text-gray-700">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      <span className="font-medium">
                        {classItem?.bookingCount || 0} bookings
                      </span>
                    </div>
                  </div>
                  {classItem.category && (
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {classItem.category}
                    </span>
                  )}
                </div>

                {/* Description with fade effect */}
                <div className="relative mb-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {classItem.details}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Stats (if available) */}
                {(classItem.duration || classItem.price) && (
                  <div className="flex gap-4 text-sm mb-4">
                    {classItem.duration && (
                      <span className="flex items-center text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {classItem.duration}
                      </span>
                    )}
                    {classItem.price && (
                      <span className="flex items-center text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        ${classItem.price}
                      </span>
                    )}
                  </div>
                )}

                {/* Trainers section */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-[#2563EB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Choose a trainer
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {classItem?.trainers?.map((trainer) => (
                      <Link
                        to={`/trainer/${trainer._id}`}
                        key={trainer.trainerId}
                        className="flex items-center space-x-2 group"
                      >
                        <div className="relative">
                          <img
                            src={trainer.photo}
                            alt={trainer.fullName}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white group-hover:border-[#2563EB] transition-colors shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/50?text=T";
                            }}
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-[#2563EB] transition-colors">
                          {trainer.fullName}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action button */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-1 ">
            <button
              title="previous"
              type="button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md   disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {getPageNumbers().map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => paginate(number)}
                className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md  ${
                  currentPage === number ? "bg-blue-500 text-white " : ""
                }`}
                title={`Page ${number}`}
              >
                {number}
              </button>
            ))}

            <button
              title="next"
              type="button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100 disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
