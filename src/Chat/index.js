import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Chat extends React.Component {
  state = {
    chat: []
  };
  async componentWillMount() {
    let chatReponse = await axios.get(
      `http://localhost:8080/chat/${this.props.match.params.id}`
    );
    this.setState({
      chat: chatReponse.data
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
          <ul>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
            <li>
              <p>Message ..</p>
            </li>
          </ul>
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
