import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-600 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to E-Shop</h1>
        <p className="text-xl mb-6">
          Discover amazing products at great prices
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200">
            <h3 className="text-xl font-bold mb-2">Electronics</h3>
            <p className="mb-4">Latest gadgets and devices</p>
            <Link to="/products" className="text-blue-600 hover:underline">
              Browse Electronics
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200">
            <h3 className="text-xl font-bold mb-2">Clothing</h3>
            <p className="mb-4">Fashionable apparel for all</p>
            <Link to="/products" className="text-blue-600 hover:underline">
              Browse Clothing
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200">
            <h3 className="text-xl font-bold mb-2">Home & Kitchen</h3>
            <p className="mb-4">Everything for your home</p>
            <Link to="/products" className="text-blue-600 hover:underline">
              Browse Home & Kitchen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
