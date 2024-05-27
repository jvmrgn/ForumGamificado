import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig.js";
import style from "./LikeDeslikeButton.module.css";

const LikeDislikeButton = ({postId}) => {
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
    } else {
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          likes: likes + 1,
          dislikes: userReaction === "dislike" ? dislikes - 1 : dislikes,
          userReaction: "like",
        });
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
    } else {
      firebase
        .database()
        .ref(`posts/${postId}`)
        .update({
          dislikes: dislikes + 1,
          likes: userReaction === "like" ? likes - 1 : likes,
          userReaction: "dislike",
        });
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
