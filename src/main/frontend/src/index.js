import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom';
import Test from "./components/Test";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import CategoriesView from "./views/CategoriesView";
import TransactionView from "./views/TransactionsView";
import "./index.css"



ReactDOM.render(
    <BrowserRouter>
        <div className="container">
            <Route exact path="/" component={Test} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/registration" component={RegistrationView} />
            <Route exact path="/categories" component={CategoriesView} />
            <Route exact path="/transactions" component={TransactionView} />
        </div>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
