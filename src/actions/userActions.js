export const ACTIONS = {LOGIN: 'LOGIN', LOGOUT:'LOGOUT', 
REGISTER_CUSTOMER: 'REGISTER_CUSTOMER', REGISTER_ACCOUNT: 'REGISTER_ACCOUNT'};

export const loginAxn = (user) => ({
    type: ACTIONS.LOGIN,
    payload: user,

});

// define as const so define once and used multile times as needed 
export const logout = () => ({
type: ACTIONS.LOGOUT,

});

export const registerAccountAxn = (account) => ({
    type: ACTIONS.REGISTER_ACCOUNT,
    payload: account,
  });

  export const registerCustomerAxn = (account) => ({
    type: ACTIONS.REGISTER_CUSTOMER,
    payload: account,
  });
