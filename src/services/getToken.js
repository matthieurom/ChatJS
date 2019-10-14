import axios from "axios";

export async function getToken() {
  try {
    console.log("TOKEN IS :", localStorage.getItem("token"));
    const currentUser = await axios.get(
      process.env.REACT_APP_API_URL + "/currentuser",
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );
    this.setState({ currentUser: currentUser.data });
  } catch (e) {
    console.log("ERROR IS ", e);
  }
}
