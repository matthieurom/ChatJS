import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/index";
import Home from "./Home/index";
import Chat from "./Chat/index";
import { connect } from "react-redux";
import { getCurrentUser } from "./services/getCurrentUser";
import { setUser } from "./actions/userActions";

class App extends React.Component {
  state = {
    userLoading: false
  };

  async componentWillMount() {
    try {
      this.setState({ userLoading: true });
      const currentUser = await getCurrentUser(localStorage.getItem("token"));
      this.props.setUser(currentUser);
    } catch {
      console.log("COULD NOT SET USER");
    }
    this.setState({ userLoading: false });
  }
  render() {
    if (this.state.userLoading) {
      return <p>User loading ...</p>;
    }
    if (!this.props.user) {
      return (
        <Router>
          <Switch>
            <Login />
          </Switch>
        </Router>
      );
    }
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

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setUser: setUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
