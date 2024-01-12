export const ACTIONS = {
    SET_BALANCE: 'SET_BALANCE',
    REGISTER_ACCOUNT: 'REGISTER_ACCOUNT',
    HANDLE_ERROR: 'HANDLE_ERROR',
    GET_ACCOUNTS: 'GET_ACCOUNTS',
  };

  export const getBalance = (balance) => ({
    type: ACTIONS.GET_BALANCE,
    payload: balance,
  });
  
  export const setBalance = (balance) => ({
    type: ACTIONS.SET_BALANCE,
    payload: balance,
  });

  export const registerAccountAxn = (account) => ({
    type: ACTIONS.REGISTER_ACCOUNT,
    payload: account,
  });

  export const handleError = (error) => ({
    type: ACTIONS.HANDLE_ERROR,
    payload: error,
  })
