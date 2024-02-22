import React, { useState } from "react";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { dispatch } from "redux";
import { registerAccountAxn } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, setAccountType } from "../../actions/bankAccountActions";
import { addBankAccounts } from "../../slices/bankAccountSlice";
import { addBankAccount } from "../../slices/bankAccountSlice";

const RegisterAccount = ({ handleSuccessfulRegister }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Assuming you'll use this for something
  const [isSavings, setSavings] = useState(true);

   // Access state for loading, success, and error feedback
   const { accountType, isAccountRegistered, status, error } = useSelector((state) => state.bankAccount);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      // Dispatch the addBankAccounts thunk for the API call
      await dispatch(addBankAccounts({ customerID: username, isSavings })).unwrap();
  
      // Dispatch Redux actions on successful registration
      dispatch(setBalance(0)); // Assuming the initial balance is 0
      dispatch(setAccountType(isSavings ? "savings" : "checking"));
  
      // Call any additional handlers, e.g., for UI updates or navigation
      handleSuccessfulRegister();
    } catch (error) {
      // Handle errors, e.g., by setting an error state or displaying a message
      console.error("Registration failed", error);
      // Here you might want to update the component's state to show an error message
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div style={{ textAlign: "center", backgroundColor: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
            <h2>Register a Customer Below</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <div className="form1">Create CustomerID</div>
              <span>Please create a customerID between 4 and 10 characters. Only use digits.</span>
              <input
                className="form1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="form2" style={{ marginTop: "25px" }}>Create Pin</div>
              <span>Please create a pin 4 and 10 characters. Only use digits.</span>
              <input
                className="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div style={{ marginTop: "25px" }}>
                <span>Select Account Type:</span>
                <label>
                  <input
                    type="radio"
                    value="savings"
                    checked={isSavings}
                    onChange={() => setSavings(true)}
                  />
                  Savings
                </label>
                <label style={{ marginLeft: "15px" }}>
                  <input
                    type="radio"
                    value="checking"
                    checked={!isSavings}
                    onChange={() => setSavings(false)}
                  />
                  Checking
                </label>
              </div>
              <input type="submit" value="Register" />
            </Stack>
          </form>
           {/* Feedback based on registration status */}
           {status === 'loading' && <p>Registering account...</p>}
          {status === 'succeeded' && <p>Account registered successfully!</p>}
          {status === 'failed' && <p>Registration failed: {error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterAccount;
