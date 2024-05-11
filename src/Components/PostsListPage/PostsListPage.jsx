import React, {useEffect, useState} from "react";
import PostsList from "../PostList/PostList.jsx";
import {firebase} from "../../../firebaseConfig.js"; // Importe o Firebase
import "firebase/compat/database"; // Importe o módulo compatível com o Realtime Database
import style from "./PostsListPage.module.css";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Função para buscar os posts do Firebase
    const fetchPosts = async () => {
      try {
        // Referência para a coleção de posts no Realtime Database
        const postsRef = firebase.database().ref("posts");

        // Captura os dados dos posts do Realtime Database
        postsRef.on("value", (snapshot) => {
          const postsData = snapshot.val(); // Dados dos posts
          if (postsData) {
            // Converte os dados dos posts em um array de objetos
            const postsArray = Object.keys(postsData).map((key) => ({
              id: key, // Chave única do post no Firebase
              ...postsData[key], // Outros dados do post
            }));
            setPosts(postsArray); // Define o estado dos posts
          } else {
            console.log("Nenhum post encontrado");
          }
        });
      } catch (error) {
        console.error("Erro ao buscar os posts:", error);
      }
    };

    fetchPosts(); // Chama a função para buscar os posts ao montar o componente
  }, []);

  const handleLike = (postId) => {
    // Lógica para incrementar o número de likes de um post no Firebase
    // (Você precisará implementar essa lógica com as operações no Firebase)
  };

  const handleDislike = (postId) => {
    // Lógica para incrementar o número de dislikes de um post no Firebase
    // (Você precisará implementar essa lógica com as operações no Firebase)
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
