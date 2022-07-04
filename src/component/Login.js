import React from "react";
import styled from "styled-components";

import googleLogo from "../assets/google-logo.png";
import kuma from "../assets/kuma.png";
import speechBubble from "../assets/speech-bubble.png";

const Login = () => {
  return (
    <LoginContainer>
      <div className="introPhrase">
        <p>나랑 이야기 하지 않을래?</p>
        <p>일상 AI 친구,</p>
        <p>KUMA</p>
      </div>
      <div className="loginButton">
        <button>
          <img src={googleLogo} alt="googleLogo" />
          <p>Sign in with Google</p>
        </button>
      </div>
      <div className="loginCharacter">
        <img className="kuma" src={kuma} alt="kuma" />
      </div>
      <div className="speechBubble">
        <img src={speechBubble} alt="speechBubble" />
        <p className="greetings">안녕?</p>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;

  .introPhrase {
    padding: 10px;

    p {
      padding: 2px 0;
      font-size: 32px;
      font-weight: bold;
      color: #FFFBFB;
    }
  }

  .loginButton {
    padding: 50px 10px;
    text-align: center;

    button {
      width: 80%;
      border-radius: 5px;
      background-color: #FFFFFF;
      box-shadow: 0px 1px 5px #75B425;

      img {
        float: left;
        width: 30px;
        padding: 3px 0;
      }

      p {
        margin-top: 9px;
      }
    }
  }

  .loginCharacter {
    position: relative;
    height: 60%;

    .kuma {
      position: absolute;
      width: 90%;
      bottom: 0;
      right: 0;
    }
  }

  .speechBubble {
    position: relative;
    opacity: 0.7;

    img {
      position: absolute;
      width: 30%;
      bottom: 0;
      left: 20px;
      transform: rotate( -55deg );
    }

    .greetings {
      position: absolute;
      bottom: 35px;
      left: 40px;
      font-size: 30px;
      font-weight: bold;
    }
  }
`;

export default Login;
