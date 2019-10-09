import React from "react";
import "./index.css";

class Message extends React.Component {
  componentWillMount() {
    console.log("props in message in component will mount :", this.props);
  }
  displayMessage = message => {
    let user = this.props.users.find(user => user._id === message.user);
    if (user) {
      return (
        <li key={message._id}>
          <div className="header-message"></div>
          {user.login} : {message.text}
        </li>
      );
    }
  };

  render() {
    let messagesToDisplay = [];
    if (this.props.users) {
      messagesToDisplay = this.props.messages.map(this.displayMessage);
    }
    return { messagesToDisplay };
  }
}

export default Message;
