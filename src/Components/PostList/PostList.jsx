import React from "react";
import PostCard from "../PostCard/PostCard.jsx";

const PostsList = ({posts, authenticatedUser}) => {
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
        </div>
      ))}
    </div>
  );
};

export default PostsList;
