import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const initialState = {
transactionHistory: {},
anyPending: false,
status: "idle",
error: null,
pendingTransactions: []
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

export const initiateTransaction = createAsyncThunk (
'transaction/initiateTransaction',
async({indBankAccountID, otherBankAccountID, transactionAmount}) => {
   try {
    const TransactionDTO = {
        bankAccountSendingID: parseInt(indBankAccountID, 10),  // Parse as an integer
        bankAccountReceivingID: parseInt(otherBankAccountID, 10),  // Parse as an integer
        transactionAmount: parseInt(transactionAmount, 10)
      };
      const endpoint = `http://localhost:9000/api/transaction/sendToAnotherAccount`;
      const response = await axios.post(endpoint, TransactionDTO);
      const { balance, amount} = response.data;
      return balance;
    } catch(error){
        console.error(error);
    }
});

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
.addCase(getTransactionHistory.rejected,(state) => {
    state.status = 'failed';
} )
}
});
export default transactionSlice.reducer;

// The issue is with the { ...state.transactionHistory, transactionObject } syntax. This would actually create a new object with the existing contents of state.transactionHistory and add a new property named transactionObject to it, rather than merging the contents of transactionObject into the existing transactionHistory.
// both need to be spread operators bascially to create a new object with both values 
