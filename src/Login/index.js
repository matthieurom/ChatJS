import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { getCurrentUser } from "../services/getCurrentUser";
import { setCurrentUser } from "../actions/userActions";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    inputLoginValue: "",
    inputPasswordValue: "",
    isPasswordIncorrect: false
  };

  handleLogin = async e => {
    e.preventDefault();
    var response = null;
    try {
      response = await axios.post(`http://localhost:8080/login`, {
        login: this.state.inputLoginValue,
        password: this.state.inputPasswordValue
      });
      // Store token in localstorage
      localStorage.setItem("token", response.data);
      // Store current user in Redux store
      const currentUser = await getCurrentUser(response.data);
      this.props.setCurrentUser(currentUser);
      // Redirection towards home page
      this.props.history.push("/");
    } catch {
      this.setState({
        isPasswordIncorrect: true
      });
    }
  };

  handleLoginChange = e => {
    this.setState({
      inputLoginValue: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      inputPasswordValue: e.target.value
    });
  };

  render() {
    return (
      <div className="LoginMain">
        <div className="form-content">
          <h1>Chat App</h1>
          <h2>Login</h2>
          <form onSubmit={e => this.handleLogin(e)}>
            <label>
              <input
                placeholder="Login"
                value={this.state.inputLoginValue}
                onChange={e => this.handleLoginChange(e)}
              />
            </label>
            <input
              placeholder="Password"
              type="password"
              value={this.state.inputPasswordValue}
              onChange={e => this.handlePasswordChange(e)}
            />
            {this.state.isPasswordIncorrect ? (
              <p className="incorrect-password">
                Password or login not correct
              </p>
            ) : (
              ""
            )}
            <div className="form-content-button">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="login-signupButton">
            <Link to="/register">
              <p>Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapActionsToProps = {
  setCurrentUser: setCurrentUser
};
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
