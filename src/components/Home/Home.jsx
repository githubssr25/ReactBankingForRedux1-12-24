import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button } from "react-bootstrap";
// import { Login } from "../Login/Login";
// to go up a directory ../ so home.jsx and home.css are at same level nothing esle is in that directory
// home.jsx needs access to login but not in same directory so has to go up a direcotry to home and then will go to folder called login and then will go to login.jsx
// so that is what we did .. to go up and then went ot login and then go to the login of the login folder

// STARTING PLACE IS HOME home.jsx
// have to go up to Home folder
// home folder is at same level of register account
// .. go up and then at same place so if you go at home you are going down so ../Home/RegisterAccount wont work
import Login from "../Login/Login";
import RegisterAccount from "../RegisterAccount/RegisterAccount";
// import { RegisterAccount } from "../RegisterAccount/RegisterAccount";

// start from log in you go up a directory to go to login

// this import outlet, link, react router dom allows you to re direct to a diff link
// import { RegisterAccount } from "../components/RegisterAccount"; so thi sis wrong

// can type in rafce to get this

// anonymous function here that rep a functional component its just react synthax so you are returning this div from a function
// in past there were functional components that look like this and then
// there were state components and it looked synthax wise diff but now w react hooks
// we create everythign in functional component
// react fragments encapsulates the code, it means that you can return HTML on screen
//    <>Home</> this is a react fragment

// {{}} are to activate javascript
// if someone presses log in it shoudl re direct them to a diff page

import Dropdown from "react-bootstrap/Dropdown";

// should have its own file if it can be used in future for someone else to use it another component would wnat to use it he means
// but if it will only ever be used in this one file ever then it doesnt need its ow ncomponent
function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Choose from one of three options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          <Link to="/Login">
            {" "}
            <button> Login </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <Link to="/registerAccount">
            {" "}
            <button> Register Account </button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          <Link to="/registerCustomer">
            {" "}
            <button> Register Customer </button>
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const WelcomeBox = () => {
  return (
    <div className="welcome-box" style={{ textAlign: "center" }}>
      <h1>Welcome to Online Banking Application</h1>
      <p style={{ margin: "50px" }}>
        Feel free to see the 3 potential options to start and then click the
        navigation button below to choose whether to log in or register{" "}
      </p>
    </div>
  );
};

function UncontrolledExample() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        If you already have a registered customer account you can use this to
        log in and then access information about any potential bank accounts
      </Tab>
      <Tab eventKey="registerCustomer" title="RegisterCustomer">
        Provides the option to register as a customer account who can have
        multiple bank accounts
      </Tab>
      <Tab eventKey="registerAccount" title="RegisterAccount" disabled>
        Provides the option to register a bank account if you already have a
        customer account
      </Tab>
      <Tab></Tab>
    </Tabs>
  );
}

// we got rid of div for line 9 we want to make our components look like this to load faster
//       <h1>
// {" "}
// welcome to this application please choose one of 3 options: 1: log in 2:
// register new account 3: register new customer
// </h1>

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  // Function to handle act   ws2 ions after successful login
  const handleSuccessfulLogin = () => {
    setIsAuthenticated(true);
  };
  const handleSuccessfulRegister = () => {
    setIsCreated(true);
    setRegistrationError(false);
  };

  const handleRegistrationError = () => {
    setIsCreated(false);
    setRegistrationError(true);
  };

  // Placeholder functions for different actions
  const handleSeeBalance = () => {
    // Implement logic to display the user's balance
    console.log("See Balance button clicked!");
  };

  const handleDeposit = () => {
    // Implement logic for depositing money
    console.log("Deposit button clicked!");
  };

  const handleWithdraw = () => {
    // Implement logic for withdrawing money
    console.log("Withdraw button clicked!");
  };

  const handleTransfer = () => {
    // Implement logic for transferring money to another account
    console.log("Transfer button clicked!");
  };

  const handleViewTransferHistory = () => {
    // Implement logic to view transfer history
    console.log("View Transfer History button clicked!");
  };

  return (
    <div>
      <WelcomeBox />
      <div style={{ margin: "50px" }}>
        <UncontrolledExample />
      </div>
      {isAuthenticated ? (
        <div>
          {/* Display the authenticated content here */}
          <h2>Welcome! What would you like to do?</h2>
          <Button onClick={handleSeeBalance}> See Balance </Button>
          <Button onClick={handleDeposit}> Deposit $$ into Account </Button>
          <Button onClick={handleWithdraw}> Withdraw $$ from Account </Button>
          <Button onClick={handleTransfer}>
            {" "}
            Transfer $$ to Another Account
          </Button>
          <Button onClick={handleViewTransferHistory}>
            {" "}
            View Transfer History
          </Button>
          <Button onClick={() => setIsAuthenticated(false)}> Log Out </Button>
        </div>
      ) : (
        <div style={{ margin: "10px 20px 30px 40px" }}>
          {isCreated ? (
            <div>
              <h2>
                Congratulations! You have successfully registered your account.
              </h2>
              <Button onClick={() => setIsCreated(false)}>
                Register Another Account
              </Button>
              <Button onClick={() => setIsAuthenticated(true)}>
                Click here to Try Logging In Now
              </Button>
            </div>
          ) : (
            <div>
              {registrationError && (
                <p>Sorry, the account did not register. Please try again.</p>
              )}
              <Login
                handleSuccessfulLogin={handleSuccessfulLogin}
                handleRegistrationError={handleRegistrationError}
              />
              <BasicExample
                handleSuccessfulLogin={handleSuccessfulLogin}
                handleRegistrationError={handleRegistrationError}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

//         <div style={{ margin: "10px 20px 30px 40px" }}>
//           <h2>
//             Congratulations! You have successfully registered your account.
//           </h2>
//           <Button onClick={() => setIsCreated(false)}>
//             Register Another Account
//           </Button>
//           <Button onClick={() => setIsCreated(false)}>Try Logging In</Button>
//         </div>
//       ) : (
//         <div style={{ margin: "10px 20px 30px 40px" }}>
//           <Login handleSuccessfulLogin={handleSuccessfulLogin} />
//           <RegisterAccount
//             handleSuccessfulRegister={handleSuccessfulRegister}
//           />
//           <BasicExample />
//         </div>
//       )}
//     </div>
//   );
// };

// we make component jsx file if we want someone else ot use this component we have to export it
// so export name of component and export default means this is only thing being exported
// if you dont export it nobody else can se it and sending it out as an object
// if somebody else wants to receiver it they ahve to import it and then deconstruct it
// if they only just want home you woud do import ( home ) from "../Home" for ex(not 100% on htis specifc directory)
// could do like export (home, welcome} from "../Home"
// if you want to re use it like entire div and evdrything in function thats how you can do that w export

export default Home;
