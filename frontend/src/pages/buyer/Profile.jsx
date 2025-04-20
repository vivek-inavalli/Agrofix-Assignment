import { useEffect, useState } from "react";
import axios from "axios";

const BuyerProfile = () => {
  const [buyer, setBuyer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your profile.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/buyer/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.buyer) {
          setBuyer(response.data.buyer);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized: Please log in again.");
          localStorage.removeItem("buyer"); // Clear invalid token
        } else if (err.response && err.response.status === 400) {
          setError("Invalid token. Please log in again.");
          localStorage.removeItem("buyer");
        } else {
          setError("Failed to fetch profile. Please try again.");
        }
        console.error("Error fetching profile:", err);
      }
    };

    fetchBuyerProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Buyer Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {buyer ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>
            <strong>Name:</strong> {buyer.name}
          </p>
          <p>
            <strong>Contact:</strong> {buyer.contact}
          </p>
          <p>
            <strong>Delivery Address:</strong> {buyer.deliveryAddress}
          </p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default BuyerProfile;
