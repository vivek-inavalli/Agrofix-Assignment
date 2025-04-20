import { useEffect, useState } from "react";
import axios from "axios";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/orders`
        );
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
          {orders.map((order) => {
            console.log(order); // Log to inspect the order structure
            return (
              <li key={order.id} className="mb-4">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total Items:</strong>{" "}
                  {Array.isArray(order.items) ? order.items.length : 0}
                </p>
                <ul>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <li key={index}>
                        <p>
                          <strong>Product:</strong> {item.productId}{" "}
                          {/* Adjust as needed */}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> {item.price}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>No items in this order.</p>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default BuyerOrders;
