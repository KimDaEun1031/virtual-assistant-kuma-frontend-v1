import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import exit from "../assets/icons/exit.png";
import mic from "../assets/icons/mic.png";
import plus from "../assets/icons/plus.png";
import CalendarModal from "./CalendarModal";

const Calendar = () => {
  const [voiceOn, setVoiceOn] = useState(false);

  const toggleMicButton = () => {
    setVoiceOn((micOn) => !micOn);
  };

  return (
    <CalendarContainer>
      <div className="calendarInfo">
        <button>
          <img src={exit} alt="exitButton" />
        </button>
        <span>Calendar</span>
        <button>
          <img className="calendarBtn" src={plus} alt="addCalendarBtn" />
        </button>
      </div>
      <div className="voice">
        <pre className="example">
          <p>[예시]</p>
          <p>12월 25일 오전 9시</p>
          <p>케이크 만들기</p>
        </pre>
        <button className="micBtn" onClick={toggleMicButton}>
          <img className={voiceOn ? "micOn" : ""} src={mic} alt="voiceBtn" />
        </button>
        {voiceOn ?
          <VoiceOn>
            {[...Array(9)].map((x, i) =>
              <div key={i} className="bar" />
            )}
          </VoiceOn> :
          <div className="guide">
            <p>마이크 버튼을 누르면 일정을 등록할 수 있습니다.</p>
          </div>
        }
        <CalendarModal />
      </div>
    </CalendarContainer>
  );
};

const VoiceAnimation = keyframes`
  0% {
    opacity: .35;
    height: 3px;
  }

  100% {
    opacity: 1;
    height: 30px;
  }
`;

const CalendarContainer = styled.div`
  height: 100%;
  text-align: center;

  .calendarInfo {
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

        &.calendarBtn {
          margin-right: 5px;
        }
      }
    }

    span {
      font-size: 28px;
      font-family: "Itim";
      color: #368F16;
    }
  }

  .voice {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    .example {
      margin-bottom: 50px;
      font-weight: bold;
      color: #368F16;

      p {
        padding: 2px;
      }
    }

    .micBtn {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #EAEAEA;
      box-shadow: 0 0 10px #EAEAEA;
      opacity: 0.7;

      img {
        width: 100px;
        filter: invert(41%) sepia(16%) saturate(714%) hue-rotate(59deg) brightness(95%) contrast(86%);

        &.micOn {
          filter: invert(42%) sepia(83%) saturate(456%) hue-rotate(59deg) brightness(90%) contrast(97%);
        }
      }
    }

    .guide {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }
  }
`;

const VoiceOn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  .bar {
    background: #368F16;
    bottom: 1px;
    height: 3px;
    width: 5px;
    margin: 0px 4px;
    border-radius: 5px;
    animation: ${VoiceAnimation} 0ms -600ms linear infinite alternate;

    &:nth-child(1) {
      left: 1px;
      animation-duration: 474ms;
    }

    &:nth-child(2) {
      left: 15px;
      animation-duration: 433ms;
    }

    &:nth-child(3) {
      left: 29px;
      animation-duration: 407ms;
    }

    &:nth-child(4) {
      left: 43px;
      animation-duration: 458ms;
    }

    &:nth-child(5) {
      left: 57px;
      animation-duration: 400ms;
    }

    &:nth-child(6) {
      left: 71px;
      animation-duration: 427ms;
    }

    &:nth-child(7) {
      left: 85px;
      animation-duration: 441ms;
    }

    &:nth-child(8) {
      left: 99px;
      animation-duration: 419ms;
    }

    &:nth-child(9) {
      left: 113px;
      animation-duration: 487ms;
    }

    &:nth-child(10) {
      left: 127px;
      animation-duration: 127px;
    }
  }
`;

export default Calendar;
