import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";

const ApproveTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    refetch,
    data: allTrainer = [],
  } = useQuery({
    queryKey: ["allTrainer"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trainer`);

      return res?.data;
    },
  });

  const handleDeleteTrainer = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This trainer will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/trainer/${id}`).then((res) => {
          if (res.data.deleted?.deletedCount > 0) {
            Swal.fire("Deleted!", "Trainer has been removed.", "success");
            // Optional: refetch trainer list here
          }

          refetch();
        });
      }
    });
  };

  if (isPending) {
    return <Loader></Loader>;
  }

  if (isError) {
    return console.log("error");
  }

  console.log(allTrainer);

  return (
    <div>
      <div>
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Available Trainers
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
                  <th className="p-3"> Top 2 Skill</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3 text-right">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allTrainer?.map((res) => (
                  <tr
                    key={res?._id}
                    res={res}
                    className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                  >
                    <td className="p-3">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={res?.photo}
                        alt=""
                      />
                    </td>
                    <td className="p-3">
                      <p>{res?.fullName}</p>
                    </td>
                    <td className="p-3">
                      {res.skills.slice(0, 2).map((sk) => (
                        <p key={sk} className="flex">
                          {sk}
                        </p>
                      ))}
                    </td>
                    <td className="p-3">
                      <p>{res?.experience} Years</p>
                    </td>
                    <td className="p-3  text-right">
                      <p className="text-blue-500">Available</p>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteTrainer(res._id)}
                        className="px-3 py-1 cursor-pointer font-semibold rounded-md dark:bg-blue-600 dark:text-gray-50"
                      >
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default ApproveTrainer;
