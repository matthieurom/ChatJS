import axios from "axios";

export async function getLastChatsFromUser(token) {
  try {
    let chatResponse = await axios.get(
      process.env.REACT_APP_API_URL + "/user/current/lastchat",
      {
        headers: { token }
      }
    );
    return chatResponse.data;
  } catch (e) {
    console.log("ERROR IS :", e);
  }
}
