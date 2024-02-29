import { ACTIONS } from "../actions/bankActions";

const initialState = {
  isAccountRegistered: false,  
  accountType: null, // This can be 'checking', 'savings', or null if not set
  balance: null,
};

const bankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACCOUNT_TYPE:
      return { ...state, isAccountRegistered : true, accountType: action.payload, balance: 0};
    case ACTIONS.SET_BALANCE:
      return { ...state, balance: action.payload, accountType: action.payload, isAccountRegistered : true };
    case ACTIONS.REGISTER_ACCOUNT:
        return {...state, isAccountRegistered : true, accountType: action.payload, balance: 0}
    case ACTIONS.REGISTER_SUCCESS:
        return { ...state, isAccountRegistered: true};
    case ACTIONS.REGISTER_FAILURE:
        return { ...state, isAccountRegistered: true};
    default:
      return state;
  }
};

export default bankAccountReducer;


// How Actions Work in Redux
// Dispatching Actions: Actions are dispatched in response to user interactions or events in your application. For instance, when a user attempts to register a new account, you might dispatch the registerAccountAxn action.
// Reducers Responding to Actions: Reducers listen for dispatched actions and update the state based on the action's type and payload.
// The payload is the data that's needed to perform the state update. For example, setBalance might be dispatched with the new balance as the payload, and a reducer would use that payload to update the balance in the state.

// In Components: You'd typically dispatch these actions from your React components in response to user interactions. For example, when a user submits a form to set their account type, you'd dispatch setAccountType.
// In Reducers: In your reducers (or in the reducers section of a Redux Toolkit slice), you'd handle these actions to update the state. For example, you might have a reducer function that looks for SET_ACCOUNT_TYPE actions and updates the accountType in the state accordingly.