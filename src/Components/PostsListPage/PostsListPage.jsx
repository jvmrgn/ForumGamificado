import React, {useEffect, useState} from "react";
import PostsList from "../PostList/PostList.jsx";
import style from "./PostsListPage.module.css";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        return data.slip.advice;
      } catch (error) {
        console.error("Erro ao buscar conselho:", error);
        return "Sem conselho disponível no momento";
      }
    };

    const generatePosts = async () => {
      const dummyPosts = [
        {
          id: 1,
          title: "Post 1",
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

      const updatedPosts = await Promise.all(
        dummyPosts.map(async (post) => {
          const advice = await fetchAdvice();
          return {...post, description: advice};
        })
      );

      setPosts(updatedPosts);
    };

    generatePosts();
  }, []);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, likes: post.likes + 1};
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDislike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, dislikes: post.dislikes + 1};
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className={style.postlist}>
      <PostsList
        posts={posts}
        authenticatedUser="Usuário1"
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
};

export default PostsListPage;
