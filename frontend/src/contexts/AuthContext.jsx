import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [buyer, setBuyer] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBuyer = localStorage.getItem("buyer");
    const savedAdmin = localStorage.getItem("admin");
    if (savedBuyer) setBuyer(JSON.parse(savedBuyer));
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
    setLoading(false);
  }, []);

  const buyerLogin = async (contact, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/buyer/login",
        { contact, password }
      );

      // Save token and buyer data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("buyer", JSON.stringify(data.buyer));
      setBuyer(data.buyer);

      return data.buyer;
    } catch (error) {
      console.error(
        "Buyer login error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const buyerSignup = async (userData) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/buyer/signup",
      userData
    );
    return data;
  };

  const adminLogin = async (email, password) => {
    const { data } = await axios.post("http://localhost:3000/api/admin/login", {
      email,
      password,
    });
    setAdmin(data.admin);
    localStorage.setItem("admin", JSON.stringify(data.admin));
    return data.admin;
  };

  const adminSignup = async (userData) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/admin/signup",
      userData
    );
    return data;
  };

  const logout = () => {
    setBuyer(null);
    setAdmin(null);
    localStorage.removeItem("buyer");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider
      value={{
        buyer,
        admin,
        buyerLogin,
        buyerSignup,
        adminLogin,
        adminSignup,
        logout,
        isAuthenticated: !!buyer || !!admin,
        isBuyer: !!buyer,
        isAdmin: !!admin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
