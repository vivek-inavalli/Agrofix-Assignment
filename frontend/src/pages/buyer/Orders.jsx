import { useEffect, useState } from "react";
import axios from "axios";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders"); // Replace with actual endpoint
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total Items:</strong> {order.items.length}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default BuyerOrders;
