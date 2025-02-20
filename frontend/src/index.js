import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { PriceProvider } from "./context/price";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CardProvider } from "./context/cart";
import { AuthProvider } from "./context/auth";
import {ChakraProvider} from "@chakra-ui/react";
import 'antd/dist/reset.css';
import { TokenProvider } from "./context/ordertoken";
import { UpdateProvider } from "./context/update";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <UpdateProvider>
   <CardProvider>
   <PriceProvider>
    <TokenProvider>
   <AuthProvider>
   <ChakraProvider>
   <App />
   </ChakraProvider>
   </AuthProvider>
   </TokenProvider>
   </PriceProvider>
  </CardProvider>
 </UpdateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
