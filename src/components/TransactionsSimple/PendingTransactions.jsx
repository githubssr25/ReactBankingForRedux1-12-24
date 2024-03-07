import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankAccounts,
  fetchBankAccounts,
  updateBankAccounts,
} from "../../slices/bankAccountSlice";
import { userSlice } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import {
  getTransactionHistory,
  getPendingTransactionHistory,
} from "../../slices/transactionSlice";

const PendingTransactions = () => {
  const dispatch = useDispatch();
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );
  const pendingTransactions = useSelector(
    (state) => state.transactionState.pendingTransactions
  );
  const transactionHistory = useSelector(
    (state) => state.transactionState.transactionHistory
  );
  const [obtainPending, setObtainPending] = useState(null);
  const [acceptTransaction, setAcceptTransaction] = useState(null);

  useEffect(() => {
    try {
      dispatch(getPendingTransactionHistory({ customerID: customerID }));
      setObtainPending(true);
    } catch (error) {
      console.error("unable to obtain pending transactions", error);
      setObtainPending(false);
    }
  }, [dispatch]);

  return (
    <div>
      <h1>Manage pending transactions</h1>
      <ul>
        {pendingTransactions.map((pending) => (
          <li key={pending.transactionID} style={{ marginBottom: "10px" }}>
            Bank Account Sending ID: {pending.bankAccountSendingID} <br />
            Bank ACcount Receiving ID: {pending.bankAccountReceivingID} <br />
            Transaction Amount: {pending.transactionAmount} <br />
            Transaction ID: {pending.transactionID} <br />
            Pending Status: {pending.pending ? "Yes" : "No"} <br />
            <label>
              Check this to Accept
              <input
                type="radio"
                id="accept"
                name="acceptPEnding"
                value="pending"
                checked={acceptTransaction}
                onChange={() => setAcceptTransaction(true)}
              />
            </label>
          </li>
        ))}
      </ul>

      <Link to="/home-authenticated">
        <button>Click here to go back to home page</button>
      </Link>
    </div>
  );
};
export default PendingTransactions;

//     reducers: {
// addBankAccount: (state, action) => {
//     state.bankAccounts.push(action.payload);
//   },
//   getBankAccounts: (state, action) => {
//     state.bankAccounts = action.payload;
//     // console.log("do we ever get into here the bankAccount reducer the plain one as part of get accounts");
//   },
//   updateBankAccounts: (state, action) => {
//     const { bankAccountID, balance } = action.payload;
//    const index = state.bankAccounts.findIndex(bankAccount => bankAccount.bankAccountID === action.payload.bankAccountID);
//    state.bankAccounts[index].balance = balance;
//   },
// },
