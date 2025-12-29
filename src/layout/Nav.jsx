import { Link } from "react-router-dom";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge, message } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import logo from "/icon.png";

export default function Nav() {
  const themeContext = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out");
    window.location.reload();
  };

  return (
    <nav className={`shadow-md p-4 w-full ${themeContext.themeColor === "light" ? "text-gray-800" : "text-white bg-gray-800"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"><img src={logo} width={30} alt="logo" /></Link>
        <div className="flex items-center space-x-6">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined className="text-xl" />
            </Badge>
          </Link>
          {!token && <Link to="/login">Login</Link>}
          {token && <LogoutOutlined className="cursor-pointer" onClick={handleLogout} title="Logout" />}
        </div>
      </div>
    </nav>
  );
}

