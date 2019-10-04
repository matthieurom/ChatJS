import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class Message extends React.Component {
  state = {
    users: null
  };
  componentWillMount() {
    this.renderMessages(this.props.messages);
  }

  renderMessages = messages => {
    let chatId;
    try {
      chatId = messages[0].chat;
      console.log("chat id is :", chatId);
      // Get user who send the message
      messages.map(async message => {
        const responseUser = await axios.get(
          `http://localhost:8080/user/${message.user}`
        );
        console.log(
          "response from db in rendermessage :",
          responseUser.data._id
        );

        if (
          !this.state.users ||
          !this.state.users.includes(responseUser.data)
        ) {
          console.log(
            "IN IF STATEMENT responseUser data is :",
            responseUser.data
          );
          this.setState({
            users: responseUser.data
          });

          // this.setState(
          //   prevState => ({
          //     users: prevState.users.push(responseUser.data)
          //   }),
          //   () => console.log("user after map is :", this.state.users)
          // );
        }
      });
    } catch (e) {
      console.log("ERROR IS ", e);
    }

    //let user = this.props.user.find(user => user._id === message.user);
    return (
      <li>
        {} : {}
      </li>
    );
  };
  render() {
    console.log("props in message :", this.props);
    // let displayMessage = this.props.messages.map(
    //   this.renderMessage(this.props.user)
    // );
    return <ul>{}</ul>;
  }
}
const MapStateToProps = state => {
  return state;
};
export default connect(MapStateToProps)(Message);
