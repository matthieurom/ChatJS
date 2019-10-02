import React from "react";
import { Link } from "react-router-dom";
import ChatItem from "../Chat/ChatItem";
import "./index.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="HomeMain">
        <h1>Select a chat to start a conversation</h1>
        <ChatItem />
        <div className="HomeButtons">
          <Link to="/login">
            <button>Logout</button>
          </Link>
          <Link to="/">
            <button className="HomeButtonCreate">Create a new chat</button>
          </Link>
        </div>
      </div>
    );
  }
}
