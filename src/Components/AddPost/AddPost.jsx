import React, {useState} from "react";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
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

      const newPost = {
        title,
        content,
        publishedDate: new Date().toISOString(),
        creatorName: "Usuário1",
        keywords: ["Lorem", "ipsum", "dolor"],
        likes: 0,
        dislikes: 0,
      };

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
