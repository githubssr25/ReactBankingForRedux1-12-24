import { ACTIONS } from "../actions/bankAccountActions";

const initialState = {
  isAccountRegistered: false,  
  bankAccounts: [],
  // has a list of bank accounts we will have to GET those accounts also idea of registering or adding an account
  // then idea of updating something about that account so when you update account how wil lwe update? need to know specific accountID and will have to change something like balance for ex
  // even when you update account or withdraw etc to change a bankaccount what you are saying is going to backend with info about bank account saying this bankaccount is like $50 not $100 because of withdraw
  // back end should respond back w bank accounts balance 
  error: null
};

const bankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_BALANCE:
        return { ...state, bankAccount: action.payload};
    case ACTIONS.GET_BALANCE:
        return { ...state, bankAccount: action.payload};  
    case ACTIONS.REGISTER_ACCOUNT:
        return {...state, isAccountRegistered : true}
    case ACTIONS.HANDLE_ERROR:
        return { ...state, error: action.payload};
        // have to eventually reset error you handle error try again but when try again if want error component to go away need to find a way to reset error
  //  so can assume everytime error iwll be null 
  default:
      return state;
  }
};

export default bankAccountReducer;