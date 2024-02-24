// import { useState } from "react";
import React from "react";
import "./App.css";
import Login from "./components/login";
import { useLocation } from "react-router-dom"; // Import useLocation from React Router
import ContentPage from "./components/contentPage";
function App() {
  const location = useLocation(); // Get the location object
  const isLoggedIn = location.state?.isLoggedIn || false; // Extract isLoggedIn from location state
  return (
    <>
      <div>
        {isLoggedIn ? <ContentPage /> : <Login />}

        {/* <ContentPage /> */}
      </div>
    </>
  );
}

export default App;
