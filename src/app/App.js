import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Calendar from "../component/Calendar";
import Chat from "../component/Chat";
import Loading from "../component/Loading";
import Login from "../component/Login";
import Main from "../component/Main";
import Weather from "../component/Weather";

const App = () => {
  return (
    <MainContainer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
      <Loading />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #92E32B;
`;

export default App;
