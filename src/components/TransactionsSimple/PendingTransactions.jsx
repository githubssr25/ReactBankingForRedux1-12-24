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
  updatePendingTransactions,
} from "../../slices/transactionSlice";
import bankAccountSlice from "../../slices/bankAccountSlice";

const PendingTransactions = () => {
  const dispatch = useDispatch();
  const statusState = useSelector((state) => state.transactionState.status)
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const pendingTransactions = useSelector(
    (state) => state.transactionState.pendingTransactions
  );
  const transactionHistory = useSelector(
    (state) => state.transactionState.transactionHistory
  );
  const [obtainPending, setObtainPending] = useState(null);
  const [finalPendingDisplay, setFinalPendingDisplay] = useState([]);
  const [filteredPendingTransactions, setFilteredPendingTransactions] = useState([]);
  const [updatedPending, setUpdatedPending] = useState([]);


  // THIS IS ALL PART OF INITIALIZING CHECKBOX STATE 
  const [checkboxStates, setCheckboxStates] = useState(() => 
  pendingTransactions.reduce((acc, transaction) => ({
    ...acc,
    [transaction.transactionID] : transaction.accepted,
  }), {})
  );

  // need to pass dispatch into this inorder to dispatch NOTE THIS IS NOT SAME as useDispatch hook need this for when having to dispatch multiple thinks its thunk action not simple action
  const fetchAccountsAndPending = (customerID) => async (dispatch) => {
    await dispatch(fetchBankAccounts({customerID : customerID}));
    await dispatch(getPendingTransactionHistory({ customerID: customerID }));
  }
 
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAccountsAndPending(customerID));
      // Check Redux state directly after fetching data
      // Only set obtainedPending to true if both arrays have been populated
      if (bankAccounts.length > 0 && pendingTransactions.length > 0) {
        setObtainPending(true);
      } else {
        // Optionally, handle the case where data is not fetched properly
        console.error("Failed to fetch data or data is empty.");
      }
    };
    fetchData();
  }, [dispatch, customerID]);

  useEffect(() => {
    console.log("whati s value of obtainedPending, pendingTransactions, bankAccounts", obtainPending, pendingTransactions, bankAccounts);
    if(obtainPending){
      const filterTransactions = pendingTransactions.filter(transaction => 
        bankAccounts.some(bankAccount => bankAccount.bankAccountID === transaction.bankAccountSendingID)
        // SOME TEST WHETEHR AT LEAST ONE ELEMENT IN AN ARRAY PASSES TEST SO BASICALLY FOR EACN TRANSACTION WE GET ITS BANKACCOUNTSENDING ID 
        // THEN BANKACCOUNTS.SOME WILL ITERATE THROUGH EACH BANKACCOUNT AND ITS BANKACCOUNTID AND SEE IF ITS EQUAL TO TRANSACTION.BANKACCOUNTSENDINGID IF SO IT RETURNS TRUE
        // BY RETURNING TRUE THIS MEANS IT WILL INCORPORATE IT AS PART OF THE FILTER SO AS PART OF ARRAY WE ARE RETURNING
        );
        setFilteredPendingTransactions(filterTransactions);
      }
    }, [pendingTransactions, bankAccounts, obtainPending]);
// WE have to filter out all the pending transactions based on ones where we are sender we cant make decisions on ones where we are receiver asking for$$ 

console.log("what is value of bankAccounts and pendingTransactions", bankAccounts, pendingTransactions);

  const sendUpdatedPendingTransfers = async () => {
    console.log("what is checkboxStates", checkboxStates);
    const pendingList = pendingTransactions.map(transaction => {
      
      if(checkboxStates.hasOwnProperty(transaction.transactionID)) {
        return {
          ...transaction,
          accepted: checkboxStates[transaction.transactionID],
        };
      }
      return transaction;
    }).filter(transaction => transaction.accepted !== null);

    console.log("what is pendingList", pendingList);
    try {
      const response = await dispatch(updatePendingTransactions({pendingList: pendingList, customerID: customerID}));
      console.log("what is response and response.payload", response, response.payload);
      if (updatePendingTransactions.fulfilled.match(response)) {
        console.log("Response payload:", response.payload);
        // you have to iterate through each pendingTransaction because you might make decisions on multiple and hence have multiple returned back 
        response.payload.forEach(transaction => {
          const { bankAccountSendingID, remainingBalance } = transaction;
          console.log("Processing transaction - BankAccountSendingID:", bankAccountSendingID, "RemainingBalance:", remainingBalance);
      
          dispatch(bankAccountSlice.actions.updateBankAccounts({
            bankAccountID: bankAccountSendingID,
            balance: remainingBalance
          }));
        });
    
      setFinalPendingDisplay(response.payload);
      console.log("what is finalPendingDisplay", finalPendingDisplay);
      } else if(updatePendingTransactions.rejected.match(response)){
        console.log("what is response.payload if we get error for sendUpdatedPendingTransfers", response.payload);
      }
    } catch(error) {
      console.error("update for pending transfers failed", error);
    }
  };

  // 3) NOW THIS CALLED FROM handleAcceptedOrRejected(transactionID, isAccepted, (transactionID, isAccepted, newPendingTransactions, updatedCheckBoxState) => {
  const handleAcceptedOrRejected = (transactionIDParameter, isAccepted, callback) => {
    console.log('Is Accepted:', isAccepted);
        // IN SET CHECKBOX STATES YOU CAN GET ACCESS TO WHAT THE STATE WAS PRIOR TO THIS WHICH IS PREVCHECKBOX STATE AND UPDATE LIKE THIS VIA SPREAD OPERATOR
        setCheckboxStates(prevCheckBoxState => {
          const updatedCheckBoxState = {
            ...prevCheckBoxState,
            [transactionIDParameter]: isAccepted,
          };
      // 1) YOU FIRST SET THE CHECKBOX ARRAY VALUE WHICH IS TRANSACTION ID: ACCEPTED TO BE TRUE OR FALSE FOR EACH ID BASED ON IF YOU CHECK
      // 2) THEN WHEN DONE AND IN SENDUPDATEDPENDINGTRANSFERS YOU USE THE ISACCEPTED VALUE FROM THE CHECKBOXSTATE AND USE TEH MAP FUNCTION 
      // TO FOR YOUR PENDING TRANSACTION OBJECT TO SEND BACK HAVE AN UPDATED ACCEPT VALUE THAT ISNT NULL
   
      // If a callback is provided, call it with the new states
    // 4) NOW YOU HAVE YOUR CALLBACK FROM HERE (transactionID, isAccepted, newPendingTransactions, updatedCheckBoxState) => { IN 3) 
    if (callback) {
      callback(transactionIDParameter, isAccepted, updatedCheckBoxState);
    }
    return updatedCheckBoxState;
  });
};

// 1) FIRST CALL 
const debugHandleAcceptedOrRejected = (transactionID, isAccepted) => {
  // Call handleAcceptedOrRejected and pass this function as a callback for additional debugging
  // 2) NOW CALL THIS AND YOU PASS IN PARAMETERS FOR WHAT YOU WANT TO CALL BACK LATER 
  handleAcceptedOrRejected(transactionID, isAccepted, (transactionID, isAccepted, updatedCheckBoxState) => {
    // 5) NOW FROM CALL BACK ABOVE COME HERE 
    console.log(`Debugging after handleAcceptedOrRejected: Transaction ID: ${transactionID}, Is Accepted: ${isAccepted}`);
    console.log('Updated checkbox state:', updatedCheckBoxState);
    // Additional debugging or checks can be done here
  });
};

  //       checked={pending.accepted === true} THIS WONT WORK AND ITS A KEY PT 
  // HAVE TO ACTUALLY BIND IT TO A STATE THE CHECKED A STATE VARIABLE YOU CREATE UP TOP NOT PENDING.ACCEPTED 

  console.log("what is value of finalPendingDisplay", finalPendingDisplay);
  return (
    <div>
      <h1>Manage pending transactions</h1>
      <ul>
        {filteredPendingTransactions.map((pending) => (
          <li key={pending.transactionID} style={{ marginBottom: "10px" }}>
            Bank Account Sending ID: {pending.bankAccountSendingID} <br />
            Bank ACcount Receiving ID: {pending.bankAccountReceivingID} <br />
            Transaction Amount: {pending.transactionAmount} <br />
            Transaction ID: {pending.transactionID} <br />
            Pending Status: {pending.pending ? "Yes" : "No"} <br />
            Accepted: {pending.accepted ? "Yes" : "No"} <br/>
            <label>
              Check this to Accept
              <input
                type="checkbox"
                id={`accept-${pending.transactionID}`}
                name={`transaction-${pending.transactionID}`}
                checked={checkboxStates[pending.transactionID] === true}
                onChange={(e) => {
                  const value = e.target.checked;
                  debugHandleAcceptedOrRejected(pending.transactionID, value ? true : null);
                }}
              />
            </label>
            <label>
              Check this to Reject
              <input
                type="checkbox"
                id={`reject-${pending.transactionID}`}
                name={`transaction-${pending.transactionID}`}
                checked={checkboxStates[pending.transactionID] === false}
                onChange={(e) => {
                  const value = e.target.checked;
                  debugHandleAcceptedOrRejected(pending.transactionID, value ? false : null);
                }}
              />
            </label>
          </li>
        ))}
      </ul>

      {finalPendingDisplay.length > 0 && (
             <div>
        <p> following transaction were approved and you can note the remaining balance in your account now </p>
        <ul>
          {finalPendingDisplay.map((pending) => (
        <li key={finalPendingDisplay.transactionID}
            style={{ marginBottom: "10px"}}
            >
              bankAccountSendingID--Account You Sent From: {pending.bankAccountSendingID} < br />
              Remaining Balance in Account You Sent From: {pending.remainingBalance} < br />
              bankAccountReceivingID--Account You Sent Money To: {pending.bankAccountReceivingID} < br/>
              Transaction ID: {pending.transactionID} < br/>
            </li>
      ))}
            </ul>
                </div>
      )}

      <button onClick={sendUpdatedPendingTransfers}> Click Here When You Have Finalized Your Decisions On Your Pending Transfers To Update the Account Info  </button>

      <Link to="/home-authenticated">
        <button>Click here to go back to home page</button>
      </Link>
    </div>
  );
};
export default PendingTransactions;


// 
  // THIS IS ALL PART OF INITIALIZING CHECKBOX STATE 
  // const [checkboxStates, setCheckboxStates] = useState(() => 
  // pendingTransactions.reduce((acc, transaction) => ({
  //   ...acc,
  //   [transaction.transactionID] : transaction.accepted,
  // }), {})
  // );
  //  initializes the checkboxStates state variable with an object that maps each transaction's transactionID to its accepted status.
  // The initial value for the accumulation (acc in your code) is an empty object {}.
// IMPORTANT: For each transaction, the reduce function creates a new entry in the accumulated object, where the key is transaction.transactionID and the value is transaction.accepted.
  // this method is used to create a mapping object that keeps track of the "accepted" status for each transaction
  // basically what checkboxStates is and what this method helps create here 
  // { 1 and 2 would correspnd to transactionID and null and true correspond to the accepted variable 
//   1: null, // Corresponds to the first transaction's accepted status
//   2: true, // Corresponds to the second transaction's accepted status }
// ex {
//   "123": true,
//   "456": false,
//   "789": true
// }


  // WHY HAVE if(checkboxStates.hasOwnProperty(transaction.transactionID)) {? 
  // If checkboxStates has a property matching transaction.transactionID, it means the user has interacted with this transaction (either accepting or rejecting it).
  //  Only then do we consider this transaction's accepted status from checkboxStates for further processing.
// Transactions for which there hasn't been any user interaction won't have their IDs in checkboxStates, so their accepted status won't be updated in this mapping process.



// Why checked={pending.accepted === true} Might Not Work as Expected
// React State and Immutability: React's state updates rely on immutability for efficient change detection. If pendingTransactions is part of React's state (either in local component state or in Redux), directly mutating an item within this array (e.g., changing accepted from null to true or false) doesn't create a new reference.
// React may not detect this direct mutation as a state change, leading to no re-render.


// Using the spread operator (...) in state updates helps ensure React detects changes because it creates a new object or array rather than mutating the existing one. 
// This pattern creates a new object for checkboxStates, which has a different reference from the previous state. When React sees a new reference, it knows the state has changed and triggers a re-render of the component, ensuring the UI reflects the latest state.


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


    // If a matching transaction is found
    // if (selectedPendingIndex !== -1) {
    //   // Create a new transaction object with updated values
    //   const updatedTransaction = {
    //     ...pendingTransactions[selectedPendingIndex],
    //     pending: false,
    //     accepted: isAccepted
    //   };
    // }



    // const handleAcceptedOrRejected = (transactionIDParameter, isAccepted) => {
    //   const numTransactionID = Number(transactionIDParameter);
    //   const updatedTransactions = pendingTransactions.map((transaction) => {
    //     if(transaction.transactionID === numTransactionID){
    //       const updatedTrans = {
    //         ...transaction,
    //         accepted: isAccepted,
    //       };
    //       return updatedTrans;
    //     }
    //     return transaction;
    //   })
    //   setUpdatedPending(updatedTransactions);
  
    // };
  


    // THIS IS REALLY IMPORTANT ABOUT REACT 3-12-24 

    // Understanding React's Shallow Comparison for Re-rendering
// Imagine you have a list of fruits (your pendingTransactions), and each fruit can be marked as "fresh" (your accepted property).

// javascript
// Copy code
// let fruits = [
//   { name: "Apple", fresh: true },
//   { name: "Banana", fresh: false }
// ];
// Think of React's state like a shopping list. When you go to the store with a list, 
// and you come back with the exact same list (even if the items on the list have changed in some way, like being crossed off), from an outside perspective, nothing has changed
//  - it's still the same piece of paper with the same items. React works similarly with state; if it sees the "same list" (the same reference), it assumes nothing has changed.

// If you decide the banana is actually fresh and directly change it:

// javascript
// Copy code
// fruits[1].fresh = true;
// You've modified the item on your list, but you're still holding the same piece of paper (the same array reference). React looks at your paper and says, "This looks like the same list to me," and does nothing (no re-render).
// But, if you give React a new list (even if it has the same items), React sees a new piece of paper and says, "This is a new list, let me re-check everything." That's what we do with the spread operator (...), creating a new list (array/object) for React to notice.