import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';
import Keyword from './pages/Keyword';
import My from './pages/My';
import Cate from './pages/CategoryNews';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/category/:categoryName" element={<Cate />} />
        <Route path="/my" element={<My />} />
        <Route path="/keyword/:keyword" element={<Keyword />} />
        <Route path="/" element={<Main />} /> {/* 제일 먼저 뜨는 페이지 */}
      </Routes>
    </>
  );
}

export default App;