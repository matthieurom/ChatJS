export function setChat(chat) {
  return {
    type: "SET_CHAT",
    payload: chat
  };
}
export function setLastChats(chats) {
  return {
    type: "SET_LAST_CHATS",
    payload: chats
  };
}
export function setMenuListChats(isOpen) {
  return {
    type: "SET_MENU_LIST_CHATS",
    payload: isOpen
  };
}
export function setScrollChatMenu(isScrollable) {
  return {
    type: "SET_SCROLL_CHAT_MENU",
    payload: isScrollable
  };
}
