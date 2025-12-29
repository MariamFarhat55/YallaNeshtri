import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, handleCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Product not found");
        navigate("/products");
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) return null;

  const isInCart = Array.isArray(cartItems) ? cartItems.some(item => item.id === product.id) : false;

  return (
    <section className="container mx-auto mt-20 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />

        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>

        <div className="flex text-yellow-500 mt-2">
          {[...Array(Math.round(product.rating?.rate || 3))].map((_, i) => (
            <StarFilled key={i} />
          ))}
          {[...Array(5 - Math.round(product.rating?.rate || 3))].map((_, i) => (
            <StarOutlined key={i} />
          ))}
        </div>

        <p className="text-blue-600 text-xl font-bold mt-2">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <button
          className={`mt-6 px-6 py-2 rounded-lg w-full ${
            isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
          onClick={() => !isInCart && handleCart(product, "add")}
          disabled={isInCart}
        >
          {isInCart ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
