import React from "react";
import style from "./PostCard.module.css";

const PostCard = ({post, authenticatedUser}) => {
  const {
    title,
    description,
    publishedDate,
    creatorName,
    keywords,
    comments,
    likes,
    dislikes,
  } = post;

  const truncatedDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  const isCreator = authenticatedUser === creatorName;

  return (
    <div className={style.postcard}>
      <h2>{title}</h2>
      <p>{truncatedDescription}</p>
      <p>Publicado em: {publishedDate}</p>
      <p>Criador: {creatorName}</p>
      <p>Palavras-chave: {keywords.join(", ")}</p>
      <p>Quantidade de comentários: {comments.length}</p>
      <p>Quantidade de curtidas: {likes}</p>
      {isCreator && <p>Quantidade de descurtidas: {dislikes}</p>}
    </div>
  );
};

export default PostCard;
