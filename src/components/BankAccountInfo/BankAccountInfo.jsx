import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccounts } from "../../slices/bankAccountSlice";

// have to dispatch the actions 


const BankAccountInfo = () => {
    const dispatch = useDispatch();
    //     const bankAccounts = useSelector(state => state.bankAccount.bankAccounts) || []; if it does have value return if not return empty array 
    // const bankAccounts = useSelector(state => state.bankAccount.bankAccounts)|| [];
    const bankAccounts = [];
    // refer to line 4 and 53 for name this gets us data so what do we want to do with it? we just make simple para tag 
    // where is data we are trying to use regarding useSelector 
    // dispatch to send osmething liek asynch thunk do that action
    // when we want to get data though we have to do useSelector 


    useEffect( () => {
        dispatch(getBankAccounts({customerID: 2774}));
        // so go get it w above
        // use selector to get it ou of store 
    }, [])

    // bankAccounts && will find if its truthy if not it wont render it so wont execute on map of something that isnt defiend yet 

return (
    <>
    { bankAccounts && bankAccounts.map(bankAccount => {
        return(<p>
            { bankAccount.bankAccountType},
            {bankAccount.bankAccountID},
        </p>);
    })}
    </>
)

}

export default BankAccountInfo;