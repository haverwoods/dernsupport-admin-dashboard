import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { format } from "date-fns";
import Invoice from "../../invoice/invoice";

const Orderlist = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBox, setShowBox] = useState(false);
  const currentMonth = format(new Date(), "MMMM");
  const [visibleBox, setVisibleBox] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const togglebox = (boxofindex) => {
    if (visibleBox === boxofindex) {
      setVisibleBox(null);
    } else {
      setVisibleBox(boxofindex);
    }
    // setShowBox(!showBox);
  };

  const invoice = () => {
    Invoice();
  };

  const fetchProducts = async () => {
    try {
      //fetch data from backend
      const response = await fetch(
        "http://localhost:5000/routes/request/request"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      //reverse order of fetched data so lastest order can be appear first
      const reversedata = data.reverse();
      setRequests(reversedata);
      setFilteredRequests(reversedata);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = requests.filter(
      (requests) =>
        requests.id.toLowerCase().includes(term) ||
        requests.customer.toLowerCase().includes(term)
    );
    setFilteredRequests(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        {requests.map((request) => (
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  user ID
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  problem description
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  user email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide divide-gray-700">
              {filteredRequests.map((requests, index) => (
                <motion.tr
                  key={requests.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {requests.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {requests.clientId}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        requests.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : requests.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : requests.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : requests.status === "Pending"
                          ? "bg-red-300 text-red-800"
                          : ""
                      }`}
                    >
                      {requests.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {requests.pickupDate || "No pickup date"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {requests.clientemail || "No email"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      // onClick={togglebox(index)}
                      onClick={() => togglebox(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Action
                    </button>
                    {/* //use modal like in product table and add link for invoice to pay  */}
                    {visibleBox === index && (
                      <div className="  flex justify-center  bg-gray-100 bg-opacity-50 z-50">
                        <div className="w-96  bg-white rounded-lg shadow-lg p-6 space-y-4 relative">
                          <h2 className="text-2xl font-bold text-gray-800">
                            {requests.clientemail}
                          </h2>
                          <p className="text-sm text-gray-600">
                            pickupdate: {requests.pickupDate}
                          </p>
                          <p className="text-gray-700  break-words whitespace-normal">
                            {requests.description}
                          </p>

                          <div className="space-y-2">
                            <label className="block text-gray-700 font-bold">
                              Status:
                            </label>
                            <select className="w-full px-4 py-2 border rounded-lg text-gray-700">
                              <option className="bg-red-300 text-red-800">
                                Pending
                              </option>
                              <option className="bg-yellow-100 text-yellow-800">
                                Processing
                              </option>
                              <option className=" bg-green-100 text-green-800">
                                delivered
                              </option>
                            </select>
                          </div>

                        </div>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </motion.div>
  );
};
export default Orderlist;
