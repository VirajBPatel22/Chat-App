import React from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';

function ChatContainer({ currentChat }) {
    const handleSendMsg =async(msg) =>{
      alert(msg);
    };
  return (
    <Container>
      <div className='chat-header'>
        <div className='user-details'>
          <div className='avatar'>
            {currentChat && <img src={currentChat.avatarImage} alt="avatar" />}
          </div>
          <div className='username'>
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      {/* <div className='chat-message'></div> */}
      <Messages />
      {/* <div className='chat-input'></div> */}
      <ChatInput handleSendMsg = {handleSendMsg}/>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;

export default ChatContainer;
