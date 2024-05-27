import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {firebase} from "../../../firebaseConfig.js";
import styles from "./NotLogged.module.css";

const NotLogged = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isUserLoggedIn) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <p className={styles.message}>Você não está logado.</p>
        <div className={styles.buttons}>
          <Link to="/login" className={styles.button}>
            Login
          </Link>
          <Link to="/register" className={styles.button}>
            Registro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotLogged;
