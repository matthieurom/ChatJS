import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Message from "../Message/index";
import "./index.css";

class Chat extends React.Component {
  state = {
    chat: [],
    messages: []
  };
  async componentWillMount() {
    // Get chat infos
    const chatReponse = await axios.get(
      `http://localhost:8080/chat/${this.props.match.params.id}`
    );
    this.setState({
      chat: chatReponse.data
    });

    // Get messages from chat
    const messagesResponse = await axios.get(
      `http://localhost:8080/messages/${this.props.match.params.id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    this.setState({
      messages: messagesResponse.data
    });
  }

  handleSubmitMessage = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="ChatMainMessages">
        <h1>Connected to {this.state.chat.name}</h1>
        <div className="ChatMessages">
          <Message messages={this.state.messages} />
        </div>
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
