import axios from "axios";
import { loginAxn } from "../actions/userActions";
const createInstance = () => axios.create({baseURL: 'http://localhost:9000/api'});
const deleteBankAccount = async (bankAccountID, callback) => {
  try {
 const response = createInstance()
      .delete(`/bank-account/${bankAccountID}`);
     if(callback){
      callback(response.data);
     } 
     
  } catch (error) {
    console.error(error);
  }
};

// whomever calls the service is component who needs it. when use dispatch we will call login action 
const login = async (customerID, pin, dispatch, callback) => {
    try {
      const response =  await axios.post("http://localhost:9000/api/auth/login", {customerID: customerID, pin: pin});
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // take user respnonse from backend giving you role and token from backend and now you put that in log in action and send that here via dispatch 
      //         return {...state, isLoggedIn : true, currentUser: action.payload} so this is rep the payload the userResponse
      const userResponse = { isLoggedIn: true, currentUser: {role: token }}
      dispatch(loginAxn(userResponse));
// triggers the userReducer to update the Redux store's state accordingly, reflecting the user's logged-in status and role.
      console.log(token, "successful log in");
      callback();
  } catch (error) {
        console.error(error);
        throw error;
    }
};

// Modify your services/api-service.js file to include a registration function

const registerAccountTest = async (customerID, isSavings, callback) => {
  console.log(customerID);
  console.log("Is Savings:", isSavings);
  try {
    const response = await axios.post(
      "http://localhost:9000/api/bank-account/addAccount",
      {
        customerID: customerID,
        isSavings: isSavings,
      }
    );
    const { token } = response.data;
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    console.log(axios.defaults.headers.common);
    console.log(token, "bank account successfully registered");
    callback();
  } catch (error) {
    console.error("Login failed", error);
  }
};





export { createInstance, deleteBankAccount, registerAccountTest, login};
