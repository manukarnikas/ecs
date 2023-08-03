import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/header/header";
import FooterComponent from "./components/footer/footer";
import CanvasList from './components/canvas/canvas-list/CanvasList';
import CanvasBoard from "./components/canvas/canvas-board/CanvasBoard";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import NotFound from "./components/NotFound/NotFound";

import { Layout } from "antd";

import "./App.css";

const { Content } = Layout;

function App() {

  return (
    <>
      <HeaderComponent />
      <Content className="content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/board/:id" element={<CanvasBoard/>} />
            <Route path="/board/create" element={<CanvasBoard/>} />
            <Route path="/boards" element={<CanvasList/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/" element={<Login/>} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </Content>
      <FooterComponent />
    </>
  );
}

export default App;
