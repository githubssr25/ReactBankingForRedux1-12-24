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