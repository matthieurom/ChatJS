import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

class ChatItem extends React.Component {
  state = {
    chats: []
  };
  async componentWillMount() {
    let chatReponse = await axios.get("http://localhost:8080/chat");
    this.setState({
      chats: chatReponse.data
    });
  }

  listChat = chat => {
    return (
      <li key={chat._id}>
        <div className="listChatMain">
          <div className="listChatName">{chat.name}</div>
          <div className="listChatDescription">{chat.description}</div>
        </div>
        <div>
          <Link to={`/chat/${chat._id}`}>
            <button>Join chat</button>
          </Link>
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

export default ChatItem;
