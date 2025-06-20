import { useState, useEffect } from "react";
import axios from "axios";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/all-orders",
          {
            withCredentials: true,
          }
        );
        setOrders(response.data || []);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Unauthorized access
          setError("You are not authorized to view this page. Please log in.");
        } else if (err.message.includes("Network Error")) {
          setError(
            "We couldn't verify your session. Please log in to continue."
          );
        } else {
          setError("Failed to load orders. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReject = (order) => {
    setOrders(
      orders.map((o) =>
        o._id === order._id ? { ...o, status: "rejected" } : o
      )
    );
  };

  const handleComplete = (order) => {
    setOrders(
      orders.map((o) =>
        o._id === order._id ? { ...o, status: "completed" } : o
      )
    );
  };

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "Quantity",
    "Notes",
    "Status",
    "Actions",
  ];

  if (loading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b bg-gray-50 text-left text-sm font-medium text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.fullName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.notes}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReject(order)}
                      className="bg-red-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => handleComplete(order)}
                      className="bg-green-600 text-white text-sm font-medium py-1 px-3 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                    >
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
