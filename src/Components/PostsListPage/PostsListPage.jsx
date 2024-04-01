import React, {useEffect, useState} from "react";
import PostsList from "../PostList/PostList.jsx";
import style from "./PostsListPage.module.css";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        title: "Post 1",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio suscipit ad fugiat! Sit necessitatibus est ut aspernatur, praesentium odit adipisci reiciendis, itaque excepturi architecto quaerat dolorum quas? Totam, rerum ipsam.",
        publishedDate: "2024-03-30",
        creatorName: "Usuário1",
        keywords: ["Lorem", "ipsum", "dolor"],
        comments: [
          {id: 1, content: "Comentário 1", user: "UsuárioA"},
          {id: 2, content: "Comentário 2", user: "UsuárioB"},
        ],
        likes: 10,
        dislikes: 2,
      },
      {
        id: 2,
        title: "Post 2",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio suscipit ad fugiat! Sit necessitatibus est ut aspernatur, praesentium odit adipisci reiciendis, itaque excepturi architecto quaerat dolorum quas? Totam, rerum ipsam.",
        publishedDate: "2024-03-31",
        creatorName: "Usuário2",
        keywords: ["Lorem", "ipsum", "dolor"],
        comments: [
          {id: 1, content: "Comentário 1", user: "UsuárioA"},
          {id: 2, content: "Comentário 2", user: "UsuárioB"},
        ],
        likes: 15,
        dislikes: 3,
      },
    ];
    setPosts(dummyPosts);
  }, []);

  return (
    <div className={style.postlist}>
      <PostsList posts={posts} authenticatedUser="Usuário1" />
    </div>
  );
};

export default PostsListPage;