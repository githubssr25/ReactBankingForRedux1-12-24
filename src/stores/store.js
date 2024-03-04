import { configureStore } from '@reduxjs/toolkit';
import bankAccountSlice from '../slices/bankAccountSlice';
import userSlice from '../slices/userSlice';
import transactionSlice from '../slices/transactionSlice';

const store = configureStore({
    reducer: {
      bankAccount: bankAccountSlice,
      currentUser: userSlice,
      transactionState: transactionSlice
    },
 
  });
  
  export default store;

     // You can add more middleware and enhancers here if needed

    // connect reducers 2-22 each reducer slice will have ind initial state it stores, store is just combining all reducers together 