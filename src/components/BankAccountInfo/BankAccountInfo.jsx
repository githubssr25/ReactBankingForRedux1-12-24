import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankAccounts,
  fetchBankAccounts,
  updateBankAccounts,
} from "../../slices/bankAccountSlice";
import { userSlice } from "../../slices/userSlice";
import { Link } from "react-router-dom";

// have to dispatch the actions
// 2-27 to start with tomorrow you have to customize teh error response back if they try to withdraw too much saying ineligible remove 120 or w/e from request to do so vs also what if they entere wrong bank account ID

const BankAccountInfo = () => {
  const dispatch = useDispatch();
  //     const bankAccounts = useSelector(state => state.bankAccount.bankAccounts) || []; if it does have value return if not return empty array
  // const bankAccounts = useSelector(state => state.bankAccount.bankAccounts)|| [];
  // const bankAccounts = [];
  const entireState = useSelector((state) => state);
  console.log("will the entire state show", entireState);
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );
  console.log("what is cusotmerId value from the use selector", customerID);

  const [amount, setAmount] = useState(null);
  const [withdrawTrueOrFalse, setWithdrawTrueOrFalse] = useState(false);
  const [chosenBankAccountID, setChosenBankAccountID] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(null);
  const [transactionBalance, setTransactionBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // refer to line 4 and 53 for name this gets us data so what do we want to do with it? we just make simple para tag
  // where is data we are trying to use regarding useSelector
  // dispatch to send osmething liek asynch thunk do that action
  // when we want to get data though we have to do useSelector

  useEffect(() => {
    if (transactionSuccess !== null || errorMessage === "Invalid bank account ID. Please check and try again." ) {
      const timer = setTimeout(() => {
        setTransactionSuccess(null); // Clear the transaction message after 5 seconds
        setErrorMessage(null);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [transactionSuccess]); // This effect depends on transactionSuccess state

  const performFetchBankAccounts = async () => {
    console.log(
      "what is bankAccoutns from use selector before making dispatch call and entireState",
      bankAccounts,
      entireState
    );
    try {
      const response = await dispatch(fetchBankAccounts({ customerID }));
      console.log(
        "after dispatch in fetchBankAccounts inbankAccountInfo what is bankAccounts and setBankAccountState",
        bankAccounts
      );
    } catch (error) {
      console.error("fetching bank accounts failed", error);
    }
  };

  const performWithdrawOrDeposit = async (amount, chosenBankAccountID) => {
    if (bankAccounts == null) {
      performFetchBankAccounts();
    }
    setTransactionSuccess(null);
    console.log("what is value of bankaccounts", bankAccounts);
    const balanceVal = findBalance(chosenBankAccountID);
     // Check if balanceVal is null, indicating an invalid account ID was entered
  if (balanceVal === -9999) {
    return; // Exit the function to prevent further processing
  }
    try {
      const response = await dispatch(
        updateBankAccounts({
          bankAccountID: chosenBankAccountID,
          amount1: amount,
          balance1: balanceVal,
        })
      );
      console.log("what is state right after withdraw deposit", entireState);
      if (updateBankAccounts.fulfilled.match(response)) {
        console.log(
          "what is response.payload in perform withdraw or deposit",
          response.payload
        );
        const { balance } = response.payload;
        setTransactionBalance(balance);
        // const {amount, balance} = response.payload;
        // setTransactionBalance(balance);
        setTransactionSuccess(true);
      } else if (updateBankAccounts.rejected.match(response)) {
        setTransactionSuccess(false);
      } else {
        setTransactionSuccess(false);
      }
    } catch (error) {
      console.error("withdraw or deposit attempt failed", error);
    }
  };

  // bankAccounts && will find if its truthy if not it wont render it so wont execute on map of something that isnt defiend yet

  const findBalance = (chosenBankAccountID) => {
    const selectedAccount = bankAccounts.find(
      (account) => account.bankAccountID === Number(chosenBankAccountID)
    );
    if (selectedAccount) {
      return selectedAccount.balance;
    } else {
      setErrorMessage("Invalid bank account ID. Please check and try again.");
      return -9999;
    }
  };

  return (
    <div>
      <div className="welcomeBox" style={{ textAlign: "center" }}>
        <h1> choose from the following options: </h1>
      </div>
      <button type="button" onClick={() => performFetchBankAccounts()}>
        Click here to obtain bank account info
      </button>
      <>
        {bankAccounts && (
          <ul>
            {bankAccounts.map((bankAccount) => (
              <li
                key={bankAccount.bankAccountID}
                style={{ marginBottom: "10px" }}
              >
                Bank Account ID: {bankAccount.bankAccountID} <br />
                Bank Account Type: {bankAccount.bankAccountType} <br />
                Bank Account Balance: {bankAccount.balance} <br />
              </li>
            ))}
            <Link to="/home-authenticated">
              <button>Click here to go back to home page</button>
            </Link>
          </ul>
        )}
      </>
      <div>
        <p>
          {" "}
          If you want to Withdraw or Deposit From One of Your BankAccounts Fill
          Out the Info Below
        </p>
        <div>
          <label>
            Check this to deposit
            <input
              type="radio"
              id="deposit"
              name="transactionType"
              value="deposit"
              checked={!withdrawTrueOrFalse}
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
            How much do you want to deposit or withdraw from your account
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const enteredAmount = e.target.value;
                setAmount(
                  withdrawTrueOrFalse ? enteredAmount * -1 : enteredAmount
                );
              }}
            />
          </label>
          <label>
            Enter the BankAccountID you want to use for this Transaction.
            Remember there is also a button on this page you can click to get
            all your bank accounts info
            <input
              type="number"
              value={chosenBankAccountID}
              onChange={(e) => setChosenBankAccountID(e.target.value)}
            />
          </label>
        </div>
        <button
          onClick={() => performWithdrawOrDeposit(amount, chosenBankAccountID)}
        >
          Submit your withdrawal or deposit request
        </button>
      </div>
      <div>
        { errorMessage == "Invalid bank account ID. Please check and try again." && (
          <p> you have entered an invalid bank accountID please check your existing accounts and try again</p>
        )
         }
        {transactionSuccess != null &&
          (transactionSuccess ? (
            <p>
              {" "}
              transaction of $ {amount} was successful involving bankAccountID:{" "}
              {chosenBankAccountID} your remaining balance is:{" "}
              {transactionBalance}{" "}
            </p>
          ) : (
            <p>
              {" "}
              sorry the withdraw/deposit transaction attempt was unsuccessful
            </p>
          ))}
      </div>
    </div>
  );
};
export default BankAccountInfo;

//     useEffect( () => {
// dispatch(getBankAccounts({customerID: 2774}));
// console.log("are we getting into dispatch fetch bank accounts");
// dispatch(fetchBankAccounts({customerID: 2774}));
// If you want to fetch bank accounts only when the component loads and not on every re-render, placing your dispatch(fetchBankAccounts({customerID: 2774})); call inside a useEffect with an
// empty dependency array ([]) is the correct approach. This ensures that the data fetching occurs only once. If the data fetching should happen under different circumstances (e.g., in response to a user action), you might consider calling dispatch directly in an event handler function instead of using useEffect.
