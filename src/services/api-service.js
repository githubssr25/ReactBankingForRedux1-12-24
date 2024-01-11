import axios from "axios";
import { loginAxn } from "../actions/userActions";
// when something has to be updated for store 

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

// whomever calls the service is component who needs it 

// so when use dispatch we will call login action 
const login = async (customerID, pin, dispatch, callback) => {
    try {
      const response =  await axios.post("http://localhost:9000/api/auth/login", {customerID: customerID, pin: pin});
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // this is the user response coming from backend this is giving me the role and token the bakcend that is
      // take user respnonse and put that in log in action and send that here via dispatch 
      const userResponse = { isLoggedIn: true, currentUser: {role: token }}
// after we get dat afrom server back they are logged in 

//         return {...state, isLoggedIn : true, currentUser: action.payload} so this is rep the payload the userResponse

// dispatch will change state and whomever needs user component info this info it will therefore 
// it is going to update the state but then also now the component will re-render 
// components re render whenever you change info that component shoudl be changing 
// like certain inf oyo uwatn to display and now something to re-render component will re render 
// so this means we dont have to have callbacks becasue teh callbacks in a dispatch are going to wrok against each other 
// as soon as you call disaptch component will immeadiately re render and it is going to ren render and wont be
//  able to callow you to call the call back functio nbecause it is going to stop it 
// it is almost like an emergency break and you dontw atn it to call it twice 
// so instead when it tries to re render whatever yo uwanted it to do in call back you just do it in conditio nafter
//  it is satisfied that store has been dispspatched w new vaules
// 
      dispatch(loginAxn(userResponse));
      // so now this goes back to user reducer and will implement action of log in 
      // const userReducer = (state = initialState, action) => {
    // switch(action.type){
    //   case ACTIONS.LOGIN:
    //       return {...state, isLoggedIn : true, currentUser: action.payload}
    // {...state, this is spread operator it spreads values out so you can use it its like opening
    //  up an object as a box so you can get all thse values 




      // value has come back the token that is so now we need to use dispatch from redux 
// now do update on dispatch 
// dispatch has to be passed in and has to come in from a component 
      
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


const registerCustomer = async (customerID, pin, callback) => {
  try {
    const response = await axios.post("http://localhost:9000/api/auth/register", {customerID: customerID, pin: pin});
    // Assuming the server responds with relevant data after successful registration
    const { token, customerID } = response.data;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Successful registration for customerID:", customerID);
    callback();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};




export { createInstance, deleteBankAccount, registerAccountTest, login, registerCustomer};
