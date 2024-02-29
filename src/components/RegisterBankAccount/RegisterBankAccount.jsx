import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { addBankAccounts } from "../../slices/bankAccountSlice";


const RegisterBankAccount = () => {

const [isChecking, setIsChecking] = useState(false);   
const navigate = useNavigate();
const dispatch = useDispatch();
const [newBankAccountID, setNewBankAccountID] = useState(null);
const customerID = useSelector(state => state.currentUser.currentUserCustomerID);
const [registrationSuccess, setRegistrationSuccess] = useState(null);
const [bankAccountType, setBankAccountType] = useState("");



const handleRegisterAccount = async (isChecking) => {
    try {
        const response = await dispatch(addBankAccounts({customerID, isChecking}));
        console.log("what actually is hte response", response);
        if(addBankAccounts.fulfilled.match(response)) {
        const { bankAccountID, savingsOrNot } = response.payload;
        setBankAccountType(savingsOrNot ? "SAVINGS" : "CHECKING");
        setNewBankAccountID(bankAccountID);
        setRegistrationSuccess(true);
        } else {
            setRegistrationSuccess(false);
        }
    } catch(error) {
        console.error("Registering new account failed", error);
        setRegistrationSuccess(false);
    }
}


return (
<div>
    <Container fluid="md">
        <Row>
            <Col> Click below to Register a new Savings Account</Col>
            <Col> 
                <input 
                type="radio"
                value="saving"
                checked={!isChecking}
                onChange={() => setIsChecking(false)}
               />
          </Col>
          <Col> Click here to Register a new Checking Account</Col>
          <Col>
          <input 
                type="radio"
                value="saving"
                checked={isChecking}
                onChange={() => setIsChecking(true)}
               />
          </Col>
          <button onClick={() => handleRegisterAccount(isChecking)}> Submit</button>
        </Row>
    </Container>
    { registrationSuccess != null && (
        registrationSuccess ? (
        <p> congrats you have successfully registered a : {bankAccountType} account that has a bankAccountID of: {newBankAccountID} </p>
    ) : (
     <p> sorry this attempt to register a new bank account failed </p>
    ))
    }
      <Link to="/home-authenticated">
            <button>Click here to go back to home page</button>
      </Link>
</div>
)
}
export default RegisterBankAccount;