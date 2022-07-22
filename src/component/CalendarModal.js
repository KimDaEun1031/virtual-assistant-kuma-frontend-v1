import React, { useState } from "react";
import styled from "styled-components";

import { createEvent } from "../api";

const CalendarModal = ({ handleModal, speechResult }) => {
  const handleCloseModal = () => {
    handleModal(false);
  };
  const [input, setInput] = useState({
    summary: speechResult.summary,
    date: speechResult.date,
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault();

    const { summary, date } = input;
    await createEvent(summary, date);
  };

  return (
    <CalendarModalContainer>
      <form onSubmit={handleSubmitEvent}>
        <div className="formContent">
          <input
            className="title"
            type="text"
            name="summary"
            placeholder="제목을 입력해주세요"
            onChange={handleChangeInput}
            value={input.summary}
            required
          />
          { speechResult.isDirect
            ? <input
              className="date"
              type="datetime-local"
              name="date"
              onChange={handleChangeInput}
              value={input.date}
              required
            />
            : <input
              className="date"
              type="text"
              name="date"
              placeholder="예시) 12월 25일 오전 9시 35분"
              onChange={handleChangeInput}
              value={input.date}
              required
            />
          }
          <div>
            <button className="submitBtn">Submit</button>
            <button type="button" className="cancelBtn" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      </form>
    </CalendarModalContainer>
  );
};

const CalendarModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(78, 78, 78, 0.5);

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .formContent {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80%;
      height: 25%;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.8);

      input {
        width: 80%;
        height: 20%;
        margin: 20px;
        padding: 5px;
        border-radius: 15px;
        font-size: 18px;

        &.title {
          margin-bottom: 5px;
        }

        &.date {
          margin-top: 5px;
        }
      }

      button {
        padding: 2px 15px;
        border-radius: 50px;
        margin: 0 10px;
        font-family: "Itim";
        font-size: 16px;
        color: white;

        &.submitBtn {
          background-color: rgba(95, 219, 42, 0.8);
        }

        &.cancelBtn {
          background-color: rgba(219, 53, 42, 0.8);
        }
      }
    }
  }
`;

export default CalendarModal;
