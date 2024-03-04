import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankAccounts } from "../../slices/bankAccountSlice";
import { Link } from "react-router-dom";

const BankAccountInfoSimple = () => {
  const bankAccounts = useSelector((state) => state.bankAccount.bankAccounts);
  const status = useSelector((state) => state.bankAccount.status);
  const error = useSelector((state) => state.bankAccount.error);
  const customerID = useSelector(
    (state) => state.currentUser.currentUserCustomerID
  );

// const initialState = {
//     bankAccounts: [],
//     status: "idle",
//     error: null,
//     bankAccountsObtained: false
// }; so this is also that error you just are more specific in this one becuase you arent in the bankaccount slice but is  same thing as state.error in the bankaccountslice


  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBankAccounts({customerID: customerID}));
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
          return <li key = {bankAccount.bankAccountID}>
                Bank Account ID: {bankAccount.bankAccountID} <br />
                Bank Account Type: {bankAccount.bankAccountType} <br />
                Bank Account Balance: {bankAccount.balance} <br />
             </li>;
        })}
      </ul>
      <Link to="/home-authenticated">
              <button>Click here to go back to home page</button>
            </Link>
    </div>
  );
};
export default BankAccountInfoSimple; 