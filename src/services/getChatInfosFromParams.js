import axios from "axios";

export async function getChatInfosFromParams(id) {
  const chatReponse = await axios.get(`http://localhost:8080/chat/${id}`);
  return chatReponse.data;
}
