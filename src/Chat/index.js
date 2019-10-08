import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import io from "socket.io-client";
import { setMessages } from "../actions/messageActions";
import { getMessagesFromChat } from "../services/getMessagesFromChat";

class Chat extends React.Component {
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
  };

  displayMessage = message => {
    let user = this.props.users.find(user => user._id === message.user);
    if (user) {
      return (
        <li key={message._id}>
          {user.login} : {message.text}
        </li>
      );
    }
  };
  render() {
    let messagesToDisplay;
    if (this.props.users) {
      messagesToDisplay = this.props.messages.map(this.displayMessage);
    }
    return (
      <div className="ChatMainMessages">
        <div className="ChatHeader">
          <h1>Connected to {this.props.chat.name}</h1>
        </div>
        <div className="ChatContent">
          <div className="ChatMessages">{messagesToDisplay}</div>
          <form onSubmit={e => this.handleSubmitMessage(e)}>
            <input
              placeholder="Write down your message"
              value={this.state.inputMessage}
              onChange={e => this.handleInputMessageChange(e)}
            />
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
  setMessages: setMessages
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Chat);
