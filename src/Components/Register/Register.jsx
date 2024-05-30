import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {firebase} from "../../../firebaseConfig.js";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        const userId = userCredential.user.uid;

        const usersRef = firebase.database().ref("users");
        usersRef.once("value", (snapshot) => {
          if (!snapshot.exists()) {
            usersRef.set({});
          }
        });

        await firebase.database().ref(`users/${userId}`).set({
          email: email,
          points: 0,
        });
      }

      console.log("User registered successfully");
      toast.success("Você se registrou com sucesso!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      setError(err.message);
      console.error("Error registering user:", err);
    }
  };

  return (
    <div className={styles.register}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
