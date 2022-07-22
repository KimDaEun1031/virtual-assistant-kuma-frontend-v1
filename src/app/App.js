import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Calendar from "../component/Calendar";
import Chat from "../component/Chat";
import Login from "../component/Login";
import Main from "../component/Main";
import Preference from "../component/Preference";
import Weather from "../component/Weather";

const App = () => {
  return (
    <MainContainer>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
>>>>>>> 34f01fc96c567aab07d3f45b2e2461858720f740
        <Route path="/chat" element={<Chat />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/preference" element={<Preference />} />
      </Routes>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #92E32B;
`;

export default App;
