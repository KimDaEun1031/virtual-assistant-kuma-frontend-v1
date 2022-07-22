import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import homeExample from "../assets/assistant-example.png";

const PreferenceModal = ({ modalNumber, handleModal }) => {
  const slideRef = useRef(null);
  const [count, setCount] = useState(Number(modalNumber));

  const handleDisableItems = (number) => {
    const childs = slideRef.current.children;

    [...childs].map((item, idx) => {
      if (idx !== number) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  };

  const handleNextSlider = () => {
    if (count < 4) {
      setCount(count + 1);
    } else {
      setCount(4);
    }

    handleDisableItems(count + 1);
  };

  const handlePreviousSlider = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }

    handleDisableItems(count - 1);
  };

  const handleCloseModal = () => {
    handleModal(false);
  };

  useEffect(() => {
    handleDisableItems(count);
  }, []);

  return (
    <PreferenceModalContainer>
      <ul ref={slideRef}>
        <li>
          <span>1</span>
          <img src={homeExample} alt="example" />
        </li>
        <li>
          <span>2</span>
          <img src={homeExample} alt="example" />
        </li>
        <li>
          <span>3</span>
          <img src={homeExample} alt="example" />
        </li>
        <li>
          <span>4</span>
          <img src={homeExample} alt="example" />
        </li>
        <li>
          <span>5</span>
          <img src={homeExample} alt="example" />
        </li>
      </ul>
      <div className="btnGroup">
        <button
          type="button"
          className="previousBtn"
          disabled={count === 0 ? true : false}
          onClick={handlePreviousSlider}
        >
          ←
        </button>
        <button
          type="button"
          className="cancelBtn"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="nextBtn"
          disabled={count === 4 ? true : false}
          onClick={handleNextSlider}
        >
          →
        </button>
      </div>
    </PreferenceModalContainer>
  );
};

const PreferenceModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;

  ul {
    display: flex;
  }

  .btnGroup {
    display: flex;
    justify-content: space-evenly;

    button {
      padding: 2px 15px;
      border-radius: 50px;
      margin: 0 10px;
      font-family: "Itim";
      font-size: 16px;
      color: white;
      background-color: #92E32B;

      &.previousBtn, &.nextBtn {
        padding: 3px;
        border-radius: 50%;
        font-size: 20px;
        font-family: 'Katuri';
      }

      &:disabled {
        background-color: #7EC722;
        opacity: 0.5;
      }
    }
  }
`;

export default PreferenceModal;
