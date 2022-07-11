import React from "react";
import styled from "styled-components";

const CalendarModal = () => {
  return (
    <CalendarModalContainer>
      <form>
        <div className="formContent">
          <input className="title" type="text" placeholder="제목을 입력해주세요" />
          <input className="date" type="datetime-local" />
          <div>
            <button className="submitBtn">Submit</button>
            <button type="button" className="cancelBtn">Cancel</button>
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
