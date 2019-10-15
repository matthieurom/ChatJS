import React from "react";
import axios from "axios";
import "./index.css";
import { connect } from "react-redux";
import { setChat } from "../actions/chatActions";
import { setMessages } from "../actions/messageActions";
import { setLastChats, setScrollChatMenu } from "../actions/chatActions";
import { getMessagesFromChat } from "../services/getMessagesFromChat";
import { setUsers } from "../actions/userActions";

class ChatItem extends React.Component {
  state = {
    chats: [],
    users: null
  };
  async componentWillMount() {
    let chatReponse = await axios.get(process.env.REACT_APP_API_URL + "/chat");
    this.setState({
      chats: chatReponse.data
    });
    if (this.state.chats.length > 6) {
      this.props.setScrollChatMenu(true);
    } else {
      this.props.setScrollChatMenu(false);
    }
  }

  setChat = async chat => {
    this.props.setChat(chat);
    let messagesFromChat = await getMessagesFromChat(chat._id);
    this.props.setMessages(messagesFromChat);
    this.getUsersFromMessages(this.props.messages);
    console.log("users after setChat are ", this.state.users);
  };

  getUsersFromMessages = messages => {
    messages.map(async message => {
      const responseUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${message.user}`
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
        <div
          className={
            this.props.chat._id === chat._id
              ? "listChatMain current-chat"
              : "listChatMain"
          }
        >
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
    let chatItems;
    if (this.state.chats) {
      chatItems = this.state.chats.map(this.listChat);
    }
    return <div className="ChatItem">{chatItems}</div>;
  }
}
const mapStateToProps = state => {
  return state;
};

const mapActionsToProps = {
  setChat: setChat,
  setMessages: setMessages,
  setUsers: setUsers,
  setLastChats: setLastChats,
  setScrollChatMenu
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChatItem);
