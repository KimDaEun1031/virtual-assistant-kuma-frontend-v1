import React from "react";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import menuInfo from "../constants/menuInfo";
import IconGlobalStyles from "./shared/IconGlobalStyles";

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <MenuContainer>
      <ul>
        {menuInfo.map((item) => (
          <li
            key={item.name}
            className={item.name === "main" ? "home" : ""}
          >
            <button onClick={() => {navigate(`/${item.name}`, {
              state: userInfo,
            });}}>
              <IconContext.Provider value={IconGlobalStyles}>
                {item.src}
              </IconContext.Provider>
            </button>
          </li>
        ))}
      </ul>
      <div className="line" />
    </MenuContainer>
  );
};

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

const MenuContainer = styled.div`
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

      button {
        background-color: transparent;
      }

      &.home {
        transform: translateY(-25px);
        padding: 5px;
        border-radius: 50%;
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

        .icon {
          margin: 7px 3px;
          color: #E4584C;
        }
      }

      &:nth-child(1) .icon {
        color: #A7A7A7;
      }

      &:nth-child(2) .icon {
        color: #0FDAE9;
      }

      &:nth-child(4) .icon {
        color: #EADF0A;
      }

      &:nth-child(5) .icon {
        color: #38C60B;
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
`;

export default MenuBar;
