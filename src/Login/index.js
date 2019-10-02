import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default class Login extends React.Component {
  handleLogin = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="LoginMain">
        <div className="form-content">
          <h1>Chat App</h1>
          <h2>Login</h2>
          <form onSubmit={e => this.handleLogin(e)}>
            <label>
              <input placeholder="Login" />
            </label>
            <input placeholder="Password" type="password" />
            <div className="form-content-button">
              <Link to="/register">
                <p>Sign up</p>
              </Link>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
