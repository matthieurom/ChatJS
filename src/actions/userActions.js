export function setCurrentUser(user) {
  return {
    type: "SET_CURRENTUSER",
    payload: user
  };
}
export function setUsers(users) {
  return {
    type: "SET_USERS",
    payload: users
  };
}
