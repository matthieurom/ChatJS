import axios from "axios";

export async function getLastChatsFromUser(token) {
  try {
    let chatResponse = await axios.get(
      "http://localhost:8080/user/current/lastchat",
      {
        headers: { token }
      }
    );
    return chatResponse.data;
  } catch (e) {
    console.log("ERROR IS :", e);
  }
}
