import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './stores/store';



// react strict mode and then have app which has all the browser router and route and stuff in it 
// so can go to index.js can affect all children component by affecting it here 
// which is what we will do we want state to be here globally stored so to go to top of root of al lcomponets 
// store where is it going to get that idea of store from? we will create store by saying const and 

// info about store is passed through to app and the app.js holds all other components so therefore
//  if root info is stored here that means store is avialable ot all cocomponetns al lthe time so that is why we have to define it here 

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

