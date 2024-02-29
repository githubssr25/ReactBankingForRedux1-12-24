import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    bankAccounts: [],
    status: "idle",
    error: null,
    bankAccountsObtained: false
};

// these are extra reducers. 
export const fetchBankAccounts = createAsyncThunk('bankAccounts/fetchBankAccounts', async ({customerID}) => {
    try {
      // console.log("are we getting into fetchBankAccounts right before API call in slice");
      // console.log("what is customerID in the call", customerID);
        const response = await axios.get(`http://localhost:9000/api/bank-account/find-bank-account-by-customer-id/${customerID}`);
        // console.log("are we even getting response back from fetchbankaccounts in the slice", response.data);
        return response.data;
    } catch (error){
        throw error;
    }
});

export const addBankAccounts = createAsyncThunk('bankAccounts/addBankAccounts', async ({customerID, isSavings}) => {
    try {
        const response =  await axios.post("http://localhost:9000/api/bank-account/addAccount", {customerID: customerID, isSavings: isSavings});
        if(response.status !== 200){
            throw new Error(response.statusText);
            // so after you throw this line 23 catches it 
        }
    return response.data;
    } catch (error){
        throw error;
        // thrown donw here means that outside code that called it will crash and asynch code will be able to receive an error that went bad because asynch code exists to catch ahd handle errors thats why we had to throw it 

    }
});
// 

export const updateBankAccounts = createAsyncThunk('bankAccounts/updateBankAccounts', async ({bankAccountID, amount1, balance1}, thunkAPI) => {
  const amountDTO = {
    amount: amount1,// Parse as an integer
    balance: balance1, // Parse as an integer
  };
    try {
        const endpoint = amount1 < 0
        ? `http://localhost:9000/api/bank-account/balance/${bankAccountID}/withdraw/`
        : `http://localhost:9000/api/bank-account/balance/${bankAccountID}/deposit/`;
        const response =  await axios.put(endpoint, amountDTO);
        console.log("what is response.data right after we do update call and return it back", response.data);
            // Access the current state using getState and log it
    const currentState = thunkAPI.getState();
    console.log("Current state after response:", currentState);

        if(response.status !== 200){
          return thunkAPI.rejectWithValue({
            errorCode: response.data.errorCode,
            errorType: response.data.errorType,
            message: response.data.message,
            bankAccountID: bankAccountID || 'defaultID',
          })
        } else {
          return { ...response.data, bankAccountID };
            // so add bankAccountId as part of our response which is otherwise just the amountDTO 

        }
    } catch (error){
      console.log("structure of error.response.data", error.response.data);
      if(!error.response){
        return thunkAPI.rejectWithValue({
          message: 'Network or non server related error',
          bankAccountID: bankAccountID || 'defaultID',
        })
      } else {
        return thunkAPI.rejectWithValue({
          errorCode: error.response.data.errorCode,
          errorType: error.response.data.errorType,
          message: error.response.data.message,
          // Include bankAccountID or a default value
          bankAccountID: bankAccountID || 'defaultID',
        });

      }
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
        // console.log("do we ever get into here the bankAccount reducer the plain one as part of get accounts");
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
          // console.log("do we ever get to the extraReducers fetcBankAccounts.fulfilled if so what is actino payload", action.payload);
          state.status = 'succeeded';
        })
        .addCase(fetchBankAccounts.rejected, (state, action) => {
            state.status = 'failed';
          })
        .addCase(addBankAccounts.pending, (state, action) => {
            state.status = 'loading';
          })    
        .addCase(addBankAccounts.fulfilled, (state, action) => {
          const { savingsOrNot, bankAccountID } = action.payload;
          const bankAccountType = savingsOrNot ? "SAVINGS" : "CHECKING";
          const newBankAccount = {
            balance: 0,
            bankAccountID: bankAccountID,
            bankAccountType: bankAccountType
          }
            state.bankAccounts.push(newBankAccount);
            state.status = 'succeeded';
          })
        .addCase(addBankAccounts.rejected, (state, action) => {
          state.status = 'failed';
        })
        .addCase(updateBankAccounts.fulfilled, (state, action) => {
          const { bankAccountID, amount, balance} = action.payload;
            // Assuming the API returns the updated account details
            const index = state.bankAccounts.findIndex(bankAccount => bankAccount.bankAccountID === Number(action.payload.bankAccountID));
            if (index !== -1) {
              // Update the account with the returned data
              state.bankAccounts[index].balance = balance; 
            }
            state.status = 'succeeded';
          })
          // Add cases for pending and rejected states for each thunk as needed
          .addCase(updateBankAccounts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateBankAccounts.rejected, (state, action) => {
            console.log('Rejected action:', action);
            state.status = 'failed';
            if(action.error && action.error.message){
              console.log("what are action.error and action.error.message", action.error, action.error.message);
              state.error = action.error.message
            }
            if(action.payload && action.payload.data){
              // / Assuming the error details are in action.payload.da
              console.log("what are action.paylod and action.payload.data in our error for withdraw/deposit extrareducer", action.payload, action.payload.data);
            const { errorCode, errorType, message } = action.payload.data;
            state.error = {errorCode, errorType, message };
            // Store the structured error information
            }
          });
      }

  });
  
  export const { addBankAccount, removeLanguage, getBankAccounts } = bankAccountSlice.actions;
  export default bankAccountSlice.reducer;


    //   extraRed listen for actions dispatched by async thunks and update the state accordingly. For instance, when fetchBankAccounts.fulfilled is dispatched after 
  // successfully fetching bank accounts, extraReducers updates the bankAccounts array in the state with the fetched data.
  
  // Consistent State Updates: After an async operation completes (handled by extraReducers), the updated state becomes the new "current state" that reducers will work 
// with for any subsequent synchronous updates. There's a seamless handoff between the state updated by extraReducers and the state that reducers work with.


// Async Fetch: You dispatch fetchBankAccounts thunk to load bank accounts from an API. extraReducers handle the async lifecycle, updating state.bankAccounts when the data is successfully fetched (fetchBankAccounts.fulfilled).
// Synchronous Update: Later, you might dispatch an action like addBankAccount directly to add a new account to the state. This action is handled by a reducer in the reducers object, which updates state.bankAccounts by pushing the new account into the array.
// State Continuity: The state updated by extraReducers is the same state that reducers work with. There's no distinction or separation—extraReducers and reducers are just different mechanisms for updating the same state based on different types of actions (asynchronous vs. synchronous).

// Without reducers, you would lose the ability to handle synchronous actions directly. While extraReducers can handle the async actions generated by thunks, there are many 
// cases where you need to update the state synchronously in response to user actions, component lifecycle events, etc.



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

  // this will replace code in store.js 

  // The reducers within the slice primarily handle synchronous actions. That is, actions that don't involve asynchronous operations like API calls.
  //  They directly respond to actions dispatched from components or other parts of the application.


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





// Let's clarify the concept of the "inner function" in the createAsyncThunk utility from Redux Toolkit, using your updateBankAccounts async thunk as an example.
// Breaking Down createAsyncThunk
// createAsyncThunk is a function provided by Redux Toolkit that simplifies handling asynchronous logic and actions in your Redux store. It takes two main arguments:
// String Argument: A string that serves as the action type prefix for the generated action types (pending, fulfilled, rejected).
// In your case, 'bankAccounts/updateBankAccounts' is the action type prefix.
// Payload Creator Function: This is the "inner function" you mentioned. It's where you define the asynchronous logic that the thunk should execute.
// In your updateBankAccounts example, the payload creator function is:

// async ({bankAccountID, amount1, balance1}) => {
    // Your async logic here...
    // This function is executed when the thunk action is dispatched. It receives the thunk's arguments and should return a promise. The resolved value of this promise becomes the payload of the fulfilled action.
// }
// Return Value: The value you return from this function becomes the payload of the action when the promise is fulfilled. You can return a simple value, an object, or a transformed version of your API response
// return { ...response.data, bankAccountID };
// This entire object becomes the payload of the updateBankAccounts.fulfilled action.

