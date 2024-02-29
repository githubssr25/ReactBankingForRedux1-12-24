
import "./App.css";
// import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";
import RegisterCustomer from "./components/RegisterCustomer/RegisterCustomer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage/NoPage";
import BankAccountInfo from "./components/BankAccountInfo/BankAccountInfo";
import HomeUnauthenticated from "./components/Home/homeUnauthenticated";
import { useSelector } from "react-redux";
import HomeAuthenticated from "./components/Home/HomeAuthenticated";
import RegisterBankAccount from "./components/RegisterBankAccount/RegisterBankAccount";

// we need a provider have to surround whole browser router w provider so every component has access to global store data 
// provider needs to know about store 
//  store = {store}>  tells provider about where redux store is at and will propagate to every child component 2-22 this is how to read info from store becasue provider is top parent 
// we wont combine reducers we will just configure store which he said is similar to combining reducer 

{/* <Route index element={<Home />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}

function App() {
  console.log('Setting up routes');
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register-account" element={<RegisterAccount />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/view-accounts" element={<BankAccountInfo />} />
          <Route path="*" element={<HomeUnauthenticated />} />
          <Route path="/home-unauthenticated" element ={<HomeUnauthenticated/>} />
          <Route path="/home-authenticated" element ={<HomeAuthenticated/>} />
          <Route path="/register-bank-account" element ={<RegisterBankAccount/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
