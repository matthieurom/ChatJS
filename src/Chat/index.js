import React from "react";
import axios from "axios";
import "./index.css";
import { connect } from "react-redux";
import io from "socket.io-client";
import { setMessages } from "../actions/messageActions";
import { setChat, setMenuListChats } from "../actions/chatActions";
import { getMessagesFromChat } from "../services/getMessagesFromChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

class Chat extends React.Component {
  chatRef = React.createRef();
  state = {
    inputMessage: ""
  };
  async componentWillMount() {
    console.log("IN CHAT, PROPS ARE :", this.props);
    try {
      this.socket = io("localhost:8080");
      this.socket.on("RECEIVE_MESSAGE", async () => {
        let messagesFromChatWithSocket = await getMessagesFromChat(
          this.props.chat._id
        );
        this.props.setMessages(messagesFromChatWithSocket);
      });
    } catch (e) {
      console.log("ERROR IN TRY CATCH OF CHAT IS :", e);
    }
  }

  handleInputMessageChange = e => {
    this.setState({
      inputMessage: e.target.value
    });
  };
  handleSubmitMessage = async e => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8080/messages",
      {
        text: this.state.inputMessage,
        date: Date.now(),
        chatId: this.props.chat._id,
        userId: this.props.currentUser._id
      },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );
    this.socket.emit("SEND_MESSAGE", {
      text: this.state.inputMessage,
      date: Date.now(),
      chatId: this.props.chat._id,
      userId: this.props.currentUser._id
    });
    this.setState({
      inputMessage: ""
    });
    try {
      this.socket.on("RECEIVE_MESSAGE", async () => {
        let messagesFromChatWithSocket = await getMessagesFromChat(
          this.props.chat._id
        );
        this.props.setMessages(messagesFromChatWithSocket);
      });
    } catch (e) {
      console.log("ERROR IN TRY CATCH OF CHAT IS :", e);
    }
  };
  handleDisconnectChat = () => {
    this.props.setChat([]);
    this.props.setMessages([]);
    window.scrollTo(0, 0); // For phone users, scroll to the top when menu is clicked
  };

  handleMenu = () => {
    if (this.props.isMenuOpen) {
      this.props.setMenuListChats(false);
    } else {
      this.props.setMenuListChats(true);
    }
    window.scrollTo(0, 0); // For phone users, scroll to the top when menu is clicked
  };
  scrollToTheBottom = () => {
    const objDiv = document.getElementById("messageList");
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  componentDidUpdate() {
    this.scrollToTheBottom();
  }

  displayMessage = message => {
    let user = this.props.users.find(user => user._id === message.user);
    if (user) {
      let isCurrentUser = user._id === this.props.currentUser._id;
      let classNameMessage = "MainMessageWrapper ";
      if (isCurrentUser) {
        classNameMessage = classNameMessage + "MessageFromCurrentUserDisplay ";
      }
      if (this.props.isMenuOpen) {
        classNameMessage = classNameMessage + "MainMessageWithMenuOpen ";
      }
      return (
        <div className={classNameMessage}>
          <div className="MessageUserIcon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div
            className={
              isCurrentUser
                ? "MessageWrapper MessageFromCurrentUser"
                : "MessageWrapper"
            }
          >
            <div className="header-message">
              <span className="header-message-login">{user.login}</span>
              <span className="header-message-date">
                {dateFormat(message.date, "dS mmmm, h:MM TT")}
              </span>
            </div>
            <div className="content-message">{message.text}</div>
          </div>
        </div>
      );
    }
  };
  render() {
    let messagesToDisplay;
    if (this.props.users) {
      messagesToDisplay = this.props.messages.map(this.displayMessage);
    }
    return (
      <div
        className={
          this.props.isMenuOpen
            ? "ChatMainMessages openChat"
            : "ChatMainMessages"
        }
      >
        <div className="ChatHeader">
          <div className="ChatHeader-tab" onClick={this.handleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <h1>
            {this.props.chat.name
              ? `Connected to ${this.props.chat.name}`
              : "Not connected"}
          </h1>
          <div
            className="ChatHeader-logout"
            onClick={this.handleDisconnectChat}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
        </div>
        <div className="ChatContent">
          <div className="ChatMessagesText" id="messageList">
            {messagesToDisplay}
          </div>
          <form onSubmit={e => this.handleSubmitMessage(e)}>
            {this.props.chat.name ? (
              <input
                placeholder="Write down your message"
                value={this.state.inputMessage}
                onChange={e => this.handleInputMessageChange(e)}
              />
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  setMessages: setMessages,
  setChat: setChat,
  setMenuListChats
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Chat);
