import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, {
  Suspense,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { getTodayEvent, getToken } from "../api";
import speechBubble from "../assets/main-speech-bubble.png";
import { createCalendarEventText } from "../utils/createCalendarEventText";
import MenuBar from "./MenuBar";
import Model from "./Model";

const Main = () => {
  const location = useLocation();
  const [randomNum, setRandomNum] = useState(0);
  const [sentenseList, setSentenseList] = useState([
    "안녕? 나는 KUMA라고 해! 뭘 도와줄까?",
    "오늘 어땠어?",
    "나는 오늘 KOA네 가서 놀고 왔어!"
  ]);
  const [userInfo, setUserInfo] = useState([]);
  const charactersInfo = [
    {
      "kuma": "귀여운 아기곰",
    },
  ];

  const randomNumber = () => {
    const length = sentenseList.length;
    const randomNumber = Math.floor(Math.random() * length);

    return randomNumber;
  };

  const handleGetTodayEvent = async () => {
    const result = await getTodayEvent();

    if (result.data.user) {
      const filterCharactersInfo = charactersInfo.filter((item) => item[result.data.user.character]);
      const charcterInfo = filterCharactersInfo[0][result.data.user.character];

      setUserInfo(Object.assign(result.data.user, { charcterInfo }));
    }

    if (result.data.todayEvents && result.data.todayEvents.length !== 0) {
      const eventTexts = createCalendarEventText(result.data.todayEvents);

      eventTexts.forEach((item) => {
        setSentenseList([...sentenseList, item]);
      });
    }
  };

  const getEvent = async () => {
    if (localStorage.getItem("token")) {
      handleGetTodayEvent();
      return;
    }

    const query = location.search.split("?")[1];
    const params = new URLSearchParams(query);
    const code = params.get("code");

    localStorage.setItem("code", code);

    const result = await getToken(code);

    if (result.data.tokens) {
      localStorage.setItem("token", JSON.stringify(result.data.tokens));

      handleGetTodayEvent();
    }
  };

  useEffect(() => {
    getEvent();
    setRandomNum(randomNumber());
  }, []);

  return (
    <MainContainer>
      <div className="characterContainer">
        <div className="characterSpeechBubble">
          <img src={speechBubble} alt="speechBubble" />
          <div className="sentenseContainer">
            <p className="sentense">{sentenseList[randomNum]}</p>
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
          <p className="characterName">
            {userInfo && userInfo.character}
          </p>
          <p className="characterSentence">
            {userInfo && userInfo.charcterInfo}
          </p>
        </div>
      </div>
      <MenuBar />
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
        filter: invert(39%) sepia(72%) saturate(1857%)
          hue-rotate(73deg) brightness(89%) contrast(83%);
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
`;

export default Main;
