import { useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from '../../slices/userSlice';

const HomeUnauthenticated = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customerID, setCustomerID] = useState('');
    const [pin, setPin] = useState('');
    const isLoggedIn = useSelector(state => state.currentUser.isLoggedIn);
    const [isError, setIsError] = useState(false);
    console.log("how many times is HomeUnauthenticated getting renderengd purposes");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("CustomerID:", customerID, "Pin:", pin);
           const actionResult = await dispatch(loginUser({ customerID, pin }));
            if(loginUser.fulfilled.match(actionResult)){
            navigate('/home-authenticated');
            } else if (loginUser.rejected.match(actionResult)) {
              setIsError(true);
              // The action was rejected, handle the error
              console.error("Login failed", actionResult.error);
            }
    } catch(error){
        console.error("log in failed", error);
    }
}

const handleRegister = () => {

    console.log('calling handleRegister from homeUnauthenticated'); 
    navigate('/register-customer');
  };


return (
<div>
    <div className = "welcomeBox" style={{ textAlign: 'center'}}>
    <hl> welcome ton online banking application</hl>
    <p style={{ margin: '50px' }}>
          Please use your account to log in below. If this is your first time, you may register an account.
        </p>
    </div>
  <h2> Login</h2>
  <form>
    <label>
        enter Customer ID:
        <input
        type = "text"
        value = {customerID}
        onChange={(e) => setCustomerID(e.target.value)}
        />
    </label>
    <label>
        Enter Pin:
        <input
        type = "password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        />
    </label>
    <button type="button" onClick={(handleLogin)}>
        Log In
    </button>
  </form>

  <div>
    <p> first time using this service? register a new customer account below</p>
    <button type="button" onClick={(handleRegister)}> Click here to register new customer</button>
  </div>

  {isLoggedIn && (
      <div style={{ textAlign: 'center' }}>
            <h3>Successful Login!</h3>
            <p>You have successfully logged in to your account.</p>
            <p>Redirecting to the authenticated home...</p>
        </div>

  )}
  { isError && (
    <div style={{ textAlign: 'center' }}>
      <p> Sorry you unsuccessful log in please try again and double check either your entered customerID or pin</p>
      </div>
  )}
</div>
)
}

export default HomeUnauthenticated;

// // dont need a try catch bc promise returned by dispatch when dispatching async thunk resolves successfully whether action rejected or fulfilled and wont throw an error that owuld be caught by catch block
// The try...catch block in your code would only catch errors that occur synchronously within the try block, which might include errors in the setup code before the dispatch call or errors that occur in the process of calling 
// dispatch but not related to the async operation's success or failure. For example, if there were a syntax error, a reference error, or any other kind of JavaScript error in your handleLogin function outside of the async operation, the try...catch block would catch those.

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//       console.log("CustomerID:", customerID, "Pin:", pin);
//      const actionResult = await dispatch(loginUser({ customerID, pin }));
//       if(loginUser.fulfilled.match(actionResult)){
//       navigate('/home-authenticated');
//       } else if (loginUser.rejected.match(actionResult)) {
//         // The action was rejected, handle the error
//         console.error("Login failed", actionResult.error);
//       }
// } catch(error){
//   console.error("log in failed", error);
// }
// }

// Given the way you're handling the async operation with loginUser.fulfilled.match and loginUser.rejected.match, the try...catch block isn't necessary for catching errors related to the async operation's outcome. You're already handling the different outcomes of the async operation with the if...else if structure.