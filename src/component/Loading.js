import React from "react";
import styled, { keyframes } from "styled-components";

import kuma from "../assets/kuma.png";

const Loading = () => {
  return (
    <LoadingContainer>
      <div className="loading">
        <LoadingPhrase>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </LoadingPhrase>
        <div className="loadingStatus" />
      </div>
      <div>
        <img className="kuma" src={kuma} alt="kuma" />
      </div>
    </LoadingContainer>
  );
};

const LoadingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading {
    width: 100%;
    padding: 20px 0;

    .loadingStatus {
      height: 15px;
      margin: 10px 30px;
      border-radius: 10px;
      background-color: aliceblue;
    }
  }

  .kuma {
    width: 200px;
  }
`;

const LoadingPhrase = styled.div`
  text-align: center;
  padding: 10px 0;

  span {
    display: inline-block;
    font-size: 24px;
    font-family: 'Itim';
    animation: ${LoadingAnimation} 1s infinite;

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }

    &:nth-child(4) {
      animation-delay: 0.3s;
    }

    &:nth-child(5) {
      animation-delay: 0.4s;
    }

    &:nth-child(6) {
      animation-delay: 0.5s;
    }

    &:nth-child(7) {
      animation-delay: 0.6s;
    }

    &:nth-child(8) {
      animation-delay: 0.7s;
    }

    &:nth-child(9) {
      animation-delay: 0.8s;
    }

    &:nth-child(10) {
      animation-delay: 0.9s;
    }
  }
`;

export default Loading;
