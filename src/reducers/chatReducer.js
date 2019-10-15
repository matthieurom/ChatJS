var initialState = {
  currentUser: [],
  chat: [],
  messages: [],
  users: [],
  lastChats: [],
  isMenuOpen: true,
  isScrollable: false
};

export default function chatReducer(state = initialState, action) {
  let newMessages;
  switch (action.type) {
    case "SET_CHAT":
      return { ...state, chat: action.payload };
    case "SET_CURRENTUSER":
      return { ...state, currentUser: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      newMessages = state.messages.concat(action.payload);
      return { ...state, messages: newMessages };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_LAST_CHATS":
      return { ...state, lastChats: action.payload };
    case "SET_MENU_LIST_CHATS":
      return { ...state, isMenuOpen: action.payload };
    case "SET_SCROLL_CHAT_MENU":
      return { ...state, isScrollable: action.payload };
    default:
      return state;
  }
}
