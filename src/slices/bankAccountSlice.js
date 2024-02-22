import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    bankAccounts: [],
    status: "idle",
    error: null
};

// these are extra reducers. 
export const fetchBankAccounts = createAsyncThunk('bankAccounts/fetchBankAccounts', async ({customerID}) => {
    try {
        const response = await axios.get(`http://localhost:9000/api/bank-account/find-bank-account-by-customer-id/${customerID}`);
        return response.data;
    } catch (error){
        throw error;
    }
});

export const addBankAccounts = createAsyncThunk('bankAccounts/addBankAccounts', async ({customerID, isSavings}) => {
    try {
        const response =  await axios.post("http://localhost:9000/api/auth/addAccountPractice", {customerID: customerID, isSavings: isSavings});
        if(response.status !== 200){
            throw new Error(response.statusText);
            // so after you throw this line 23 catches it 
        }
    } catch (error){
        throw error;
        // thrown donw here means that outside code that called it will crash and asynch code will be able to receive an error that went bad because asynch code exists to catch ahd handle errors thats why we had to throw it 

    }
});
// 

export const updateBankAccounts = createAsyncThunk('bankAccounts/addBankAccounts', async ({bankAccountID, amount, balance}) => {
    try {
        const endpoint = amount < 0
        ? `http://localhost:9000/api/bank-account/balance/${bankAccountID}/withdraw/`
        : `http://localhost:9000/api/bank-account/balance/${bankAccountID}/deposit/`;
        const response =  await axios.post("http://localhost:9000/api/auth/addAccountPractice", {bankAccountID : bankAccountID, amount: amount, balance: balance});
        if(response.status !== 200){
            throw new Error(response.statusText);
            // so after you throw this line 23 catches it 
        }
    } catch (error){
        throw error;
        // thrown donw here means that outside code that called it will crash and asynch code will be able to receive an error that went bad because asynch code exists to catch ahd handle errors thats why we had to throw it 
        
    }
});

// these are reducers line 55-65 and extra reducers we are doing at top 2-17 those are dealing w fetches and stuff 
export const bankAccountSlice = createSlice({
    name: 'bankAccount',
    initialState,
    reducers: {
      addBankAccount: (state, action) => {
        state.bankAccounts.push(action.payload);
      },
      getBankAccounts: (state, action) => {
        state.bankAccounts = action.payload;
      },
      updateBankAccounts: (state, action) => {
       const index = state.bankAccounts.findIndex(bankAccount => bankAccount.bankAccountID === action.payload.bankAccountID);
       state.bankAccounts[index] = { ...state.bankAccounts[index], ...action.payload };
      },
    },
    //           state.bankAccounts = action.payload; dont need this for pending or rejected we dont have data we wont know what payload is only will know when fulfilled 
    extraReducers: (builder) => {
        builder.addCase(fetchBankAccounts.pending, (state, action) => {
          state.status = 'loading';
        })    
        .addCase(fetchBankAccounts.fulfilled, (state, action) => {
          state.bankAccounts = action.payload;
          state.status = 'succeeded';
        })
        .addCase(fetchBankAccounts.rejected, (state, action) => {
            state.status = 'failed';
          });
        // .addCase(addBankAccounts.fulfilled, (state, action) => {
        //     state.bankAccounts.push(action.payload);
        //     state.status = 'succeeded';
        //   })
        // .addCase(updateBankAccounts.fulfilled, (state, action) => {
        //     // Assuming the API returns the updated account details
        //     const index = state.bankAccounts.findIndex(bankAccount => bankAccount.bankAccountID === action.payload.bankAccountID);
        //     if (index !== -1) {
        //       // Update the account with the returned data
        //       state.bankAccounts[index] = action.payload;
        //     }
        //     state.status = 'succeeded';
        //   })
        //   // Add cases for pending and rejected states for each thunk as needed
        //   .addCase(updateBankAccounts.pending, (state) => {
        //     state.status = 'loading';
        //   })
        //   .addCase(updateBankAccounts.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message;
        //   });
      }

      // want to export slice as is 

      // Understanding createAsyncThunk
// createAsyncThunk is a function from Redux Toolkit that simplifies handling asynchronous logic and 
// automatically generates action types for each part of the asynchronous request lifecycle: pending, fulfilled, and rejected.
// Each async thunk you've defined (fetchBankAccounts, addBankAccounts, updateBankAccounts) represents an asynchronous operation, such as an API call to fetch or modify bank account data.

// How extraReducers Works
// extraReducers allows your slice to respond to actions defined outside or even inside the slice, including those generated by async thunks.
// You use the builder object to add cases for handling specific actions. Each case corresponds to a possible outcome of an async operation: pending 
// (operation started), fulfilled (operation succeeded), or rejected (operation failed).



      // fetchBankAccounts.fulfilled: When the fetchBankAccounts async thunk successfully completes, this case updates the state with the fetched bank accounts 
      // data (action.payload) and sets the status to 'succeeded', indicating a successful fetch operation.

      // updateBankAccounts.pending: This case sets the status to 'loading' when the updateBankAccounts async thunk is
      //  dispatched and the operation is in progress, providing a way to indicate loading state in the UI.
  });
  
  export const { addBankAccount, removeLanguage, getBankAccounts } = bankAccountSlice.actions;
  export default bankAccountSlice.reducer;
  // this will replace code in store.js 


// create slice is storing slice for business domain 
// create AsynchThunk to handle and wait for data to be stored in the store asynchronously. We arent directly updating. Go from pending to success so has to be ready to come back to update store once axios has fnished updating it
// action.payload is where its getting its data from for the addBankAccount 
//        state.bankAccounts.findIndex(bankAccount => bankAccount.bankAccountID === action.payload.bankAccountID);
// so current this findIndex is saying it finds through list of all bank accounts you have and each of them have id from 1-5 for ex and try to update 3 for ex action.payload is no 3 
// and what it does is it says bankAccountID is 3 and that rep 3 the action.payload.bankAccountID is that equal to the current bankAccount ID we start off which is 1 so in that case no then goes to 2 etc when it finds match it returns the index of where it is at in array 
//        state.bankAccounts[index] = action.payload; so this is now this we updated it w htis particular info 

//    state.bankAccounts[index] = { ...state.bankAccounts[index], ...action.payload };
// ...state.bankAccounts[index] this is one we didnt update 
//  ...action.payload  this is what we want to update 
// use existing values it already had in first object because we arent updating first one we are only updating hte balance 
// we coudl update customerID hypothetically if knew bankAccountId 
// dont want to have to know every single key value object for this bank account like for ex if we only wantt osend what is new amount of balance 
// if that is true do we need to put bank account ID and stuff yeah for ID min but not other stuf 
// extra reducersi s logic to asynch go get data. So it tells us what asynch axios should do when call is finishd. What should be updated in the state 

//   extraReducers: builder => { builder helps us figure out what state we are in(called cases) so like pending vs success etc 
// that is assoc w a certain case so builder helps us understand how we can delineate w diff cases(so diff states) whic his what fetch is gonna be in 
// so builder.addCase ther eare 3 cases for us do this 3 times. so we have to find out if pending first then we have to find out if fulfilled and last case is if we are rejecting like when axios tried to go get user
