import { useState, useEffect } from "react";
import axios from "axios";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Products fetched:", response.data); // Debug
        setProducts(response.data); // ✅ Use response.data directly
        setFetching(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetching(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 500);
  };

  if (fetching) {
    return (
      <div className="text-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        No products available
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 text-center"
          >
            <img
              src={product.image} // ✅ Should work since /images/... is correct
              alt={product.title}
              className="w-full h-40 object-contain"
            />
            <h3 className="text-lg font-semibold mt-2 truncate">{product.title}</h3>
            <div className="flex justify-center text-yellow-500">
              {[...Array(Math.round(product.rating?.rate || 3))].map((_, i) => (
                <StarFilled key={i} />
              ))}
              {[...Array(5 - Math.round(product.rating?.rate || 3))].map((_, i) => (
                <StarOutlined key={i} />
              ))}
            </div>
            <p className="text-blue-600 font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;








