import { useState, createContext, useContext, useEffect } from "react";

const UpdateContext = createContext();

const UpdateProvider = ({ children }) => {
  const [Update, setUpdate] = useState("");

  useEffect(() => {
    let exist = localStorage.getItem("Update");
    if (exist) setUpdate(JSON.parse(exist));
  }, []);
  return (
    <UpdateContext.Provider value={[Update, setUpdate]}>
      {children}
    </UpdateContext.Provider>
  );
};

const useUpdate = () => useContext(UpdateContext);
export { UpdateProvider, useUpdate };
