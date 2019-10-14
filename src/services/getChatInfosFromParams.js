import axios from "axios";

export async function getChatInfosFromParams(id) {
  const chatReponse = await axios.get(
    process.env.REACT_APP_API_URL + `/chat/${id}`
  );
  return chatReponse.data;
}
