import React from "react";
import { Link } from "react-router-dom";
import ChatItem from "../Chat/ChatItem";
import "./index.css";
import { connect } from "react-redux";
import Chat from "../Chat/index";
import { setCurrentUser, setUsers } from "../actions/userActions";
import { setChat } from "../actions/chatActions";
import { setMessages } from "../actions/messageActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
  }
  handleLogout = () => {
    console.log("LOGOUT");
    localStorage.removeItem("token");
    this.props.history.push("/login");
    this.props.setCurrentUser([]);
    this.props.setUsers([]);
    this.props.setMessages([]);
    this.props.setChat([]);
  };
  render() {
    let classNameListChat = "ListChat";
    if (this.props.isMenuOpen) {
      classNameListChat = classNameListChat + " open";
    }
    if (this.props.isScrollable) {
      classNameListChat = classNameListChat + " scrollable";
    }
    return (
      <div className="HomeMain">
        <div className="HomeButtonLogout">
          <button onClick={this.handleLogout}>
            <div className="content-logout">
              <span>Logout</span>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </button>
        </div>
        <div className="ChatWrapper" id="ChatWrapperList">
          <div className={classNameListChat}>
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
            <div className="listChat-content">
              <div
                className={
                  this.props.isScrollable
                    ? "listChat-content-chatitems scrollable"
                    : "listChat-content-chatitems"
                }
              >
                <ChatItem />
              </div>
              <div className="create-chat">
                <Link to="/create">
                  <button className="HomeButtonCreate">
                    Create a new chat
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="ChatFrame">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setCurrentUser: setCurrentUser,
  setUsers: setUsers,
  setChat: setChat,
  setMessages: setMessages
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
