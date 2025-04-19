import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "../Front/src/pages/log";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log />} />
        {/* 추후 SignUp 페이지 추가 예정 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;