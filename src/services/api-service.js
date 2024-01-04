// 12-29 we need this to do certain things in it 
// await is same thing as usuing promise but easier synthax 
// this response has token in it a
//       const { token, user } =   this is deconsttructor you take object and undo it 
// response.data is object we get back from backend 
// now we must take token and store in axios so everytime we do something we make axios return and giveu s data and use token
//     axios.defaults.headers.common['Authorization' ] this is HTTP header 
//   axios.defaults.headers.common['Authorization'] = ``; string interpolation 
// the blue for token is how you deconstruct it so in order to do htis synthax need `` you cant do this w normal strings the ${} means its a variable and can do variable manip w ith it 
// what header is looking for when you send it is bearer why put that there 
// callback is function that executes after we do successful log in so we excute it 

import axios from "axios";
// const instance = axios.create({baseURL: 'http://localhost:9000'});
const login = async (customerID, pin, callback) => {
    try {
      const response =  await axios.post("http://localhost:9000/api/authentication/login", {customerID: customerID, pin: pin});
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(token, "successful log in");
      callback();
    //       <Button onClick = { ()=> login(username, password , onSuccessLogin) } variant="primary" type="submit">
    // so the execution of callback here is onSuccessLogin so callback is onSuccessLogin so basically when we do all the work we do that onSuccessLogin in function have saved token and can redirect 
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const loginFetch = async (customerID, pin, callback) => {
    try {
      const response =  await fetch("http://localhost:9000/api/authentication/login",
       {body: JSON.stringify({customerID: customerID, pin: pin}), 
        method: "POST"});
      const { token } = await response.json();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(token, "successful log in");
      callback();
    //       <Button onClick = { ()=> login(username, password , onSuccessLogin) } variant="primary" type="submit">
    // so the execution of callback here is onSuccessLogin so callback is onSuccessLogin so basically when we do all the work we do that onSuccessLogin in function have saved token and can redirect 
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { loginFetch }; 
// for a method you have to use {} for exporting it, we can export functiosn but that synthax of export default is only for hwne this is only thing we have to default 


// want it to wait for function to be fnisih 
// asynch method on ine 4 needs a username password 
// when do post need to send in the object 