import React, {useState} from "react";
import {firebase} from "../../../firebaseConfig.js";
import styles from "./CommentForm.module.css";

const CommentForm = ({postId, userEmail}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const addPoints = (pointsToAdd) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const userRef = firebase.database().ref(`users/${userId}`);
      userRef.transaction((userData) => {
        if (userData) {
          userData.points = (userData.points || 0) + pointsToAdd;
        }
        return userData;
      });
    } else {
      console.error("Usuário não encontrado.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.trim() !== "") {
        const commentRef = firebase.database().ref(`posts/${postId}/comments`);
        await commentRef.push({
          content: comment,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
        setComment("");
        setError(null);
        addPoints(5);
      } else {
        setError("O comentário não pode estar vazio.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(
        "Ocorreu um erro ao adicionar o comentário. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={styles.commentForm}>
      <h3>Deixe um comentário:</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Digite seu comentário aqui..."
          required
        ></textarea>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CommentForm;
