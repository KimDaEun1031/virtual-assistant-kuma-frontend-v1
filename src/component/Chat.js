import React from "react";
import styled from "styled-components";

import consulting from "../assets/icons/consulting.png";
import exit from "../assets/icons/exit.png";
import kumaProfile from "../assets/profiles/kuma-profile.png";

const Chat = () => {
  return (
    <ChatContainer>
      <div className="chatInfo">
        <button>
          <img src={exit} alt="exitButton" />
        </button>
        <span>KUMA</span>
        <button>
          <img className="consultingBtn" src={consulting} alt="consultingButton" />
        </button>
      </div>
      <div className="chat">
        <ul>
          <li className="human">
            <p>영어 공부해</p>
          </li>
          <li className="bot">
            <img src={kumaProfile} alt="profile" />
            <p>무슨 공부하고 있는데?</p>
          </li>
          <li className="human">
            <p>나 지금 공부하고 있어!</p>
          </li>
          <li className="bot">
            <img src={kumaProfile} alt="profile" />
            <p>뭐해?</p>
          </li>
        </ul>
      </div>
      <div className="chatInputContainer">
        <input type="text" placeholder="KUMA에게 메세지 보내기" />
        <button>전송</button>
      </div>
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
      flex-flow: column-reverse;
      align-items: center;
      height: 100%;
      overflow: scroll;

      li {
        display: flex;
        align-items: center;
        width: 95%;
        margin: 10px;

        &:first-child {
          margin-bottom: 50px;
        }

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
