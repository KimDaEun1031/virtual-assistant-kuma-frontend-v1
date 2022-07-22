import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { updateUser } from "../api";
import koa from "../assets/characters/koa.png";
import koi from "../assets/characters/koi.png";
import kuma from "../assets/characters/kuma.png";
import exit from "../assets/icons/exit.png";
import PreferenceModal from "./PreferenceModal";

const Preference = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "KUMA",
    character: "kuma",
  });

  const handleOpenModal = (event) => {
    const { value } = event.currentTarget;

    setModalNumber(value);
    setOpenModal(true);
  };

  const handleModal = (result) => {
    setOpenModal(result);
  };

  const handleChangeInfo = (event) => {
    const { name, value } = event.currentTarget;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, character } = userInfo;
    const result = await updateUser(state.email, name, character);

    const user = result.data.user;

    setUserInfo({
      name: user.name,
      character: user.character,
    });
  };

  return (
    <PreferenceContainer>
      <div className="preferenceInfo">
        <button onClick={() => {navigate("/main");}}>
          <img src={exit} alt="exitButton" />
        </button>
        <span>Preference</span>
        <div />
      </div>
      <div className="preference">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="nickName">
              <p>Nickname</p>
              <div className="line" />
              <input
                type="text"
                name="name"
                onChange={handleChangeInfo}
                value={userInfo.name}
              />
              <div className="line" />
            </div>
            <div className="characters">
              <p>Characters</p>
              <div className="line" />
              <div className="characterList">
                <button
                  type="button"
                  value="koa"
                  name="character"
                  onClick={handleChangeInfo}
                >
                  <img src={koa} alt="koa" />
                </button>
                <button
                  type="button"
                  value="koi"
                  name="character"
                  onClick={handleChangeInfo}
                >
                  <img src={koi} alt="koi" />
                </button>
                <button
                  type="button"
                  value="kuma"
                  name="character"
                  onClick={handleChangeInfo}
                >
                  <img src={kuma} alt="kuma" />
                </button>
              </div>
            </div>
            <button className="submitBtn">변경사항 저장</button>
          </form>
          <div className="line" />
          <div className="helpAssistant">
            <p>Help Assistant</p>
            <div className="line" />
            <div className="helpList">
              <button
                value="0"
                onClick={handleOpenModal}
              >
                Home
              </button>
              <button
                value="1"
                onClick={handleOpenModal}
              >
                ChatBot
              </button>
              <button
                value="2"
                onClick={handleOpenModal}
              >
                Calendar
              </button>
              <button
                value="3"
                onClick={handleOpenModal}
              >
                Weather
              </button>
              <button
                value="4"
                onClick={handleOpenModal}
              >
                Character
              </button>
            </div>
          </div>
          <div className="footer">
            <button className="logoutBtn">로그아웃</button>
            <p>Copyrightⓒ2022 DaeunKim All rights reserved.</p>
          </div>
        </div>
      </div>
      {openModal && <PreferenceModal modalNumber={modalNumber} handleModal={handleModal} />}
    </PreferenceContainer>
  );
};

const PreferenceContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .line {
    width: 100%;
    height: 3px;
    border-radius: 5px;
    background-color: rgba(54, 143, 22, 0.7);
  }

  .preferenceInfo {
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
      }
    }

    span {
      font-size: 28px;
      font-family: "Itim";
      color: #368F16;
    }
  }

  .preference {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .container {
      position: relative;
      width: 85%;
      height: 90%;
      margin-top: 40px;
      padding: 0 10px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.8);

      p {
        margin: 2px 0;
        font-size: 22px;
        font-family: "Itim";
        color: #368F16;
      }

      form {
        text-align: center;

        .nickName {
          margin-top: 10px;
          text-align: left;

          input {
            width: 99%;
            padding: 5px 0;
            background-color: transparent;
            font-size: 16px;
            font-family: 'Katuri';
          }
        }

        .characters {
          margin-top: 10px;
          text-align: left;

          .characterList {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;

            button {
              background-color: transparent;

              &:focus {
                border: 2px dashed rgba(43, 122, 15, 0.5);
                border-radius: 10px;
              }

              img {
                width: 100%;
              }
            }
          }
        }

        .submitBtn {
          margin: 10px;
          border-radius: 50px;
          background-color: #92E32B;
          font-size: 14px;
          font-family: "Itim";
          color: white;
        }
      }

      .helpAssistant {
        margin-top: 10px;

        .helpList {
          padding: 10px 0;
          text-align: center;

          button {
            margin: 5px 10px;
            border-radius: 50px;
            background-color: #92E32B;
            font-size: 16px;
            font-family: "Itim";
            color: white;
            text-align: center;
          }
        }
      }

      .footer {
        position: absolute;
        left: 0;
        bottom: 30px;
        width: 100%;
        text-align: center;

        button {
          margin: 10px;
          border-radius: 50px;
          background-color: #92E32B;
          font-size: 14px;
          font-family: "Itim";
          color: white;
          text-align: center;
        }

        p {
          font-size: 15px;
        }
      }
    }
  }
`;

export default Preference;
