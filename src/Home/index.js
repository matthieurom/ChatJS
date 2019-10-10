import React from "react";
import { Link } from "react-router-dom";
import ChatItem from "../Chat/ChatItem";
import "./index.css";
import { connect } from "react-redux";
import Chat from "../Chat/index";

class Home extends React.Component {
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }
  handleLogout = () => {
    console.log("LOGOUT");
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="HomeMain">
        <div className="ChatWrapper">
          <div className={this.props.isMenuOpen ? "ListChat open" : "ListChat"}>
            <div
              className={
                this.props.isMenuOpen
                  ? "header-listChat open-header"
                  : "header-listChat"
              }
            >
              <h1>Welcome {this.props.currentUser.login}</h1>
              <h2>Pick a chat and start a conversation !</h2>
            </div>
            <ChatItem />
          </div>
          <div className="ChatFrame">
            <Chat />
          </div>
        </div>
        <div className="HomeButtons">
          <button onClick={this.handleLogout}>Logout</button>
          <Link to="/create">
            <button className="HomeButtonCreate">Create a new chat</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);
