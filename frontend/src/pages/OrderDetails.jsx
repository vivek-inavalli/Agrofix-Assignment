import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { buyer } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error || "Order not found"}</p>
        <Link
          to="/buyer/orders"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  // Ensure buyer can only see their own orders
  if (buyer && order.buyerId !== buyer.id) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: You do not have permission to view this order</p>
        <Link
          to="/buyer/orders"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
              <p className="text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <span
                className={`inline-block px-3 py-1 rounded-full ${
                  statusColor[order.status]
                }`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Buyer Details</h3>
              <p className="text-gray-600">{order.buyer.name}</p>
              <p className="text-gray-600">{order.buyer.contact}</p>
              <p className="text-gray-600">{order.buyer.deliveryAddress}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold mb-4">Order Items</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-right py-2 px-4">Price</th>
                  <th className="text-right py-2 px-4">Quantity</th>
                  <th className="text-right py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-2 px-4">{item.productId}</td>
                    <td className="py-2 px-4 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-right">{item.quantity}</td>
                    <td className="py-2 px-4 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 font-bold">
                  <td className="py-2 px-4" colSpan="3">
                    Total
                  </td>
                  <td className="py-2 px-4 text-right">
                    $
                    {order.items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          to="/buyer/orders"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-bold"
        >
          Back to Orders
        </Link>

        {order.status !== "DELIVERED" && (
          <div className="text-gray-600">
            <p>Your order is {order.status.toLowerCase().replace("_", " ")}.</p>
            <p>We'll notify you when there's an update.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
