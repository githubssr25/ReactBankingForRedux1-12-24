export const ACTIONS = {
    SET_ACCOUNT_TYPE: 'SET_ACCOUNT_TYPE',
    SET_BALANCE: 'SET_BALANCE',
    REGISTER_ACCOUNT: 'REGISTER_ACCOUNT',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
  };
  
  export const setAccountType = (accountType) => ({
    type: ACTIONS.SET_ACCOUNT_TYPE,
    payload: accountType,
  });
  
  export const setBalance = (balance) => ({
    type: ACTIONS.SET_BALANCE,
    payload: balance,
  });

  export const registerAccountAxn = (account) => ({
    type: ACTIONS.REGISTER_ACCOUNT,
    payload: account,
  });

  export const registerSuccess = () => ({
    type: ACTIONS.REGISTER_SUCCESS,
  });
  
  export const registerFailure = (error) => ({
    type: ACTIONS.REGISTER_FAILURE,
    payload: error,
  });

  // Actions in Redux
// In Redux, an action is a plain JavaScript object that represents an intention to change the state. Every action has a type 
// field, which is a string describing the action, and it can optionally have a payload field, which carries the data necessary for the state update.

// Action Creators
// An action creator is a function that creates and returns an action object. Redux Toolkit simplifies this by automatically generating action creators for the reducer functions you define in a createSlice call.

// To dispatch an action means to send it to the Redux store, where it can be handled by a reducer. When you dispatch an action, you can include data in the payload field of the action object.
