import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import MainPage from "./pages/mainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
