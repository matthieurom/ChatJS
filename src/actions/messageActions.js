export function setMessages(messages) {
  return {
    type: "SET_MESSAGES",
    payload: messages
  };
}
export function addMessage(message) {
  return {
    type: "ADD_MESSAGE",
    payload: message
  };
}
