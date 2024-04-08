// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Ensure this path is correct

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
