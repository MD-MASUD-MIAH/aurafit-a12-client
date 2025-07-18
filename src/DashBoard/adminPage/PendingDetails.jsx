import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { PageName } from "../../components/PageName";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";
import ModalForm from "./ModalForm";

const PendingDetails = () => {
  PageName("Applier Details");
  const [isShowing, setIsShowing] = useState(false);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: singleData = {} } = useQuery({
    queryKey: ["singleData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  console.log(singleData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosSecure.patch(`/trainer/approve/${id}`).then((res) => {
      console.log(res.data);

      if (res.data) {
        Swal.fire({
          title: "Trainer Approved!",
          text: "The trainer's role has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      navigate("/dashboard/pending-trainer");
    });
  };

  const handleSubmi = async (e) => {
    e.preventDefault();
    await axiosSecure
      .patch(`/trainer/reject/${id}`, { feedback: feedback })
      .then((res) => {
        if (res.data.result.modifiedCount > 0) {
          Swal.fire("Rejected!", "Trainer has been rejected.", "info");
          // Optional: refetch or remove from pending list
        }

        navigate("/dashboard/pending-trainer");
      });

    setIsShowing(false);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <ModalForm
        handleSubmi={handleSubmi}
        setFeedback={setFeedback}
        feedback={feedback}
        singleData={singleData}
        isShowing={isShowing}
        setIsShowing={setIsShowing}
      ></ModalForm>

      <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <img
            src={singleData.photo}
            alt=""
            className="object-cover w-full lg:absolute h-80 lg:h-full"
          />
          <svg
            className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              {singleData.status === "pending"
                ? "New Trainer"
                : "Available Now"}
            </p>
          </div>
          <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
            {singleData.fullName}
          </h5>
          <div className="mb-5 text-gray-800">
            <p className="mb-3">
              <span className="font-bold">{singleData.experience} years</span>{" "}
              of training experience
            </p>
            <p className="mb-3">
              <span className="font-bold">Availability:</span>{" "}
              {singleData.availableDays?.join(", ")}
            </p>
            <p className="mb-3">
              <span className="font-bold">Skills:</span>{" "}
              {singleData.skills?.join(", ")}
            </p>
            <p className="mb-3">
              <span className="font-bold">Time Slots:</span>{" "}
              {singleData.timeSlots?.join(", ")}
            </p>
            <p className="mb-3">
              <span className="font-bold">Bio:</span>{" "}
              {singleData.bio || "Professional fitness trainer"}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={handleSubmit} type="submit" className="tom-btn">
              Approve
            </button>
            <button
              onClick={() => setIsShowing(true)}
              type="submit"
              className="rej-btn"
            >
              Reject
            </button>
            <div className="flex space-x-4 ml-5">
              {singleData.socialLinks?.facebook && (
                <a
                  href={singleData.socialLinks?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}
              {singleData.socialLinks?.instagram && (
                <a
                  href={singleData.socialLinks?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDetails;
