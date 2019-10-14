import axios from "axios";

export async function getCurrentUser(token) {
  try {
    const userResponse = await axios.get(
      process.env.REACT_APP_API_URL + "/currentuser",
      {
        headers: { Authorization: token }
      }
    );
    return userResponse.data;
  } catch (e) {
    console.log("ERROR IS :", e);
  }
}
