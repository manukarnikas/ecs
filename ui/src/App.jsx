import { useEffect, useState } from "react";
import HeaderComponent from "./components/header/header";
import FooterComponent from "./components/footer/footer";
import ContentComponent from "./components/content/content";
import "./App.css";

function App() {

  return (
    <>
      <HeaderComponent />
      <ContentComponent />
      <FooterComponent />
    </>
  );
}

export default App;
