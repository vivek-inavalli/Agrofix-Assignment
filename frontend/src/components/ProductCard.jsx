import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-700">{product.type}</p>
        <p className="text-blue-600 font-bold mt-2">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="mt-4 flex space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-800 flex-1 text-center"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex-1"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
