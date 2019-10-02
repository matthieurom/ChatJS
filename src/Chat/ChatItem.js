import React from "react";
import { connect } from "react-redux";
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
      <li>
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
    console.log(chatItems);
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

export default connect(mapStateToProps)(ChatItem);
