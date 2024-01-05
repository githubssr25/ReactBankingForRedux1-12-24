
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

export { login }; 
