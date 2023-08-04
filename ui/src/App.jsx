import React, { useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/header/header";
import CanvasList from './components/canvas/canvas-list/CanvasList';
import CanvasBoard from "./components/canvas/canvas-board/CanvasBoard";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import NotFound from "./components/NotFound/NotFound";
import { Layout } from "antd";
import "./App.css";

const { Content } = Layout;

export const UserContext = React.createContext();

function App() {

  const [user,setUser] = useState({});

  useEffect(()=>{
    if( !Object.keys(user)?.length && !window.location.pathname.includes('login')){
      window.location.assign('/login');
    }
  },[user]);

  return (
    <>
     <UserContext.Provider value={{ user, setUser}}>
      <HeaderComponent />
      <Content className="content-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/board/:id" element={<CanvasBoard/>} />
            <Route path="/board/create" element={<CanvasBoard/>} />
            <Route path="/boards" element={<CanvasList/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/login" element={<Login/>} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </Content>
      </UserContext.Provider>
    </>
  );
}

export default App;
