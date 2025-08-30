import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from "./App";
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

import reducers from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
     <GoogleOAuthProvider clientId="638337762056-hhputi9bj841r4pklqe4m93d0rrjdaud.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
</Provider>, document.getElementById('root'));

