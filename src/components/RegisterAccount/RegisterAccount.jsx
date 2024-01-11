import React, { useState } from "react";
import { useEffect } from "react";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { registerAccountTest } from "../../services/api-service";
import { dispatch } from "redux";
import { registerAccountAxn } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, setAccountType } from "../../actions/bankAccountActions";

const RegisterAccount = ({ handleSuccessfulRegister }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSavings, setSavings] = useState(true);

  const { accountType, isAccountRegistered } = useSelector(
    (state) => state.bankAccount
  );

  useEffect(() => {
    const onSuccessfulRegisterAccount = () => {
      dispatch(setBalance(0));
      dispatch(setAccountType(isSavings ? "savings" : "checking"));
      handleSuccessfulRegister();
    };
    registerAccountTest(username, isSavings, onSuccessfulRegisterAccount);
  }, [dispatch, username, isSavings, handleSuccessfulRegister]);

  // leave the dpeendnecy array empty or not?

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h2>Register a Customer Below</h2>
          </div>
          {/* he said within form dont call functions in other componets call functions that 
          are local and local functions are what can call functions of other components  */}
          <form onSubmit={registerAccountTest}>
            <Stack gap={2}>
              <div className="form1">Create CustomerID</div>
              <span>
                Please create a customerID between 4 and 10 characters. Only use
                digits.{" "}
              </span>
              <input
                className="form1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="form2" style={{ marginTop: "25px" }}>
                Create Pin
              </div>
              <span>
                Please create a pin 4 and 10 characters. Only use digits.{" "}
              </span>
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
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterAccount;
