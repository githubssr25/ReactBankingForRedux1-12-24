import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import CombinedForm from './components/RegisterCustomer/RegisterCustomer'
import { Provider } from 'react-redux';
import rootReducer from './reducers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <Provider store ={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

reportWebVitals();

// he said create another reducer so every time hae a new reducer and update it in index.js 
// so create a bank account reducer it will ahve acitons state of basic info like bankAccount and the 
// nahve ueser actions like userReducer so follow of f the ex of userReducer 

