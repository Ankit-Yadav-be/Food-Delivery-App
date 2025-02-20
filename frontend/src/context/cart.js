import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CardProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exist = localStorage.getItem("cart");
    if (exist) setCart(JSON.parse(exist));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { CardProvider, useCart };
