import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankAccounts,
  fetchBankAccounts,
  updateBankAccounts,
} from "../../slices/bankAccountSlice";
import { initiateTransaction } from "../../slices/transactionSlice";
import { userSlice } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const InitiateTransaction = () => {
  const dispatch = useDispatch();
  const [showBankInfo, setShowBankInfo] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [bankAccountSendingID, setBankAccountSendingID] = useState(null);
  const [bankAccountReceivingID, setBankAccountReceivingID] = useState(null);
  const [successfulTransaction, setSuccessfulTransaction] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );
  const error = useSelector((state) => state.transactionState.error);
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const [remainingBalance, setRemainingBalance] = useState(null);

  useEffect(() => {
    dispatch(fetchBankAccounts({ customerID: customerID }));
  }, [dispatch]);

  const toggleBankAccountInfo = () => {
    setShowBankInfo(!showBankInfo);
  };

  const sendTransaction = async () => {
    try {
      const response = await dispatch(
        initiateTransaction({
          bankAccountSendingID,
          bankAccountReceivingID,
          transactionAmount,
        })
      );
      const { data, status } = response.payload;
      setResponseStatus(status);
      setSuccessfulTransaction(true);
      const balance = data.balance;
      setRemainingBalance(balance);
    } catch (error) {
      setSuccessfulTransaction(false);
      console.error("transaction initiation failed");
    }
  };

  return (
    <div>
      <Link to="/home-authenticated">
        <button>Click here to go back to home page</button>
      </Link>
      {showBankInfo && bankAccounts != null && (
        <div>
          <ul>
            {bankAccounts.map((bankAccount) => (
              <li
                key={bankAccount.bankAccountID}
                style={{ marginBottom: "10px" }}
              >
                BankAccount ID: {bankAccount.bankAccountID} <br />
                BankAccount Type: {bankAccount.bankAccountType} <br />
                Bank Account Balance: {bankAccount.balance} <br />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <p> Initiate Transaction With Another Account</p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Form Submitted", { transactionType });
          }}
        >
          <div>
            <label>Transaction Type</label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="">Select Transaction Type</option>
              <option value="send">Send Money</option>
              <option value="request">Request Money</option>
            </select>
          </div>
        </form>
        <div>
          <label>
            {transactionType === "send" ? "Amount to Send" : "Amount Requested"}
            <input
              type="number"
              id="transactionAmount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
          </label>
          {transactionType === "send"
            ? "Enter the bankAccountID of the customer you will be sending $$ to"
            : "Enter the BankAccountID of the customer you are requesting to send $$ from"}
          <label>
            <input
              type="number"
              id="receivingID"
              onChange={(e) => setBankAccountReceivingID(e.target.value)}
            />
          </label>
          <label>
            {transactionType === "request"
              ? "Enter the bankAccountID of your account you are requesting $$ to"
              : "Enter the BankAccountID of your account you are sending $$ from"}
            <input
              type="number"
              id="sendingID"
              onChange={(e) => setBankAccountSendingID(e.target.value)}
            />
          </label>
          <button
            onClick={() =>
              sendTransaction(
                bankAccountSendingID,
                bankAccountReceivingID,
                transactionAmount
              )
            }
          >
            Submit your transaction
          </button>

          <button onClick={() => toggleBankAccountInfo()}>
            {showBankInfo ? "Hide Bank Account Info" : "Show Bank Account Info"}
          </button>
        </div>
      </div>
      {successfulTransaction != null &&
        (successfulTransaction ? (
          <>
            {responseStatus === 200 && (
              <p>
                Transaction involving ${transactionAmount} was a success. Your
                current balance is ${remainingBalance}.
              </p>
            )}
            {responseStatus === 201 && (
              <p>
                Your request to receive ${transactionAmount} has been processed.
                You will be notified if the account you requested from approves
                your request.
              </p>
            )}
          </>
        ) : (
          error && (
            <div>
              {error.message && <p>Error Message: {error.message}</p>}
              {error.errorCode && <p>Error Code: {error.errorCode}</p>}
            </div>
          )
        ))}
    </div>
  );
};
export default InitiateTransaction;

// Dropdown (Select) Input
// In HTML, a <select> element creates a dropdown list. Each <option> within the <select> represents an item in the dropdown list. When a user clicks on the <select> element,
// it displays a scrollable list of options, allowing the user to select one. This interaction is built into the HTML <select> element,
//  so you don't need to write additional JavaScript to create the dropdown behavior; it's automatically handled by the browser.

// In your React form, when the Form.Control component is set with as="select", it renders as an HTML <select> element. The value of the selected <option> becomes the value of the <select> element.
//  This allows you to bind the selected value to a state variable (transactionType in your case), making the dropdown a controlled component in React.

//     {/* <Form>
//   <h1>Request Money From Another Account</h1>
//   <Form.Group controlId="transactionType">
//   <Form.Label> Enter Bank Account ID of Your Account You Want To Request Money To</Form.Label>
//   <Form.Control type="request" placeholder="Enter Your BankAccountID"/>
//  </Form.Group>
//  <Form.Group className="sendMoney" controlId="sendForm">
//   <Form.Label> Enter Bank Account ID of Your Account You Want To Request Money To</Form.Label>
//   <Form.Control type="send" placeholder="Enter Your BankAccountID"/>
//  </Form.Group>
//  <Button variant="primary" type="submit">
//         Submit
//       </Button>
//  </Form> */}
