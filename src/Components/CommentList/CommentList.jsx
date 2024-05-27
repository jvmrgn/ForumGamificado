import React from "react";
import styles from "./CommentList.module.css";

const CommentList = ({comments}) => {
  const highlightUser = (commentContent) => {
    const regex = /@\w+(\.\w+)?@\w+(\.\w+)?/;
    const matches = commentContent.match(regex);

    if (!matches) {
      return commentContent;
    }

    const highlightedContent = commentContent.replace(
      regex,
      (match) => `<span class="${styles.highlightedUser}">${match}</span>`
    );

    return <span dangerouslySetInnerHTML={{__html: highlightedContent}} />;
  };

  return (
    <div className={styles.commentList}>
      <h3>Comentários:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className={styles.comment}>
            {highlightUser(comment.content)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
