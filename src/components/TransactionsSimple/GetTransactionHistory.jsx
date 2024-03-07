import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTransactionHistory} from "../../slices/transactionSlice";

const ObtainTransactionHistory = () => {
const dispatch = useDispatch();
const customerID = useSelector((state) => state.currentUser.currentUserCustomerID);
const transactionHistory = useSelector(state => state.transactionState.transactionHistory);
const [obtainedHistory, setObtainedHistory] = useState(null);
const [displayArrayTransactions, setDisplayArrayTransactions] = useState([]);

const obtainTransactionHistory = async (chosenOption) => {
    setDisplayArrayTransactions([]); // Clear the current transactions before fetching new ones
    try {
        const response = await dispatch(getTransactionHistory({chosenOption, customerID}));
       const array = sortTransactionHistory(chosenOption);
       setDisplayArrayTransactions(array);
        setObtainedHistory(true);
    } catch(error){
        console.error("failed to retreive transaction history", error);
        setObtainedHistory(false);
    }
}

const sortTransactionHistory = (chosenOption) => {
    const transactionsArrays = Object.values(transactionHistory);

    if(chosenOption === 2){
        transactionsArrays.sort((a,b) => a.bankAccountSendingID - b.bankAccountSendingID);
    } else if(chosenOption === 3){
        transactionsArrays.sort((a,b) => a.bankAccountReceivingID - b.bankAccountReceivingID);
    } else if (chosenOption === 1) {
        transactionsArrays.sort((a,b) => a.transactionID - b.transactionID);
    } else {
        console.log("error could not sort")
    }
    return transactionsArrays;
}



return (
    <div>
        <h1> Transaction history </h1>
        <button onClick ={() => obtainTransactionHistory(1)}>
            Get Transaction History for all transactions
        </button>
        <button onClick ={() => obtainTransactionHistory(2)}>
            Get transaction history where you were the sender
        </button>
        <button onClick={() => obtainTransactionHistory(3)}>
            Get Transaction history where you were the receiver 
        </button>
        {obtainedHistory != null ? (
          obtainedHistory ? (
            <ul>
            {displayArrayTransactions.map(transaction => (
                <li 
                key ={transaction.transactionID}
                style={{ marginBottom: "10px"}}
                >
                Bank Account Sending ID {transaction.bankAccountSendingID} <br />
                Bank Account Receiving ID {transaction.bankAccountReceivingID} <br/>
                Transaction Amount: {transaction.transactionAmount} <br/>
                Transaction ID: {transaction.transactionID} <br/>
                Pending : {transaction.pending ? " Yes" : "No"}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </li>
            ))}
            </ul>
        ) : (
            <p> Transaction History could not be obtained</p>
        ) 
          ) : null}
        <Link to="/home-authenticated">
        <button>Click here to go back to home page</button>
      </Link>
    </div>
);
}

export default ObtainTransactionHistory;