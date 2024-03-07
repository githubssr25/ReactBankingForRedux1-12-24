import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const HomeAuthenticated = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("how many times is HomeAuthenticated getting renderengd purposes");


    const handleGetBankAccounts = async () => {
        navigate('/withdraw-deposit');
      }
    
      const handleRegisterNewBankAccount = async () => {
        navigate('/register-bank-account');
      }
      const handleGetTransactionHistory = async () => {
        navigate('/get-transaction-history');
      }

      const simpleBankAccountInfo = async () => {
        navigate('/simple-account-info');
      }
      const initiateTransaction = async () => {
        navigate('/initiate-transaction');
      }

      const pendingTransactions = async () => {
        navigate('/pending-transactions');
      }


return (
<div>
     <h1>Congrats! You have logged in</h1>
    <p>Pick which option you would like:</p>
    <div>
    <button onClick={handleGetBankAccounts}>Get Bank Accounts</button> 
    <button onClick={handleRegisterNewBankAccount}> Register New Checking Or Savings Bank Account</button>
    <button onClick={handleGetBankAccounts}> Withdraw or Deposit from your account</button>
    <button onClick={handleGetTransactionHistory}> Get Transaction History</button>
    <button onclick={simpleBankAccountInfo}> Get Simple Bank Account Info</button>
    <button onClick={initiateTransaction}> Initiate Transaction With Another Account</button>
    <button onClick={pendingTransactions}> Click Here to Manage Any Pending Transactions</button>
    </div>
    
</div>
)


}

export default HomeAuthenticated;