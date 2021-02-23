import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {
  StreamCreate,
  StreamEdit,
  StreamDelete,
  StreamShow,
  StreamList,
} from "./streams";
import Header from "./Header";
import history from "../history"; //our custom history object used to implement programmatic navigation

function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            {/* Without <Switch>, '/streams/new' would match both 'streams/new' and 'streams/:id' */}
            <Route path="/" exact component={StreamList}></Route>
            <Route path="/streams/new" exact component={StreamCreate}></Route>
            {/* Parameters are defined by placing a colon before a word. */}
            {/* In this case, `id` is a parameter. */}
            {/* Parameters will be passed to the component. */}
            {/* Optional parameters are defined by placing a question mark at the end of a parameter. */}
            <Route
              path="/streams/edit/:id"
              exact
              component={StreamEdit}
            ></Route>
            <Route
              path="/streams/delete/:id"
              exact
              component={StreamDelete}
            ></Route>
            <Route path="/streams/:id" exact component={StreamShow}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
