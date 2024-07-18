const host = "http://localhost:4500";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`; // Corrected 'message' to 'messages'
export const getMessageRoute = `${host}/api/messages/getmsg`; // Added for get messages
