import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {firebase} from "../../../firebaseConfig";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AppBar.module.css";
import img from "../../assets/logo.jpeg";

function AppBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      toast.success("Logout bem-sucedido!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Erro ao fazer logout.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <a className={styles.appNameAnchor}>
        <div>
          <img src={img} className={styles.logo} alt="Logo" />
        </div>
        <div>
          <p className={styles.projectName}>PB</p>
        </div>
      </a>

      <nav className={styles.containerAppBar}>
        <div className={styles.containerBotoes}>
          <a className={styles.botaoApp} href="/">
            Página Inicial
          </a>
          <a className={styles.botaoApp} href="/posts">
            Posts
          </a>
          <a className={styles.botaoApp} href="/addpost">
            Postar
          </a>
        </div>
      </nav>
      {user ? (
        <div className={styles.userInfo}>
          <p className={styles.userEmail}>{user.email}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
}

export default AppBar;
