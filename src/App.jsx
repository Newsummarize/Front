import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Main />} /> {/* 제일 먼저 뜨는 페이지: 로그인 페이지 */}
    </Routes>
  );
}


export default App;