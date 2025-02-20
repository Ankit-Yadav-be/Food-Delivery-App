import { useState, createContext, useContext, useEffect } from "react";

const PriceContext = createContext();

const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState("");
  useEffect(() => {
    let exist = localStorage.getItem("price");
    if (exist) setPrice(JSON.parse(exist));
  }, []);
  return (
    <PriceContext.Provider value={[price, setPrice]}>
      {children}
    </PriceContext.Provider>
  );
};

const usePrice = () => useContext(PriceContext);
export { PriceProvider, usePrice };
