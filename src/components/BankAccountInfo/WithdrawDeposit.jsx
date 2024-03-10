import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankAccounts,
  fetchBankAccounts,
  updateBankAccountsThunk,
} from "../../slices/bankAccountSlice";
import { userSlice } from "../../slices/userSlice";
import { Link } from "react-router-dom";

const WithdrawDeposit = () => {
  const dispatch = useDispatch();
  const entireState = useSelector((state) => state);
  const [amount, setAmount] = useState(null);
  const [withdrawTrueOrFalse, setWithdrawTrueOrFalse] = useState(false);
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const [displayBankInfo, setDisplayBankInfo] = useState(false);
  const [indBankAccountID, setIndBankAccountID] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successDepositWithdraw, setSuccessfulDepositWithdraw] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);

  const viewBankAccountInfo = () => {
    setDisplayBankInfo(true);
  }

  const submitTransaction = async () => {
    const transactionAmount = withdrawTrueOrFalse ? -Math.abs(amount) : amount;
    setAmount(transactionAmount);
    const balanceVal = findBalance(indBankAccountID);
    try {
      const response = await dispatch(updateBankAccountsThunk({bankAccountID: indBankAccountID, amount1: transactionAmount, balance1: balanceVal}));
      console.log("what is response and response.payload", response, response.payload);
      if(updateBankAccountsThunk.fulfilled.match(response)) {
        console.log(
          "what is response.payload in perform withdraw or deposit",
          response.payload
        );
        console.log("what is the response right now not response.payload", response);
        const {balance, amount} = response.payload;
        setRemainingBalance(balance);
      setSuccessfulDepositWithdraw(true);
      } else if(updateBankAccountsThunk.rejected.match(response)) {
        console.log("what is response.payload if we get error in withdrawdeposit", response.payload);
        const {errorCode, errorType} = response.payload;
        setErrorMessage(errorType);
        setSuccessfulDepositWithdraw(false);
      } else {
        setSuccessfulDepositWithdraw(false);
      }
    } catch(error){
      console.error("withdraw or deposit attempt failed", error);
    }

  }

  const findBalance = (indBankAccountID) => {
    const selectedAccount = bankAccounts.find(account => account.bankAccountID === indBankAccountID);
    if (selectedAccount) {
      return selectedAccount.balance;
    } else {
      setErrorMessage("Invalid bank account ID. Please check and try again.");
      return;
    }
  };

  useEffect(() => {
    dispatch(fetchBankAccounts({  customerID: customerID }));
  }, [dispatch]);

  return (
    <div>
      <h> Withdraw or Deposit from Your Own Account</h>

      <button onClick={viewBankAccountInfo}> Click Here to Display Your Bank Account Info </button>

      <label>
        Check this to deposit
        <input
          type="radio"
          id="deposit"
          name="transactionType"
          value="withdraw"
          checked={withdrawTrueOrFalse}
          onChange={() => setWithdrawTrueOrFalse(false)}
        />
      </label>
      <label>
        Check this to withdraw
        <input
          type="radio"
          id="withdraw"
          name="transactionType"
          value="withdraw"
          checked={withdrawTrueOrFalse}
          onChange={() => setWithdrawTrueOrFalse(true)}
        />
      </label>
      <label>
        Enter The Amount You Want To Withdraw or Deposit
        <input
        type = "number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>

      <label>
        Enter The BankAccountID you want to use for this transaction. Remember you can click the button up top to obtain your bank account info which will display the bankAccountID of all your accounts
        <input
        type = "number"
        value={indBankAccountID}
        onChange={(e) => setIndBankAccountID(Number(e.target.value))}
        />
      </label>
      <button onClick={submitTransaction}> Submit Transaction </button>
      <Link to="/home-authenticated">
              <button>Click here to go back to home page</button>
      </Link>

      { displayBankInfo && (
        <ul>
          {bankAccounts.map(bankAccount => (
            <li
            key={bankAccount.bankAccountID}
            style={{marginBottom: "10px"}}
            >
            Bank Account ID: {bankAccount.bankAccountID} <br />
            Bank Account Type: {bankAccount.bankAccountType} <br/>
            Bank Account Balance: {bankAccount.balance} < br/>
            </li>
          ))}
        </ul>
      )
      }
      { successDepositWithdraw != null && (
       successDepositWithdraw ? (
        <p> Your {withdrawTrueOrFalse ? 'withdrawal' : 'deposit'} involving {amount} was successful. Your remaining balance is {remainingBalance} </p>
      ) : (
        <p> Sorry but your transaction was unsuccessful with the following error: {errorMessage} </p>
      ))}
      </div>
  )
};

export default WithdrawDeposit;
