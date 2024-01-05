
import axios from "axios";
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

const login = async (customerID, pin, callback) => {
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

export { login }; 
