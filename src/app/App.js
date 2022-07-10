import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Chat from "../component/Chat";
import Loading from "../component/Loading";
import Login from "../component/Login";
import Main from "../component/Main";

const App = () => {
  return (
    <MainContainer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
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
