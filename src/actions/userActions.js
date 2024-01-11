export const ACTIONS = {LOGIN: 'LOGIN', LOGOUT:'LOGOUT', 
REGISTER_CUSTOMER: 'REGISTER_CUSTOMER'};

export const loginAxn = (user) => ({
    type: ACTIONS.LOGIN,
    payload: user,

});

// define as const so define once and used multile times as needed 
export const logout = () => ({
type: ACTIONS.LOGOUT,

});



  export const registerCustomerAxn = (account) => ({
    type: ACTIONS.REGISTER_CUSTOMER,
    payload: account,
  });
