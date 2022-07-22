import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getChatAnswer } from "../api";
import exit from "../assets/icons/exit.png";
import kumaProfile from "../assets/profiles/kuma-profile.png";

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState({
    message: ""
  });
  const [messages, setMessages] = useState([]);
  const [userInfo] = useState({
    name: state.name,
    character: state.character,
  });

  const getMessage = async (text) => {
    const result = await getChatAnswer(text);

    const messageInfo = {
      sender: "bot",
      message: result.data.answer,
    };

    if (result.data) {
      setMessages((list) => list.concat(messageInfo));
    }
  };

  const handleChatInput = (event) => {
    const { name, value } = event.target;

    setMessageInput({
      ...messageInput,
      [name]: value,
    });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (messageInput.message) {
      const messageInfo = {
        sender: "human",
        message: messageInput.message,
      };

      setMessages((list) => list.concat(messageInfo));

      setMessageInput({
        message: ""
      });

      getMessage(messageInput.message);
    }
  };

  useEffect(() => {
    getMessage("안녕");
  }, []);

  return (
    <ChatContainer>
      <div className="chatInfo">
<<<<<<< HEAD
        <button onClick={() => {navigate("/main");}}>
=======
        <button onClick={() => {navigate("/");}}>
>>>>>>> 34f01fc96c567aab07d3f45b2e2461858720f740
          <img src={exit} alt="exitButton" />
        </button>
        <span>{userInfo && userInfo.character}</span>
        <div />
      </div>
      <div className="chat">
        <ul>
          {messages.length !== 0 && messages.map((item, idx) => (
            <li className={item.sender} key={idx}>
              {item.sender === "bot" && <img src={kumaProfile} alt="profile" />}
              <p>{item.message}</p>
            </li>
          ))}
        </ul>
      </div>
      <form className="chatInputContainer" onSubmit={handleSendMessage}>
        <input
          placeholder={`${userInfo && userInfo.character}에게 메세지 보내기`}
          onChange={handleChatInput}
          value={messageInput.message}
          name="message"
        />
        <button>전송</button>
      </form>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  position: relative;
  height: 100%;

  .chatInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    background-color: #F9F9F9;

    button {
      background-color: transparent;

      img {
        width: 20px;

        &.consultingBtn {
          width: 24px;
        }
      }
    }

    span {
      font-size: 28px;
      font-family: 'Itim';
      color: #368F16;
    }
  }

  .chat {
    height: 100%;

    ul {
      display: flex;
      flex-flow: column;
      align-items: center;
      height: 100%;
      margin-top: 40px;
      overflow: scroll;

      li {
        display: flex;
        align-items: center;
        width: 95%;
        margin: 10px;

        &.human {
          justify-content: end;
          text-align: right;
        }

        &.bot {
          justify-content: start;
          text-align: left;

          img {
            width: 50px;
            margin-right: 8px;
          }
        }

        p {
          width: fit-content;
          padding: 5px;
          border-radius: 10px;
          background-color: #F9F9F9;
          line-height: normal;
        }
      }
    }
  }

  .chatInputContainer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;

    input {
      width: 100%;
      height: 100%;
      padding: 0 5px;
      background-color: #F9F9F9;

      &::placeholder {
        color: #76CEE5;
      }
    }

    button {
      width: 12%;
      height: 100%;
      background-color: #F9F9F9;
    }
  }
`;

export default Chat;
