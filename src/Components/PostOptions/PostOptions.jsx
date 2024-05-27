import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
import styles from "./PostOptions.module.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostOptions = ({postId, creatorEmail, publishedDate, keywords}) => {
  const currentUser = firebase.auth().currentUser;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedKeywords, setEditedKeywords] = useState([]);
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [originalKeywords, setOriginalKeywords] = useState([]);

  useEffect(() => {
    setOriginalTitle(editedTitle);
    setOriginalContent(editedContent);
    setOriginalKeywords(keywords);
  }, []);

  const handleDeletePost = async () => {
    try {
      await firebase.database().ref(`posts/${postId}`).remove();
      toast.success("Post deletado com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigation.navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      await firebase.database().ref(`posts/${postId}`).update({
        title: editedTitle,
        content: editedContent,
        keywords: editedKeywords,
      });
      toast.success("Post editado com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setEditedTitle(originalTitle);
    setEditedContent(originalContent);
    setEditedKeywords([...originalKeywords]);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleAddKeyword = () => {
    setEditedKeywords([...editedKeywords, ""]);
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...editedKeywords];
    newKeywords.splice(index, 1);
    setEditedKeywords(newKeywords);
  };

  const handleChangeKeyword = (index, value) => {
    const newKeywords = [...editedKeywords];
    newKeywords[index] = value;
    setEditedKeywords(newKeywords);
  };

  if (currentUser && currentUser.email === creatorEmail) {
    return (
      <div className={styles.postOptions}>
        <button onClick={openEditModal} className={styles.editButton}>
          Editar Post
        </button>
        <button onClick={handleDeletePost} className={styles.deleteButton}>
          Excluir Post
        </button>
        {isEditModalOpen && (
          <div className={styles.editModal}>
            <input
              type="text"
              placeholder="Novo título"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              placeholder="Novo conteúdo"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
            <div className={styles.keywordsContainer}>
              {editedKeywords.map((keyword, index) => (
                <div key={index} className={styles.keyword}>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => handleChangeKeyword(index, e.target.value)}
                  />
                  <button
                    className={styles.removeKeywordButton}
                    onClick={() => handleRemoveKeyword(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <button onClick={handleAddKeyword} className={styles.addButton}>
                Adicionar Palavra-chave
              </button>
            </div>
            <button onClick={handleEditPost} className={styles.saveButton}>
              Salvar
            </button>
            <button onClick={handleCancelEdit} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default PostOptions;
