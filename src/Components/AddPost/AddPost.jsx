import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
import styles from "./AddPost.module.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordsArray, setKeywordsArray] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserEmail = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserEmail(user.email);
          setIsLoading(false);
        } else {
          // Usuário não autenticado, redirecione para a página de login ou exiba uma mensagem de erro
          console.error("Usuário não autenticado.");
          setIsLoading(false);
        }
      });
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content || keywordsArray.length === 0) {
        console.error("Todos os campos são obrigatórios");
        return;
      }

      if (isLoading) {
        console.error(
          "Aguarde enquanto o email do usuário está sendo carregado."
        );
        return;
      }

      const newPost = {
        title,
        content,
        publishedDate: new Date().toISOString(),
        creatorEmail: userEmail,
        keywords: keywordsArray,
        likes: 0,
        dislikes: 0,
      };

      await firebase.database().ref("posts").push(newPost);

      setTitle("");
      setContent("");
      setKeywords("");
      setKeywordsArray([]);

      console.log("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }
  };

  const handleAddKeyword = () => {
    if (keywords) {
      setKeywordsArray([...keywordsArray, keywords]);
      setKeywords("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Título:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Conteúdo:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="keywords" className={styles.label}>
          Palavras-chave:
        </label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleAddKeyword}
          className={styles.button}
        >
          Adicionar Palavra-chave
        </button>
        <div className={styles.keywordsContainer}>
          {keywordsArray.map((keyword, index) => (
            <span key={index} className={styles.keyword}>
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Criar Post
      </button>
    </form>
  );
};

export default AddPost;
