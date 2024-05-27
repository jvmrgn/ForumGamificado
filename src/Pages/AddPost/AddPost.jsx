import React from "react";
import AddPost from "../../Components/AddPost/AddPost.jsx";
import AppBar from "../../Components/AppBar/AppBar.jsx";
import NotLogged from "../../Components/NotLogged/NotLogged.jsx";
import styles from "./AddPost.module.css";

function Home() {
  return (
    <div>
      <NotLogged />
      <AppBar />
      <div className={styles.margin}></div>
      <AddPost />
    </div>
  );
}

export default Home;
