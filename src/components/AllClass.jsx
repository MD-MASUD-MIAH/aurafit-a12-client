import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import Loader from "../shared/Loader";

const ClassPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isPending,
    isError,
    data: allClass = [],
  } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/class`);
      return res?.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
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
    <div className="w-11/12 mx-auto px-4 py-8  overflow-hidden">
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
      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentItems.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={
                classItem.image ||
                "https://via.placeholder.com/300x200?text=Class+Image"
              }
              alt={classItem.className}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Class+Image";
              }}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 dark:text-white">
                {classItem.className}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">Skill:</span>{" "}
                {classItem.skillName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {classItem.details}
              </p>

              <div className="border-t pt-4 dark:border-gray-700">
                <h3 className="font-semibold mb-2 dark:text-white">
                  Trainers:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {classItem?.trainers?.map((trainer) => (
                    <Link
                      to={`/trainer/${trainer.trainerId}`}
                      key={trainer.trainerId}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={trainer.trainerPhoto}
                        alt={trainer.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/50?text=T";
                        }}
                      />
                      <span className="text-sm dark:text-gray-300">
                        {trainer.fullName}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-1 dark:text-gray-800">
          <button
            title="previous"
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => paginate(number)}
              className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 ${
                currentPage === number
                  ? "bg-blue-500 text-white dark:bg-blue-500 dark:border-blue-500"
                  : "dark:border-gray-100"
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
  );
};

export default ClassPagination;
