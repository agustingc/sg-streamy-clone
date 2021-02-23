import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//const NodeMediaServer = require('node-media-server');

//for redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* create redux store with combined reducers; devtools; middleware */
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

/* render App wrapped inside redux Provider */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
