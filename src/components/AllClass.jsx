import { useState } from "react";

const ClassPagination = () => {
  // Sample data
  const classesData = [
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
    {
      _id: "686f939d0021ed1801345886",
      name: "Cardio",
      image:
        "https://i.ibb.co/Jj2gZsXS/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
      details:
        "A high-intensity cardio workout to boost your endurance and burn calories.",
      trainers: [
        {
          trainerId: "686f3bddbffdb2c156094f20",
          fullName: "Macy Stewart",
          trainerPhoto:
            "https://i.ibb.co/5WXpSwvh/506620297-713268567761220-4609088287991297153-n.jpg",
        },
        {
          trainerId: "686f436abffdb2c156094f23",
          fullName: "Evangeline Mcmillan",
          trainerPhoto:
            "https://i.ibb.co/3mvYXvFx/bodybuilding-specialist-mobile-hero-image-2x-min.webp",
        },
        {
          trainerId: "686f5257bffdb2c156094f25",
          fullName: "Cooper Carroll",
          trainerPhoto: "https://i.ibb.co/wZ8FxFgM/images-5.jpg",
        },
      ],
    },
    // Add more sample data...
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(classesData.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classesData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Fitness Classes
      </h1>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentItems.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={classItem.image}
              alt={classItem.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Class+Image";
              }}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 dark:text-white">
                {classItem.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {classItem.details}
              </p>

              <div className="border-t pt-4 dark:border-gray-700">
                <h3 className="font-semibold mb-2 dark:text-white">
                  Trainers:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {classItem.trainers.map((trainer) => (
                    <div
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Stylish Pagination */}
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
            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 dark:border-gray-100 ${
              currentPage === number ? "bg-blue-500 text-white" : ""
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
    </div>
  );
};

export default ClassPagination;
