import { useState, createContext, useContext, useEffect } from "react";

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    let exist = localStorage.getItem("token");
    if (exist) setToken(JSON.parse(exist));
  }, []);
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

const useToken = () => useContext(TokenContext);
export { TokenProvider, useToken };
