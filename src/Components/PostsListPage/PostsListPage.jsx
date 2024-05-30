import React, {useEffect, useState} from "react";
import PostsList from "../PostList/PostList.jsx";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
import style from "./PostsListPage.module.css";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = firebase.database().ref("posts");

        postsRef.on("value", (snapshot) => {
          const postsData = snapshot.val();
          if (postsData) {
            const postsArray = Object.keys(postsData).map((key) => ({
              id: key,
              ...postsData[key],
            }));
            setPosts(postsArray);
          } else {
            console.log("Nenhum post encontrado");
          }
        });
      } catch (error) {
        console.error("Erro ao buscar os posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={style.postlist}>
      <PostsList posts={posts} authenticatedUser="Usuário1" />
    </div>
  );
};

export default PostsListPage;
