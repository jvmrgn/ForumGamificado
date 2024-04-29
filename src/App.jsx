import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from "../src/Pages/Home.jsx";
import Posts from "../src/Pages/Posts.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
