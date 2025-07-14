import { BarChart, PieChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaUserCheck, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../shared/Loader";
const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { isPending, data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribers");
      return res.data;
    },
  });

  const { data: bookedData = [] } = useQuery({
    queryKey: ["bookedData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booked");
      return res.data;
    },
  });

  if (isPending) {
    return <Loader />;
  }

  const totalAmount = bookedData.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // Chart data
  const chartData = [
    { label: "Subscribers", value: subscribers.length, color: "#6366f1" },
    { label: "Paid Members", value: bookedData.length, color: "#10b981" },
  ];

  return (
    <div className="p-6 mt-10 md:mt-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscribers Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-indigo-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FaUsers className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Newsletter Subscribers
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {subscribers.length}
              </p>
            </div>
          </div>
        </div>

        {/* Paid Members Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaUserCheck className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Paid Members
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {bookedData.length}
              </p>
            </div>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaMoneyBillWave className="text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                Total Collected Amount
              </p>
              <p className="text-3xl font-bold text-gray-800">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Subscribers vs Paid Members
          </h2>
          <div className="h-80">
            <BarChart
              series={[
                {
                  data: [subscribers.length],
                  label: "Subscribers",
                  color: "#6366f1",
                },
                {
                  data: [bookedData.length],
                  label: "Paid Members",
                  color: "#10b981",
                },
              ]}
              xAxis={[{ scaleType: "band", data: ["Comparison"] }]}
              margin={{
                left: 70,
                right: 30,
                top: 30,
                bottom: 50,
              }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  labelStyle: { fontSize: "0.875rem" },
                },
              }}
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Distribution
          </h2>
          <div className="h-80">
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  labelStyle: { fontSize: "0.875rem" },
                },
              }}
              margin={{
                top: 30,
                bottom: 80,
                left: 30,
                right: 30,
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs  font-bold uppercase tracking-wider">
                    Member Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs  font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs  font-bold uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs  font-bold uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookedData.slice(0, 6).map((row) => (
                  <tr key={row._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row.memberName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row.memberEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      ${row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
