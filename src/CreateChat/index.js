import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateChat extends React.Component {
  state = {
    inputNameValue: "",
    inputDescriptionValue: ""
  };

  addChat = async e => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(
        process.env.REACT_APP_API_URL + "/chat",
        {
          name: this.state.inputNameValue,
          description: this.state.inputDescriptionValue
        },
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      );
    } catch (e) {
      console.log("error is :", e);
    }
    this.props.history.push("/");
    console.log("NEW CHAT CREATED IS :", response);
  };
  render() {
    return (
      <div className="CreateChatMain">
        <h1>Create your chat</h1>
        <div className="createchat-content">
          <form onSubmit={this.addChat}>
            <input
              placeholder="Name"
              value={this.state.inputNameValue}
              onChange={e => this.setState({ inputNameValue: e.target.value })}
              maxlength={25}
            />
            <input
              placeholder="Description"
              value={this.state.inputDescriptionValue}
              onChange={e =>
                this.setState({ inputDescriptionValue: e.target.value })
              }
              maxlength={120}
            />
            <div className="createchat-button">
              <Link to="/">Back to home page</Link>
              <button type="submit" className="submitbutton">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateChat;
