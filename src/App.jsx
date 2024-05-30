import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from "../src/Pages/Home.jsx";
import Posts from "../src/Pages/Posts.jsx";
import AddPost from "./Pages/AddPost/AddPost.jsx";
import PostPage from "../src/Pages/PostPage/PostPage.jsx";
import Register from "../src/Components/Register/Register.jsx";
import Login from "../src/Components/Login/Login.jsx";
import RankingPage from "./Pages/RankingPage/RankingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
