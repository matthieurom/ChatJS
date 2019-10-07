import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getMessagesFromChat } from "../services/getMessagesFromChat";
import { getChatInfosFromParams } from "../services/getChatInfosFromParams";
import "./index.css";
import { connect } from "react-redux";
import io from "socket.io-client";

class Chat extends React.Component {
  state = {
    chat: [],
    messages: [],
    users: null,
    inputMessage: ""
  };
  async componentWillMount() {
    let chatInfos = await getChatInfosFromParams(this.props.match.params.id);
    let messagesFromChat = await getMessagesFromChat(
      this.props.match.params.id
    );
    this.setState({
      chat: chatInfos,
      messages: messagesFromChat
    });
    this.getUsersFromMessages(this.state.messages);
    this.socket = io("localhost:8080");

    this.socket.on("RECEIVE_MESSAGE", async () => {
      let messagesFromChatWithSocket = await getMessagesFromChat(
        this.props.match.params.id
      );
      this.setState({ messages: messagesFromChatWithSocket });
    });
  }

  getUsersFromMessages = messages => {
    messages.map(async message => {
      const responseUser = await axios.get(
        `http://localhost:8080/user/${message.user}`
      );

      if (
        !this.state.users ||
        !this.state.users.find(user => user._id === message.user)
      ) {
        if (!this.state.users) {
          this.setState({
            users: [responseUser.data]
          });
        } else {
          this.setState(prevState => ({
            users: prevState.users.concat(responseUser.data)
          }));
        }
      }
    });
  };
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
        chatId: this.props.match.params.id,
        userId: this.props.user._id
      },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );
    this.socket.emit("SEND_MESSAGE", {
      text: this.state.inputMessage,
      date: Date.now(),
      chatId: this.props.match.params.id,
      userId: this.props.user._id
    });
    this.setState({
      inputMessage: ""
    });
  };

  displayMessage = message => {
    let user = this.state.users.find(user => user._id === message.user);
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
    if (this.state.users) {
      messagesToDisplay = this.state.messages.map(this.displayMessage);
    }
    return (
      <div className="ChatMainMessages">
        <h1>Connected to {this.state.chat.name}</h1>
        <div className="ChatMessages">{messagesToDisplay}</div>
        <form onSubmit={e => this.handleSubmitMessage(e)}>
          <input
            placeholder="Write down your message"
            value={this.state.inputMessage}
            onChange={e => this.handleInputMessageChange(e)}
          />
          <button type="submit">Send</button>
        </form>
        <div className="back">
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Chat);
