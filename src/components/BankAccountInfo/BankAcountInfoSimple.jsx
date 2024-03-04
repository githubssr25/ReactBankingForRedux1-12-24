import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankAccounts } from "../../slices/bankAccountSlice";

const BankAccountInfoSimple = () => {
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const status = useSelector((state) => state.bankAccount.status);
  const error = useSelector((state) => state.bankAccount.error);

// const initialState = {
//     bankAccounts: [],
//     status: "idle",
//     error: null,
//     bankAccountsObtained: false
// }; so this is also that error you just are more specific in this one becuase you arent in the bankaccount slice but is  same thing as state.error in the bankaccountslice


  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBankAccounts({customerID: 4510}));
    }
  }, [status]);
//   so we only want to do this when status is idle 
// this useEffect is os that application has loaded and as soon as app has loaded go get bank accounts that is what dispatch means in this aspect
// but what if dispatch upon clicking submit butto nt oadd data that is also dispatch but that wont be in a use effect that will just be ons ubmit send data 

  if (error !== null) {
    return <div>error is: {error}</div>;
  }
  if (status === "loading") {
    return <div>page is loading</div>;
  }
  return (
    <div>
      <ul>
        {bankAccounts.map((bankAccount) => {
          return <li key = {bankAccount.bankAccountID}> {bankAccount.balance}</li>;
        })}
      </ul>
    </div>
  );
};
export default BankAccountInfoSimple; 