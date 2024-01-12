// combine all the reducers 
import { combineReducers } from "redux";
import { userReducer } from "react";
import  bankAccountReducer from "./bankAccountReducer";

// call combined reducer function and what does it want it wants name of store and name of reducer that is associated with it 
// reducer is where we can access store and we are going to call this giant store call it user 
const rootReducer = combineReducers({
user: userReducer,
bankAccount: bankAccountReducer,
});



// this reducerl ogic must be shared across entire app 

export default rootReducer;