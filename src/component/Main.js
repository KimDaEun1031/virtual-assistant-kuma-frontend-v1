import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import { getCalendarEvent } from "../api";
import calendarIcon from "../assets/icons/calendar.png";
import chatIcon from "../assets/icons/chat.png";
import cludeIcon from "../assets/icons/clude.png";
import homeIcon from "../assets/icons/home.png";
import settingIcon from "../assets/icons/settings.png";
import speechBubble from "../assets/main-speech-bubble.png";
import Model from "./Model";

const Main = () => {
  const [sentenseList, setSentenseList] = useState([
    "안녕? 나는 KUMA라고 해! 뭘 도와줄까?",
    "오늘 어땠어?",
    "나는 오늘 KOA네 가서 놀고 왔어!"
  ]);
  const [currentText, setCurrentText] = useState({
    index: 0,
    text: sentenseList[0],
    length: 1,
  });

  const timer = useRef(null);

  const unmountTimer = () => {
    const timeoutInfo = timer.current;
    if (timeoutInfo) {
      timer.current = undefined;
      clearTimeout(timeoutInfo);
    }
  };

  const typingAnimation = useCallback(() => {
    const currentTextContent = currentText.text;
    const currentTextLength = currentText.length;
    const currentIndex = currentText.index;

    if (currentTextContent.length === currentTextLength) {
      if (currentIndex >= sentenseList[0].length - 1) {
        unmountTimer();
        return false;
      } else {
        setCurrentText({
          index: currentIndex + 1,
          text: sentenseList[0][currentIndex + 1],
          length: 1,
        });
      }
    }

    setCurrentText({ ...currentText, length: currentTextLength + 1 });

    return true;
  }, [currentText, sentenseList]);

  useEffect(() => {
    timer.current = setTimeout(typingAnimation, 40);
    return unmountTimer;
  }, [typingAnimation]);

  const stringToRender = currentText.text.substring(0, currentText.length);

  const getEvent = async () => {
    const result = await getCalendarEvent();
    const { todayEvent } = result.data;

    if (todayEvent) {
      setSentenseList([
        ...sentenseList,
        todayEvent
      ]);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <MainContainer>
      <div className="characterContainer">
        <div className="characterSpeechBubble">
          <img src={speechBubble} alt="speechBubble" />
          <div className="sentenseContainer">
            <p className="sentense">{stringToRender}</p>
          </div>
        </div>
        <Canvas flat linear className="character">
          <spotLight intensity={0} position={[300, 300, 4000]} />
          <directionalLight intensity={1} position={[0, -10, 50]} />
          <Suspense fallback={null}>
            <Stage intensity={0.2}>
              <Model />
            </Stage>
          </Suspense>
        </Canvas>
        <div className="characterInfo">
          <p className="characterName">KUMA</p>
          <p className="characterSentence">귀여운 아기곰</p>
        </div>
      </div>
      <div className="menuContainer">
        <ul>
          <li>
            <img src={settingIcon} alt="preference" />
          </li>
          <li>
            <img src={cludeIcon} alt="weather" />
          </li>
          <li className="home">
            <img src={homeIcon} alt="home" />
          </li>
          <li>
            <img src={chatIcon} alt="chat" />
          </li>
          <li>
            <img src={calendarIcon} alt="calendar" />
          </li>
        </ul>
        <div className="line" />
      </div>
    </MainContainer>
  );
};

const TypingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const MenuAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const MainContainer = styled.div`
  position: relative;
  height: 100%;

  .characterContainer {
    position: relative;
    height: 100%;

    .characterSpeechBubble {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);

      img {
        width: 250px;
        filter: invert(39%) sepia(72%) saturate(1857%) hue-rotate(73deg) brightness(89%) contrast(83%);
      }

      .sentenseContainer {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 170px;
        height: 45%;

        .sentense {
          display: inline-block;
          width: 160px;
          margin: 25px 10px;
          font-size: 18px;
          overflow: hidden;
          animation: ${TypingAnimation} 0.04s steps(20, end);
        }
      }
    }

    .characterInfo {
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .characterName {
        font-size: 34px;
        font-family: 'Itim';
        color: #368F16;
      }

      .characterSentence {
        margin-top: 5px;
        color: #288BAA;
      }
    }
  }

  .menuContainer {
    position: absolute;
    bottom: 0;
    width: 100%;
    animation: ${MenuAnimation} 0.5s linear;

    ul {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 50px;
      background-color: #F9F9F9;
      border-radius: 10px 10px 0 0;

      li {
        text-align: center;

        &.home {
          transform: translateY(-25px);
          padding: 5px;
          border-radius: 50px;
          border: 3px #92E32B solid;
          background-color: #F9F9F9;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -19px;
            width: 20px;
            height: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0px -10px 0 0 #92E32B;
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -19px;
            width: 20px;
            height: 20px;
            border-top-left-radius: 20px;
            box-shadow: 0px -10px 0 0 #92E32B;
          }

          img {
            filter: invert(66%) sepia(59%) saturate(5021%) hue-rotate(323deg) brightness(103%) contrast(120%);
          }
        }

        img {
          margin: 5px;
          width: 24px;
          filter: invert(85%) sepia(7%) saturate(8%) hue-rotate(340deg) brightness(94%) contrast(86%);
        }

        &:nth-child(1) {
          img {
            filter: invert(44%) sepia(26%) saturate(0%) hue-rotate(164deg) brightness(76%) contrast(93%);
          }
        }

        &:nth-child(2) {
          img {
            filter: invert(74%) sepia(45%) saturate(700%) hue-rotate(166deg) brightness(101%) contrast(98%);
          }
        }

        &:nth-child(4) {
          img {
            filter: invert(71%) sepia(69%) saturate(534%) hue-rotate(358deg) brightness(109%) contrast(101%);
          }
        }

        &:nth-child(5) {
          img {
            filter: invert(58%) sepia(8%) saturate(2754%) hue-rotate(71deg) brightness(104%) contrast(106%);
          }
        }
      }
    }

    .line {
      position: absolute;
      bottom: 13px;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 3px;
      border-radius: 5px;
      background-color: rgba(146, 227, 43, 0.5);
    }
  }
`;

export default Main;
