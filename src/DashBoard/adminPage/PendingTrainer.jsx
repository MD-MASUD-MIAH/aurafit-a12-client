import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import { PageName } from "../../components/PageName";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";
const PendingTrainer = () => {
  const axiosSecure = useAxiosSecure();
  PageName("PendingTrainer");
  const {
    isPending,
    isError,
    data: pendingTrainer = [],
  } = useQuery({
    queryKey: ["pendingTrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-trainer`);
      return res?.data;
    },
  });

  if (isPending) {
    return <Loader></Loader>;
  }

  if (isError) {
    return console.log("error");
  }

  console.log(pendingTrainer);

  return (
    <div>
      {pendingTrainer.length === 0 ? (
        <div className="w-11/12 mx-auto mt-10 px-4 py-8">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Empty state illustration */}
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                No pending trainer Found
              </h2>

              <p className="text-gray-600 max-w-md">
                There are currently no trainer applications awaiting approval.
                All trainer requests have been reviewed, and there are no new
                submissions pending at this time.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Pending trainer
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Photo</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">applied</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3 text-right">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingTrainer?.map((res) => (
                  <tr
                    key={res._id}
                    res={res}
                    className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                  >
                    <td className="p-3">
                      <img className="h-10 w-10" src={res.photo} alt="" />
                    </td>
                    <td className="p-3">
                      <p>{res.fullName}</p>
                    </td>
                    <td className="p-3">
                      <p>{res.created_at}</p>
                      <p className="dark:text-gray-600">Friday</p>
                    </td>
                    <td className="p-3">
                      <p>{res.experience} Years</p>
                    </td>
                    <td className="p-3 text-right">
                      <p>{res.status}</p>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/dashboard/pending-details/${res._id}`}
                        className="px-3 py-1 cursor-pointer font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                      >
                        <span>Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col"></div>
    </div>
  );
};

export default PendingTrainer;
