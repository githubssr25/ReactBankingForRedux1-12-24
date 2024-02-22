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