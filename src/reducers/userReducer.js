// empty store 
import { ACTIONS } from "../actions/userActions";

// state is initial value sfor store so we are saying by default not logged in but when they do hit log in we will update store 
// isLogged is now true 
const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    currentUser: {    
    role: null,
    token: null 
    }
};

// wehn you dispatch action login or logout it hasto know what to do because those do diff things to the sstore 

// function to update the store 
// store has initial state 
// always use this as beginning of store info so we can use this to update the store

// return {...state, isLoggedIn : true, currentUser: action.payload}
// so whatever current state is return a copy of it 
// currentUser: action.payload} this says user will be filled in from backend 
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {...state, isLoggedIn : true, currentUser: action.payload}
            // action.payload} its entire object of currentUser what you pass in at that time is what the payload is at that time 
// this state is this this is a defualt parameter btw only used if we dont pass in a state 
// const initialState = {
//     isLoggedIn: false,
//     currentUser: {    
//     role: null,
//     token: null 
//     }
// };


        case ACTIONS.LOGOUT:
            return {...state, isLoggedIn: false, currentUser : null};
        case ACTIONS.REGISTER_ACCOUNT:
                // You can handle the registration logic here, updating state accordingly
        return {...state, isRegistered : true, currentUser: action.payload} // Placeholder, replace with actual logic

        default: 
        return state;
        // the other actions change state this one though default wont affect state just return it back
    }
};
// by making this sate isLoggedIn false then the ycant see certain things w are holding this value in when they log in and out 
// the isLoggedIn that is
// so multiple stores multiple reducers like bank account stuff like that 

// so now we will use this info thhe reducer 
// when somebody has a login form about to log in but havent yet
// when they are ready to bascially do update where does update for log in info like token stuff etc 
// that iwll actually happen at the one place we go to service to actually begin to invoke this action and dispatch it 


// always have initial state 
// using idea of reducer and redux it is like a step above use state 
// so initila info we have to store like this almost is his pt const [count, setCount] = useState(0);

export default userReducer;