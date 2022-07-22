import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { getWeatherInfo } from "../api";
import exit from "../assets/icons/exit.png";
import reload from "../assets/icons/reload.png";

const Weather = () => {
  const navigate = useNavigate();
  const [tempInfo, setTempInfo] = useState({
    previousTemp: "",
    currentTemp: "",
    nextTemp: "",
    differenceTemp: "",
    isIncrease: false,
  });
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [recommandItems, setRecommandItems] = useState([]);

  const weatherCode = [
    {
      code: 100,
      alt: "맑음:해",
      src: "sunny",
    },
    {
      code: 101,
      alt: "맑음:달",
      src: "moon",
    },
    {
      code: 300,
      alt: "구름많음:해",
      src: "sunny-cloudy",
    },
    {
      code: 301,
      alt: "구름많음:달",
      src: "moon-cloudy",
    },
    {
      code: 310,
      alt: "구름많음:해:비",
      src: "sunny-cloudy-rain",
    },
    {
      code: 311,
      alt: "구름많음:달:비",
      src: "moon-cloudy-rain",
    },
    {
      code: 410,
      alt: "비",
      src: "rainy",
    },
    {
      code: 420,
      alt: "눈/비",
      src: "rainy-snow",
    },
    {
      code: 430,
      alt: "눈",
      src: "snow",
    },
  ];

  const recommandItemList = [
    {
      "비" : [
        {
          alt: "우산",
          src: "umbrella",
        },
        {
          alt: "레인코트",
          src: "raincoat",
        },
        {
          alt: "레인부츠",
          src: "rainboots",
        },
        {
          alt: "손수건",
          src: "handkerchief",
        },
      ]
    },
    {
      "맑음" : [
        {
          alt: "선크림",
          src: "suncream",
        },
        {
          alt: "손수건",
          src: "handkerchief",
        },
        {
          alt: "모자",
          src: "hat",
        },
        {
          alt: "휴대용 선풍기",
          src: "fan",
        },
        {
          alt: "데오드란트",
          src: "deodorant",
        },
      ]
    }
  ];

  const options = {
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const currentDate = new Date().toLocaleString("ko-KR", options);
  const splitDate = currentDate.split(" ");

  const time = `${splitDate[splitDate.length - 1].split(":")[0]}00`;
  const date = splitDate.reduce((acc, cur, idx, arr) => {
    if (idx === 2) {
      arr.splice(1);
    }

    return acc + cur;
  }).split(".");

  const handleTempInfo = (tmpFilter) => {
    const differenceTemp = Number(tmpFilter[0][1]) - Number(tmpFilter[1][1]);

    let isNegative = false;

    if (differenceTemp !== 0 && Math.sign(differenceTemp) === -1) {
      isNegative = true;
    }

    setTempInfo({
      previousTemp: tmpFilter[0][1],
      currentTemp: tmpFilter[1][1],
      nextTemp: tmpFilter[2][1],
      differenceTemp,
      isIncrease: isNegative,
    });
  };

  const getWeather = async () => {
    const result = await getWeatherInfo();
    const entries = Object.entries(result.data.weatherResult);

    const tmpFilter = entries.filter((item) => item[0].includes("TMP"));
    handleTempInfo(tmpFilter);

    const timeFilter = entries.filter((item) => item[0].includes(time));

    let code = Number(`${timeFilter[1][1]}${timeFilter[2][1]}0`);

    if (timeFilter[1][1] === "4") {
      code = ("1800" < time || "0600" > time) ? 300 : 301;
    }

    if (("1800" < time || "0600" > time) && timeFilter[1][1] !== "4") {
      code = Number(`${timeFilter[1][1]}${timeFilter[2][1]}1`);
    }

    const info = weatherCode.filter((item) => item.code === code);
    const pcp = timeFilter[3][1] === "강수없음" ? 0 : timeFilter[3][1];

    setWeatherInfo(Object.assign(...info, { pcp }));
  };

  const handleRandomRecommandItem = () => {
    let items = recommandItemList[1]["맑음"];

    if (weatherInfo && weatherInfo.alt.includes("비")) {
      items = recommandItemList[0]["비"];
    }

    const randomItemList = [];
    const ItemList = [];
    let j = 0;

    const sameNum = (number) => {
      return randomItemList.find((item) => item === number);
    };

    while (j < 3) {
      const randomNumber = Math.floor(Math.random() * items.length);

      if (!sameNum(randomNumber)) {
        randomItemList.push(randomNumber);
        j++;
      }
    }

    for (const value of randomItemList) {
      ItemList.push(items[value]);
    }

    setRecommandItems(ItemList);
  };

  useEffect(() => {
    getWeather();
    handleRandomRecommandItem();
  }, []);

  return (
    <WeatherContainer>
      <div className="weatherInfo">
        <button onClick={() => {navigate("/main");}}>
          <img src={exit} alt="exitButton" />
        </button>
        <span>Weather</span>
        <div />
      </div>
      <div className="weather">
        <div className="tempDetail">
          <p className="date">{`${date[1]}월 ${date[2]}일`}</p>
          <div className="currentTemp">
            <p>{tempInfo && tempInfo.currentTemp}</p>
            <sup>{tempInfo && `${tempInfo.isIncrease ? "⬆" : "⬇"}${tempInfo.differenceTemp}`}°</sup>
          </div>
          <div className="beforAfterTemp">
            <p className="beforeTemp">{tempInfo && tempInfo.previousTemp}</p>
            <div className="line" />
            <p className="afterTemp">{tempInfo && tempInfo.nextTemp}</p>
          </div>
        </div>
        <div className="weatherWarnInfo">
          {/* <p>미세</p>
          <p className="upm">초미세</p> */}
        </div>
      </div>
      <div className="weatherDetail">
        <div className="container">
          <div className="currentWeatherIcon">
            {weatherInfo && <img
              src={require(`../assets/weatherIcons/${weatherInfo.src}.png`)}
              alt={weatherInfo.alt}
            />}
          </div>
          <div className="currentLocation">
            <p>화성시 청계동</p>
            <button className="reloadBtn">
              <img src={reload} alt="reload" onClick={() => {
                getWeather();
                handleRandomRecommandItem();
              }} />
            </button>
          </div>
          <div className="recommandItem">
            <p>오늘의 추천 아이템</p>
            <div className="itemList">
              {recommandItems && recommandItems.map((item) => (
                <div className="item" key={item.src}>
                  <img src={require(`../assets/recommandItemIcons/${item.src}.png`)} alt={item.alt} />
                  <p>{item.alt}</p>
                </div>
              ))}
            </div>
          </div>
          {weatherInfo && weatherInfo.alt.includes("비") &&
            <div className="rainfallInfo">
              <div className="text">
                <p>{weatherInfo.pcp}</p>
                <p>{weatherInfo.pcp}</p>
              </div>
              <p className="rainfallText">강수량(mm)</p>
            </div>}
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

const ReloadBtnAnimation = keyframes`
  100% {
    transform: rotate(720deg);
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
    text-align: center;

    .container {
      width: 90%;
      height: fit-content;
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

        .reloadBtn {
          margin-top: 2px;
          background-color: transparent;

          &:active {
            animation: ${ReloadBtnAnimation} 1s linear;
          }

          img {
            width: 16px;
            filter: invert(52%) sepia(8%) saturate(0%) hue-rotate(153deg) brightness(101%) contrast(79%);
          }
        }
      }

      .recommandItem {
        margin: 20px 10px 30px 10px;
        padding: 10px 10px 0 10px;
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
        height: 50px;

        .text {
          p {
            position: absolute;
            bottom: 20px;
            right: 10px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 3rem;
            font-family: 'Katuri';

            &:nth-child(1) {
              color: rgba(255, 255, 255, 0.5);
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
          bottom: 10px;
          font-size: 0.5rem;
          font-family: 'Katuri';
        }
      }
    }
  }
`;

export default Weather;
