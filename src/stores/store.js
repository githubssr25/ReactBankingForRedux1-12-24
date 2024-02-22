import { configureStore } from '@reduxjs/toolkit';
import bankAccountSlice from '../slices/bankAccountSlice';

const store = configureStore({
    reducer: {
      bankAccount: bankAccountSlice
    },
    // You can add more middleware and enhancers here if needed

    // connect reducers 2-22 each reducer slice will have ind initial state it stores, store is just combining all reducers together 
  });
  
  export default store;