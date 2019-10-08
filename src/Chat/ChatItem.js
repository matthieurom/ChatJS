import React from "react";
import axios from "axios";
import "./index.css";
import { connect } from "react-redux";
import { setChat } from "../actions/chatActions";
import { setMessages } from "../actions/messageActions";
import { getMessagesFromChat } from "../services/getMessagesFromChat";
import { setUsers } from "../actions/userActions";

class ChatItem extends React.Component {
  state = {
    chats: [],
    users: null
  };
  async componentWillMount() {
    let chatReponse = await axios.get("http://localhost:8080/chat");
    this.setState({
      chats: chatReponse.data
    });
  }

  setChat = async chat => {
    this.props.setChat(chat);
    let messagesFromChat = await getMessagesFromChat(chat._id);
    this.props.setMessages(messagesFromChat);
    this.getUsersFromMessages(this.props.messages);
  };

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
        this.props.setUsers(this.state.users);
      }
    });
  };

  listChat = chat => {
    return (
      <li key={chat._id}>
        <div className="listChatMain">
          <div className="listChatName">{chat.name}</div>
          <div className="listChatDescription">{chat.description}</div>
        </div>
        <div className="listChatButton">
          <button onClick={() => this.setChat(chat)}>Join chat</button>
        </div>
      </li>
    );
  };
  render() {
    let chatItems = this.state.chats.map(this.listChat);
    return (
      <ul>
        <div className="ChatItem">{chatItems}</div>
      </ul>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setChat: setChat,
  setMessages: setMessages,
  setUsers: setUsers
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChatItem);
