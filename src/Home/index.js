import React from "react";
import { Link } from "react-router-dom";
import ChatItem from "../Chat/ChatItem";
import "./index.css";
import { connect } from "react-redux";
import { setUser } from "../actions/userActions";

class Home extends React.Component {
  render() {
    return (
      <div className="HomeMain">
        <h1>Welcome {this.props.user.login}</h1>
        <h2>Pick a chat and start a conversation !</h2>
        <ChatItem />
        <div className="HomeButtons">
          <Link to="/login">
            <button>Logout</button>
          </Link>
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

const mapActionsToProps = {
  setUser: setUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
