import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {firebase} from "../../../firebaseConfig.js";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("User logged in successfully");
      toast.success("Login bem-sucedido!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/posts");
      }, 500);
    } catch (err) {
      setError(err.message);
      console.error("Error logging in user:", err);
    }
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
