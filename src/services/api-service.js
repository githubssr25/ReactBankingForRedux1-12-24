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
