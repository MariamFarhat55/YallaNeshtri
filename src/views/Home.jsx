import { useState, useEffect } from "react";
import axios from "axios";
import { StarFilled, StarOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Spin } from "antd";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to يلا نشتري YallaNeshtri
        </h1>
        <p className="text-lg md:text-xl mb-6">Discover the best products for you!</p>
        <Link
          to="/products"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          {t("shop_now")}
        </Link>
      </div>

      {/* Products Section */}
      <div className="container mx-auto mt-12 p-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t("featured_products")}</h2>
        {loading ? (
          <div className="text-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-xl transition"
              >
                <img
                  src={product.image || "/images/default-product.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-md"
                />
                <h3 className="text-sky-800 text-lg font-semibold mt-2 truncate whitespace-nowrap">
                  {product.title}
                </h3>
                <div className="flex items-center justify-center mt-1 text-yellow-500">
                  {[...Array(Math.round(product.rating?.rate || 3))].map((_, index) => (
                    <StarFilled key={index} />
                  ))}
                  {[...Array(5 - Math.round(product.rating?.rate || 3))].map((_, index) => (
                    <StarOutlined key={index} className="text-gray-400" />
                  ))}
                </div>
                <p className="text-lg font-bold text-blue-600 my-2">${product.price}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {t("view_details")}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t("no_products_available")}</p>
        )}
      </div>
    </div>
  );
}
