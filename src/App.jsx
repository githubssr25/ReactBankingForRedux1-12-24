import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";
import RegisterCustomer from "./components/RegisterCustomer/RegisterCustomer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage/NoPage";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-account" element={<RegisterAccount />} />
          <Route path="register-customer" element={<RegisterCustomer />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
