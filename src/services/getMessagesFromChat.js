import axios from "axios";

export async function getMessagesFromChat(id) {
  const messagesResponse = await axios.get(
    `http://localhost:8080/messages/${id}`,
    { headers: { Authorization: localStorage.getItem("token") } }
  );
  return messagesResponse.data;
}
