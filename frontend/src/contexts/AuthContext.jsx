import { createContext, useState, useContext, useEffect } from "react";

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
      const response = await fetch("http://localhost:3000/api/buyer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setBuyer(data.buyer);
      localStorage.setItem("buyer", JSON.stringify(data.buyer));
      return data.buyer;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const buyerSignup = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/api/buyer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setAdmin(data.admin);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      return data.admin;
    } catch (error) {
      console.error("Admin login error:", error);
      throw error;
    }
  };

  const adminSignup = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      return data;
    } catch (error) {
      console.error("Admin signup error:", error);
      throw error;
    }
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
