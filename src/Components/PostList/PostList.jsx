import React from "react";
import PostCard from "../PostCard/PostCard.jsx";
import LikeDislikeButton from "../LikeDeslike/LikeDeslike.jsx";

const PostsList = ({posts, authenticatedUser, onLike, onDislike}) => {
  const sortedPosts = Array.isArray(posts)
    ? posts.sort(
        (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
      )
    : [];

  const lastTenPosts = sortedPosts.slice(0, 10);

  return (
    <div>
      {lastTenPosts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} authenticatedUser={authenticatedUser} />
          <LikeDislikeButton
            postId={post.id}
            likes={post.likes}
            dislikes={post.dislikes}
            onLike={onLike}
            onDislike={onDislike}
          />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
