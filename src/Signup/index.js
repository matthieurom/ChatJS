import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { getCurrentUser } from "../services/getCurrentUser";
import { setCurrentUser } from "../actions/userActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faUserTag } from "@fortawesome/free-solid-svg-icons";

class Signup extends React.Component {
  state = {
    inputFirstNameValue: "",
    inputLastNameValue: "",
    inputLoginValue: "",
    inputPasswordValue: "",
    inputPasswordValueVerif: "",
    isPasswordIncorrect: false
  };
  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }
  passwordVerification = () => {
    if (this.state.inputPasswordValue !== this.state.inputPasswordValueVerif) {
      this.setState({ isPasswordIncorrect: true });
      return false;
    }
    return true;
  };

  handleSignUp = async e => {
    e.preventDefault();
    if (
      this.passwordVerification() &&
      this.state.inputLoginValue !== "" &&
      this.state.inputPasswordValue !== "" &&
      this.state.inputPasswordValueVerif !== "" &&
      this.state.inputFirstNameValue !== "" &&
      this.state.inputLastNameValue !== ""
    ) {
      let newUser = {
        login: this.state.inputLoginValue,
        password: this.state.inputPasswordValue,
        firstname: this.state.inputFirstNameValue,
        lastname: this.state.inputLastNameValue
      };
      try {
        const responseCreateUser = await axios.post(
          process.env.REACT_APP_API_URL + "/register",
          newUser
        );
        console.log("User created is :", console.log(responseCreateUser));
      } catch (e) {
        console.log("ERROR IN Signup : ", e);
      }
      var response = null;
      try {
        response = await axios.post(process.env.REACT_APP_API_URL + `/login`, {
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
      } catch (e) {
        this.setState({
          isPasswordIncorrect: true
        });
      }
    }
  };

  render() {
    return (
      <div className="signupMain">
        <div className="form-content">
          <h1>Chat App</h1>
          <h2>Sign Up</h2>
          <form onSubmit={e => this.handleSignUp(e)}>
            <div className="icon-signup-wrapper">
              <div className="icon-signup">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                placeholder="First Name"
                value={this.state.inputFirstNameValue}
                onChange={e =>
                  this.setState({ inputFirstNameValue: e.target.value })
                }
              />
            </div>
            <div className="icon-signup-wrapper">
              <div className="icon-signup">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                placeholder="Last Name"
                value={this.state.inputLastNameValue}
                onChange={e =>
                  this.setState({ inputLastNameValue: e.target.value })
                }
              />
            </div>
            <div className="icon-signup-wrapper">
              <div className="icon-signup">
                <FontAwesomeIcon icon={faUserTag} />
              </div>
              <input
                placeholder="Login"
                value={this.state.inputLoginValue}
                onChange={e =>
                  this.setState({ inputLoginValue: e.target.value })
                }
              />
            </div>
            <div className="icon-signup-wrapper">
              <div className="icon-signup">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                placeholder="Password"
                type="password"
                value={this.state.inputPasswordValue}
                onChange={e =>
                  this.setState({ inputPasswordValue: e.target.value })
                }
              />
            </div>
            <div className="icon-signup-wrapper">
              <div className="icon-signup">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                placeholder="Password verification"
                type="password"
                value={this.state.inputPasswordValueVerif}
                onChange={e =>
                  this.setState({ inputPasswordValueVerif: e.target.value })
                }
              />
            </div>

            {this.state.isPasswordIncorrect ? (
              <p className="incorrect-password">
                Password or login not correct
              </p>
            ) : (
              ""
            )}
            <div className="form-content-button">
              <button type="submit">Create Account</button>
            </div>
          </form>
          <div className="signup-signupButton">
            <Link to="/login">
              <p>Back to login</p>
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
)(Signup);
