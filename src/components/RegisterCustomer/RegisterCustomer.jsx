import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import { addCustomer } from "../../slices/userSlice";
import { Link } from "react-router-dom";

const RegisterCustomer = () => {
 
  const [customerID, setCustomerID] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  const handleRegisterCustomer = async (customerID, pin) => {
    try {
      const actionResult = await dispatch(addCustomer({ customerID, pin }));
      // Check if the action was fulfilled
      if (addCustomer.fulfilled.match(actionResult)) {
        setRegistrationSuccess(true);
      } else {
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setRegistrationSuccess(false);
    }
  }

  return (
    <div>
      <label>
        Enter your CustomerID. Must contain 4-10 numbers only 
        <input 
        type="number"
        value={customerID}
        onChange = {(e) => setCustomerID(e.target.value)}
        />
      </label>
      <label>
        Enter your pin. Must asl contain 4-10 numbers only
        <input 
        type ="password"
        value={pin}
        onChange = {(e) => setPin(e.target.value)}
        />
      </label>
      <button onClick={() => handleRegisterCustomer(customerID, pin)}> Submit</button>
      { registrationSuccess !=null && (
       registrationSuccess ? (
        <p> Congrats you have registered an account you can click go back to home page and try logging in now</p>
      ) : (
        <p> sorry this registration attempt failed please try again and make sure your customerID and pin are both 4-10 digits only</p>
      ))
    }
            <Link to="/home-authenticated">
            <button>Click here to go back to home page</button>
          </Link>
    </div>
  )
};

export default RegisterCustomer;

  // useEffect(() => {
//   if (status === 'succeeded') {
//     setRegistrationSuccess(true);
//   } else if (status === 'failed') {
//     setRegistrationSuccess(false);
//   }
// }, [status]); // 'status' should be coming from the Redux state


 