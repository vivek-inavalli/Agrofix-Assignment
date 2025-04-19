import { useEffect, useState } from "react";
import axios from "axios";

const BuyerProfile = () => {
  const [buyer, setBuyer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerProfile = async () => {
      try {
        const token = localStorage.getItem("buyer");

        if (!token) {
          setError("Please log in to view your profile.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/buyer/profile",
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
        setError("Failed to fetch profile. Please try again.");
        console.log(err);
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
