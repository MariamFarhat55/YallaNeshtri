import { Routes, Route } from "react-router-dom"; 
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import Nav from "./layout/Nav";
import { ThemeContext } from "./context/ThemeContext";

import Home from "./views/Home";
import FeaturedProducts from "./views/FeaturedProducts";
import ProductDetails from "./views/SingleProduct";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Error from "./views/error";

function App() {
  const themeContext = useContext(ThemeContext);
  const { i18n } = useTranslation();

  return (
    <div
      className={`${
        themeContext.themeColor === "light"
          ? "text-gray-800"
          : "text-white bg-gray-800"
      } ${i18n.language === "ar" ? "rtl" : ""} min-h-dvh`}
    >
      {/* Nav شغال لكل الصفحات */}
      <Nav />

      {/* Routes لجميع الصفحات */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<FeaturedProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;



