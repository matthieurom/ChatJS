import React from "react";
import { connect } from "react-redux";
class Message extends React.Component {
  renderMessage = (user, message) => {
    return (
      <li>
        {user.login} : {message.text}
      </li>
    );
  };
  render() {
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
