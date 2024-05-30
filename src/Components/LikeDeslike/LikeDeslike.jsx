import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig.js";
import style from "./LikeDeslikeButton.module.css";

const LikeDislikeButton = ({postId, userEmail}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    postRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setUserReaction(data.userReaction || null);
      }
    });

    return () => {
      postRef.off();
    };
  }, [postId]);

  const handleLikeClick = () => {
    if (userReaction === "like") {
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          likes: likes - 1,
          userReaction: null,
        });
      addPoints(-1);
    } else {
      let likeDelta = 1;
      let dislikeDelta = 0;
      if (userReaction === "dislike") {
        dislikeDelta = -1;
      }
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          likes: likes + likeDelta,
          dislikes: dislikes + dislikeDelta,
          userReaction: "like",
        });
      addPoints(likeDelta);
    }
  };

  const handleDislikeClick = () => {
    if (userReaction === "dislike") {
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          dislikes: dislikes - 1,
          userReaction: null,
        });
      addPoints(-1);
    } else {
      let dislikeDelta = 1;
      let likeDelta = 0;
      if (userReaction === "like") {
        likeDelta = -1;
      }
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          dislikes: dislikes + dislikeDelta,
          likes: likes + likeDelta,
          userReaction: "dislike",
        });
      addPoints(dislikeDelta);
    }
  };

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

  return (
    <div className={style.likeDislikeButton}>
      <button
        onClick={handleLikeClick}
        className={`${style.button} ${
          userReaction === "like" ? style.liked : ""
        }`}
      >
        Like ({likes})
      </button>
      <button
        onClick={handleDislikeClick}
        className={`${style.button} ${
          userReaction === "dislike" ? style.disliked : ""
        }`}
      >
        Dislike ({dislikes})
      </button>
    </div>
  );
};

export default LikeDislikeButton;
