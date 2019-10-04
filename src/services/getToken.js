import axios from "axios";

export async function getToken() {
  try {
    console.log("TOKEN IS :", localStorage.getItem("token"));
    const currentUser = await axios.get("http://localhost:8080/currentuser", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    this.setState({ currentUser: currentUser.data });
  } catch (e) {
    console.log("ERROR IS ", e);
  }
}
