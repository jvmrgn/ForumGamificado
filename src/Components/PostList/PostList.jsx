import React from "react";
import PostCard from "../PostCard/PostCard.jsx";

const PostsList = ({posts, authenticatedUser}) => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  const lastTenPosts = sortedPosts.slice(0, 10);

  return (
    <div>
      {lastTenPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          authenticatedUser={authenticatedUser}
        />
      ))}
    </div>
  );
};

export default PostsList;
