import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../shared/Loader";

const Testimonials = () => {
  const { isPending, data: comments = [] } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  console.log(comments);

  
  return (
    <div>
      <div className="w-11/12 mx-auto py-14 px-4">
        <h2 className="text-3xl font-bold text-center  mb-10">
          What Our Members Say
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {comments.map((res) => (
            <SwiperSlide key={res._id}>
              <div className="bg-white rounded-xl shadow-md p-6 my-10 text-center h-full flex flex-col items-center justify-between">
                <img
                  src={res.userImage}
                  alt={res.userName}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <p className="text-yellow-500 text-xl mb-2">
                  {"★".repeat(res.rating)}
                  {"☆".repeat(5 - res.rating)}
                </p>
                <p className="font-semibold text-lg mb-2">{res.userName}</p>
                <p className="text-gray-600">{res.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
