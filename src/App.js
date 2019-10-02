import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/index";
import Home from "./Home/index";
import Chat from "./Chat/index";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/chat/:id" component={Chat} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
