import React from "react";
import {useNavigate} from "react-router-dom";
import style from "./PostCard.module.css";

const PostCard = ({post, authenticatedUser}) => {
  const navigate = useNavigate();

  if (!post) {
    return null;
  }

  const {
    id,
    title,
    description,
    publishedDate,
    creatorEmail,
    keywords,
    comments,
  } = post;

  const truncatedDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className={style.postcard} onClick={handleClick}>
      <h2>{title}</h2>
      <p>{truncatedDescription}</p>
      <p>Publicado em: {publishedDate}</p>
      <p>Criador: {creatorEmail}</p>{" "}
      <p>Palavras-chave: {keywords ? keywords.join(", ") : ""}</p>
      <p>Quantidade de comentários: {comments ? comments.length : 0}</p>{" "}
    </div>
  );
};

export default PostCard;
