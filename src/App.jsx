import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from "../src/Pages/Home.jsx";
import Posts from "../src/Pages/Posts.jsx";
import AddPost from "../src/Pages/AddPost.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
