import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosChatInstance } from '../../axios/AxiosInstance';
// import { Avatar, Stack } from '@mui/material';
// import { stringAvatar } from './mui';

const LeftChat = ({ Chat = () => {} }) => {
  const auth = useSelector((state) => state.auth);
  const accessToken = auth?.accessToken;

  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const userId = jwtDecode(accessToken).user_id;
      console.log('user',userId)
      const getChatUsers = async () => {
        try {
          const res = await axiosChatInstance.get(`/chat_users/${userId}/`);
          setChatUsers(res.data);
          console.log('res', res.data);
          
        } catch (error) {
          console.log('Error while fetching users:', error);
        }
      };

      getChatUsers();
    }
  }, [accessToken]);

  return (
    <div id="plist" className="people-list p-2">
      <ul className="list-unstyled chat-list mt-2 mb-0 px-2">
        {Array.isArray(chatUsers) && chatUsers.length > 0 ? (
          chatUsers.map((user) => (
            <ChatUserItem user={user} userId={jwtDecode(accessToken).user_id} key={user.id} Chat={Chat} />
          ))
        ) : (
          <p>No users available.</p> // Display a message if there are no users
        )}
      </ul>
    </div>
  );
};

export default LeftChat;

const ChatUserItem = ({ user, userId, Chat = () => {} }) => {
    const isCurrentUser = user.user1.id === userId;
    const displayUser = !isCurrentUser ? user.user1 : user.user2;
  
    // Determine user role
    const isStudent = displayUser.is_student;
    const isTeacher = displayUser.is_teacher;
    const isAdmin = displayUser.is_admin;
  
    // Define user role label
    let roleLabel = '';
    if (isStudent) roleLabel = 'Student';
    if (isTeacher) roleLabel = 'Teacher';
    if (isAdmin) roleLabel = 'Admin';
  
    return (
      <button
        style={{ width: '100%', borderRadius: '5px', marginBottom: '10px', textAlign: 'left' }}
        onClick={() => Chat({ id: displayUser.id, username: displayUser.username })}
      >
        <li className="d-flex p-2 align-items-center">
          {/* <Stack direction="row" spacing={2} className="mx-2">
            <Avatar {...stringAvatar(`${displayUser.first_name} ${displayUser.last_name}`)} />
          </Stack> */}
          {/* {`${displayUser.username}`} */}
          <div>
            <h5 className="mt-2 mb-0">{displayUser.first_name} {displayUser.last_name}</h5>
            <h6 m-0 bg-slate-900>{roleLabel}</h6>
          </div>
        </li>
      </button>
    );
  };
  