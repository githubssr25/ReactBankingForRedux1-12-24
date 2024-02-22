
import { ACTIONS } from "../actions/userActions";

const initialState = {
    isLoggedIn: false,
    isCustomerRegistered: false,
    currentUser: {    
    role: null,
    token: null 
    }
};

// currentUser: action.payload} this says user will be filled in from backend 
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {...state, isLoggedIn : true, currentUser: action.payload}
            // action.payload} its entire object of currentUser what you pass in at that time is what the payload is at that time 
        case ACTIONS.LOGOUT:
            return {...state, isLoggedIn: false, currentUser : null};
        case ACTIONS.REGISTER_CUSTOMER:
        return {...state, isCustomerRegistered : true, currentUser: action.payload}     

        default: 
        return state;
    }
};
// when they are ready to bascially do update go to service to actually begin to invoke this action and dispatch it 

export default userReducer;