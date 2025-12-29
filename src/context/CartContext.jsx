import { createContext, useState } from "react";

// إنشاء الـ Context
const CartContext = createContext();

// مكون الـ Provider
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // دالة لإضافة أو إزالة العناصر من الكارت
  const handleCart = (item, action) => {
    if (action === "add") {
      setCartItems(prev => [...prev, item]);
    } else if (action === "remove") {
      setCartItems(prev => prev.filter(p => p.id !== item.id));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, handleCart }}>
      {children}
    </CartContext.Provider>
  );
};

// تصدير منفصل ثابت للـ Context والـ Provider
export { CartContext, CartProvider };



