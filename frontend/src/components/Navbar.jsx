import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { buyer, admin, logout, isAuthenticated, isBuyer, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-bold text-xl">
            Agrofix
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>

            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
                <Link to="/admin/products" className="hover:text-gray-300">
                  Manage Products
                </Link>
                <Link to="/admin/orders" className="hover:text-gray-300">
                  Manage Orders
                </Link>
              </>
            ) : (
              <Link to="/cart" className="hover:text-gray-300 relative">
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {isBuyer && (
              <>
                <Link to="/buyer/orders" className="hover:text-gray-300">
                  My Orders
                </Link>
                <Link to="/buyer/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/buyer/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Buyer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/products"
              className="block hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>

            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="block hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/products"
                  className="block hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage Products
                </Link>
                <Link
                  to="/admin/orders"
                  className="block hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Manage Orders
                </Link>
              </>
            ) : (
              <Link
                to="/cart"
                className="block hover:text-gray-300 relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
                {itemCount > 0 && (
                  <span className="absolute ml-2 inline-block bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {isBuyer && (
              <>
                <Link
                  to="/buyer/orders"
                  className="block hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  to="/buyer/profile"
                  className="block hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/buyer/login"
                  className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Buyer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
