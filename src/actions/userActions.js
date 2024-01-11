// store are associated with entity itself
// we have diff models so like that we have diff stores
// so simplest one is user action store 

// payload is always just info it just means what is info we are 
// concerned with what is meant of info what is core thing we are studying
// for us it is user so when user logs in we get back user info 
// when we log out we dont need payload because we arent doing anythign to send info back we are just logging out 
// payload rep info like any transfer info that is where we will hold it in the payload
// so user is what we are holding when we log in beacsue we get back inf oabout user name token etc 
export const ACTIONS = {LOGIN: 'LOGIN', LOGOUT:'LOGOUT'};

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
