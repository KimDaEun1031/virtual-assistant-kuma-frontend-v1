import React from "react";
import styled, { keyframes } from "styled-components";

import exit from "../assets/icons/exit.png";
import reload from "../assets/icons/reload.png";
import rainboots from "../assets/recommandItemIcons/rainboots.png";
import raincoat from "../assets/recommandItemIcons/raincoat.png";
import umbrella from "../assets/recommandItemIcons/umbrella.png";
import rainy from "../assets/weatherIcons/rainy.png";

const Weather = () => {
  return (
    <WeatherContainer>
      <div className="weatherInfo">
        <button>
          <img src={exit} alt="exitButton" />
        </button>
        <span>Weather</span>
        <div />
      </div>
      <div className="weather">
        <div className="tempDetail">
          <p className="date">6월 30일</p>
          <div className="currentTemp">
            <p>24</p>
            <sup>⬇1°</sup>
          </div>
          <div className="beforAfterTemp">
            <p className="beforeTemp">23</p>
            <div className="line" />
            <p className="afterTemp">25</p>
          </div>
        </div>
        <div className="weatherWarnInfo">
          <p>미세</p>
          <p className="upm">초미세</p>
        </div>
      </div>
      <div className="weatherDetail">
        <div className="container">
          <div className="currentWeatherIcon">
            <img src={rainy} alt="rainy" />
          </div>
          <div className="currentLocation">
            <p>화성시 청계동</p>
            <button>
              <img src={reload} alt="reload" />
            </button>
          </div>
          <div className="recommandItem">
            <p>오늘의 추천 아이템</p>
            <div className="itemList">
              <div className="item">
                <img src={umbrella} alt="umbrella" />
                <p>우산</p>
              </div>
              <div className="item">
                <img src={raincoat} alt="raincoat" />
                <p>우비</p>
              </div>
              <div className="item">
                <img src={rainboots} alt="rainboots" />
                <p>장화</p>
              </div>
            </div>
          </div>
          <div className="rainfallInfo">
            <div className="text">
              <p>285</p>
              <p>285</p>
            </div>
            <p className="rainfallText">강수량(mm)</p>
          </div>
        </div>
      </div>
    </WeatherContainer>
  );
};

const RainfallTextAnimation = keyframes`
  0%, 100% {
    clip-path: polygon(0% 45%, 15% 44%, 32% 50%, 54% 60%,
      70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
  }

  50% {
    clip-path: polygon(0% 60%, 16% 65%, 34% 66%, 51% 62%,
      67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
  }
`;

const WeatherContainer = styled.div`
  width: 100%;
  height: 100%;

  p {
    font-family: "Itim";
  }

  .weatherInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    width: 100%;
    height: 40px;
    background-color: #F9F9F9;

    button {
      background-color: transparent;

      img {
        width: 20px;
      }
    }

    span {
      font-size: 28px;
      font-family: "Itim";
      color: #368F16;
    }
  }

  .weather {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 40px 10px;

    .tempDetail {

      .date {
        font-size: 24px;
        font-family: "Itim";
        font-weight: 400;
      }

      .currentTemp {
        display: flex;

        p {
          font-size: 5rem;
        }

        sup {
          font-size: 18px;
          font-family: "Itim";
          color: #353535;
        }
      }

      .beforAfterTemp {
        display: flex;
        align-items: center;

        p {
          font-size: 18px;

          &.beforeTemp {
            margin-right: 5px;
            color: #0663DB;
          }

          &.afterTemp {
            margin-left: 5px;
            color: #DB1F06;
          }
        }

        .line {
          width: 50%;
          height: 2px;
          background-color: rgba(52, 52, 52, 0.5);
        }
      }
    }

    .weatherWarnInfo {
      text-align: center;

      p {
        margin-bottom: 10px;
        padding: 4px 15px 3px;
        border-radius: 50px;
        background-color: #556FF5;
        font-size: 14px;
        font-weight: bold;
        color: #F9F9F9;
      }

      .upm {
        background-color: #FF5E5E;
      }
    }
  }

  .weatherDetail {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;

    .container {
      width: 90%;
      height: 65%;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.8);

      .currentWeatherIcon {
        margin-top: 30px;

        img {
          width: 50%;
        }
      }

      .currentLocation {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        p {
          font-size: 14px;
          font-weight: bold;
          color: #353535;
        }

        button {
          margin-top: 2px;
          background-color: transparent;

          img {
            width: 16px;
            filter: invert(52%) sepia(8%) saturate(0%) hue-rotate(153deg) brightness(101%) contrast(79%);
          }
        }
      }

      .recommandItem {
        margin: 20px 10px;
        padding: 10px;
        border: 2px dashed rgba(54, 157, 252, 0.6);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);

        p {
          font-family: 'Katuri';
        }

        .itemList {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;

          .item {
            img {
              width: 50px;
            }
          }
        }
      }

      .rainfallInfo {
        position: relative;
        height: 12%;

        .text {
          position: relative;

          p {
            position: absolute;
            right: 10px;
            color: transparent;
            font-size: 50px;
            font-family: 'Katuri';

            &:nth-child(1) {
              color: transparent;
              -webkit-text-stroke: 2px #03A9F4;
            }

            &:nth-child(2) {
              color: #03A9F4;
              animation: ${RainfallTextAnimation} 4s ease-in-out infinite;
            }
          }
        }

        .rainfallText {
          position: absolute;
          right: 10px;
          bottom: 0;
          font-size: 10px;
          font-family: 'Katuri';
        }
      }
    }
  }
`;

export default Weather;
