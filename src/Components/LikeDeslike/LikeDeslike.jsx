import React, {useState} from "react";
import style from "./LikeDeslikeButton.module.css";

const LikeDislikeButton = ({postId, likes, dislikes, onLike, onDislike}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      onLike(postId);
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if (!disliked) {
      onDislike(postId);
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div className={style.likeDislikeButton}>
      <button
        onClick={handleLikeClick}
        className={`${style.button} ${liked ? style.liked : ""}`}
      >
        Like ({likes})
      </button>
      <button
        onClick={handleDislikeClick}
        className={`${style.button} ${disliked ? style.disliked : ""}`}
      >
        Dislike ({dislikes})
      </button>
    </div>
  );
};

export default LikeDislikeButton;
