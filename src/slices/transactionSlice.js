import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { updateBankAccounts } from './bankAccountSlice';


const initialState = {
transactionHistory: {},
anyPending: false,
status: "idle",
error: null,
pendingTransactions: [],
successMessage: null,
}

export const getTransactionHistory = createAsyncThunk (
'transaction/getTransactionHistory',
async ({chosenOption, customerID}) =>{
    try {
        const endpoint = 
        chosenOption === 2
        ? `http://localhost:9000/api/transaction/sending-transaction-history-by-customer/${customerID}`
        : chosenOption === 3
        ? `http://localhost:9000/api/transaction/receiving-transaction-history-by-customer/${customerID}`
        : chosenOption === 1
        ? `http://localhost:9000/api/transaction/all-transaction-history-by-customer/${customerID}`
        : null;
        // console.log("what is endpoint", endpoint);
        const response = await axios.get(endpoint);
        // console.log("are we getting response", response.data);
        return response.data;
      } catch (error){
        throw error;
      }
});

export const getPendingTransactionHistory = createAsyncThunk (
'transaction/getPendingTransactionHistory',
async ({customerID}) => {
    try {
        const response = await axios.get(`http://localhost:9000/api/transaction/pending-transaction-history-by-customer/${customerID}`);
        // console.log(typeof response === 'object' && response !== null ? 'Response is an object' : 'Response is not an object');
        // console.log(response.data);
        return response.data;
      } catch(error){
        console.error(error);
        throw error;
      }
});

// catch (error){
//   if (error.response) {
//     // Log the custom error message sent from the server
//     console.log('Error message from server:', error.response.data.comments);
//     // Log the status code
//     console.log('Status code:', error.response.status);
//     // Log the entire error response object
//     console.log('Error response:', error.response);
//   } else {
//     // Log the error if the response is not available
//     console.log('Error:', error.message);
//   }
// }

// 3-5 pick up tomorrow we have ot figure out how to properly update the balance statei n bankaccounts through this transaction
// we have to basically call the bankaccount slice from within this slice to do so also keep in mind we only return amount and balance not bankacocuntID which makes it tough


export const initiateTransaction = createAsyncThunk (
'transaction/initiateTransaction',
async({bankAccountSendingID, bankAccountReceivingID, transactionAmount}, thunkAPI) => {
   try {
    const TransactionDTO = {
        bankAccountSendingID: parseInt(bankAccountSendingID, 10),  // Parse as an integer
        bankAccountReceivingID: parseInt(bankAccountReceivingID, 10),  // Parse as an integer
        transactionAmount: parseInt(transactionAmount, 10)
      };
      const endpoint = `http://localhost:9000/api/transaction/sendToAnotherAccount`;
      const response = await axios.post(endpoint, TransactionDTO);
      const currentState = thunkAPI.getState();
      console.log("Current state after response:", currentState);

      if(response.status == 200){
      console.log("what is our response.data and response and response.status after getting response in initateTrans", response.data, response, response.status);
      const {amount, balance} = response.data;
      // the receiving acocuntID is the ones thats not yours so why do you care about it you shouldnt its never gonna be part of the bankAccounts[] state that state is only your accounts 
      // const receivingAccount = currentState.bankAccount.bankAccounts.find(account => account.bankAccountID === bankAccountReceivingID);
      // const receivingAccountBalance = receivingAccount ? receivingAccount.balance : 0;
      // const receivingBalanceToSend = receivingAccountBalance + Math.abs(amount);
      
      // thunkAPI.dispatch(updateBankAccounts({
      //   bankAccountID: bankAccountReceivingID,
      //   balance: receivingBalanceToSend
      // }));
      thunkAPI.dispatch(updateBankAccounts({
        bankAccountID: bankAccountSendingID,
        balance: balance
      }))
      return { data: response.data, status: response.status };
      } else if(response.status == 201){
        return { data: response.data, status: response.status };
      }
    } catch(error){
        console.error(error);
        if(!error.response){
            return thunkAPI.rejectWithValue({
              message: 'Network or non server related error',
              // bankAccountID: bankAccountID || 'defaultID',
            })
          } else {
            return thunkAPI.rejectWithValue({
                errorCode: error.response.status,
                message: error.response.data.comments,
            })
          }
        
}});


export const transactionSlice = createSlice({
name: 'transactionState',
initialState, 
reducers : {
    setTransaction : (state, action) => {
        state.transactionState = action.payload;
    }
},
extraReducers: (builder) => {
builder.addCase(getTransactionHistory.pending, (state) => {
    state.status = 'loading';
})
.addCase(getTransactionHistory.fulfilled, (state, action) => {
const transactionObject = action.payload.reduce((accumulator, transaction) => {
accumulator[transaction.transactionID] = transaction;
return accumulator;
}, {});
state.transactionHistory= { ...state.transactionHistory, 
    ...transactionObject};
state.status = 'succeeded';
})
.addCase(getTransactionHistory.rejected,(state, action) => {
    state.status = 'failed';
})
.addCase(initiateTransaction.rejected, (state, action) => {
  console.log('Rejected action', action);
  state.status = 'failed';
  if(action.payload){
    console.log("action and Action payload in our error for make transaction extrareducer", action, action.payload);    
  const {errorCode, message} = action.payload;
  state.error = {errorCode, message};
  console.log("Is state.error actually the errorCode, errorType, message we want?", state.error);
  console.log("display state and state.error", state, state.error);
  } else if (action.error && action.error.message){
    console.log("Action.error and action.error.message", action.error, action.error.message);
    state.error = action.error.message;
  }
})
.addCase(initiateTransaction.pending, (state) => {
state.status = 'pending';
}) 
.addCase(initiateTransaction.fulfilled, (state, action) => {
  const { status, data} = action.payload;
  state.status = 'succeeded';
})
.addCase(getPendingTransactionHistory.rejected, (state, action) => {
  state.status = 'failed';
})
.addCase(getPendingTransactionHistory.pending, (state, action) => {
state.status ='pending';
})
.addCase(getPendingTransactionHistory.fulfilled, (state, action) => {
  state.pendingTransactions = action.payload;
})
}
});
export default transactionSlice.reducer;

// The issue is with the { ...state.transactionHistory, transactionObject } syntax. This would actually create a new object with the existing contents of state.transactionHistory and add a new property named transactionObject to it, rather than merging the contents of transactionObject into the existing transactionHistory.
// both need to be spread operators bascially to create a new object with both values 

//        return thunkAPI.rejectWithValue({
  // errorCode: error.response.data.errorCode,
  // errorType: error.response.data.errorType,
  // message: error.response.data.message,