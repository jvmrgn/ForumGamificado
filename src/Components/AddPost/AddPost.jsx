import React, {useState} from "react";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database"; // Importe o módulo compatível com o Realtime Database
import styles from "./AddPost.module.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !content) {
        console.error("O título e o conteúdo do post são obrigatórios");
        return;
      }

      // Criar um novo post com os dados fornecidos
      const newPost = {
        title,
        content,
        publishedDate: new Date().toISOString(), // Use a data atual como data de publicação
        creatorName: "Usuário1", // Supondo que o criador seja sempre o mesmo usuário
        keywords: ["Lorem", "ipsum", "dolor"],
        likes: 0, // Inicialmente, não há curtidas
        dislikes: 0, // Inicialmente, não há descurtidas
      };

      // Use a referência para o Realtime Database e adicione o novo post à rota /posts
      await firebase.database().ref("posts").push(newPost);

      setTitle("");
      setContent("");

      console.log("Post criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o post:", error);
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
      <button type="submit" className={styles.button}>
        Criar Post
      </button>
    </form>
  );
};

export default AddPost;
