import axios from "axios";

export async function getMessagesFromChat(id) {
  const messagesResponse = await axios.get(
    process.env.REACT_APP_API_URL + `/messages/${id}`,
    { headers: { Authorization: localStorage.getItem("token") } }
  );
  return messagesResponse.data;
}
