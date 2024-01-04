import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";
import RegisterCustomer from "./components/RegisterCustomer/RegisterCustomer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage/NoPage";

// App.jsx is like brain for react app it is the entry pt for the app

function App() {
  const [count, setCount] = useState(0);

  //  <Route index element={<Home />} /> the index just means the normal / index just means / for path thats why we dont specifcy path
  // type tab after home will import location of it 828

  // browser router what it does is it helps you route to diff components
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
