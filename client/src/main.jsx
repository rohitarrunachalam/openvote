import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TransactionsProvider } from "./context/VotingContext";
import "./index.css";
import store from './app/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
  <TransactionsProvider>

    <App />
 
  </TransactionsProvider>
  </Provider>,
  document.getElementById("root"),
);
