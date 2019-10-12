import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/index";
import Home from "./Home/index";
import Chat from "./Chat/index";
import CreateChat from "./CreateChat/index";
import Signup from "./Signup/index";
import { connect } from "react-redux";
import { getCurrentUser } from "./services/getCurrentUser";
import { setCurrentUser } from "./actions/userActions";

class App extends React.Component {
  state = {
    userLoading: false
  };

  async componentWillMount() {
    if (localStorage.getItem("token")) {
      try {
        this.setState({ userLoading: true });
        const currentUser = await getCurrentUser(localStorage.getItem("token"));
        this.props.setCurrentUser(currentUser);
      } catch (e) {
        console.log("COULD NOT SET USER", e);
      }
    }

    this.setState({ userLoading: false });
  }
  render() {
    if (this.state.userLoading) {
      return <p>User loading ...</p>;
    }
    if (!this.props.currentUser) {
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
          <Route path="/create" component={CreateChat} />
          <Route path="/register" component={Signup} />
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
  setCurrentUser: setCurrentUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
