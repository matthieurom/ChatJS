import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getMessagesFromChat } from "../services/getMessagesFromChat";
import { getChatInfosFromParams } from "../services/getChatInfosFromParams";
import "./index.css";

class Chat extends React.Component {
  state = {
    chat: [],
    messages: [],
    users: null
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
  handleSubmitMessage = e => {
    e.preventDefault();
  };

  displayMessage = message => {
    let user = this.state.users.find(user => user._id === message.user);
    if (user) {
      return (
        <li>
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
          <input placeholder="Write down your message" />
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

export default Chat;
