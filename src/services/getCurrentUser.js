import axios from "axios";

export async function getCurrentUser(token) {
  try {
    const userResponse = await axios.get("http://localhost:8080/currentuser", {
      headers: { Authorization: token }
    });
    return userResponse.data;
  } catch (e) {
    console.log("ERROR IS :", e);
  }
}
