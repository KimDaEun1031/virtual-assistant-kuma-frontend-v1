import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import homeExample from "../assets/assistant-example.png";

const PreferenceModal = () => {
  const slideRef = useRef(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCount(() => {
        if (count < 5) {
          setCount(count + 1);
        } else {
          setCount(1);
        }
      });

      handleSlider(count);

      return () => clearTimeout(interval);
    }, 3000);
  });

  const handleSlider = count => {
    if (count === 5) {
      console.log(window.innerWidth);
      slideRef.current.style.transform = "translateX(0)";
    } else {
      console.log(window.innerWidth);
      slideRef.current.style.transform = `translateX(-${
        window.innerWidth * count
      }px)`;
    }
  };

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
      <button type="button" className="cancelBtn">Cancel</button>
    </PreferenceModalContainer>
  );
};

const PreferenceModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(78, 78, 78, 0.5);
  text-align: center;

  ul {
    display: flex;
  }

  button {
    padding: 2px 15px;
    border-radius: 50px;
    margin: 0 10px;
    font-family: "Itim";
    font-size: 16px;
    color: white;
    background-color: #92E32B;
  }
`;

export default PreferenceModal;
