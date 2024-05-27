import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
import styles from "./PostPage.module.css";
import LikeDislikeButton from "../../Components/LikeDeslike/LikeDeslike.jsx";
import AppBar from "../../Components/AppBar/AppBar.jsx";
import CommentModal from "../../Components/CommentModal/CommentModal.jsx";
import CommentList from "../../Components/CommentList/CommentList.jsx";
import ReportButton from "../../Components/ReportButton/ReportButton.jsx";
import PostOptions from "../../Components/PostOptions/PostOptions.jsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareButtons from "../../Components/ShareButtons/ShareButtons.jsx";

const PostPage = () => {
  const currentUrl = window.location.href;

  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = firebase.database().ref(`posts/${id}`);
        postRef.on("value", async (snapshot) => {
          const postData = snapshot.val();
          console.log("Fetched post data:", postData);

          const commentsSnapshot = await firebase
            .database()
            .ref(`posts/${id}/comments`)
            .once("value");
          const commentsData = commentsSnapshot.val() || {};

          setPost({...postData, comments: Object.values(commentsData)});
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async (postId) => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    const snapshot = await postRef.get();
    const post = snapshot.val();
    postRef.update({likes: (post.likes || 0) + 1});
  };

  const handleDislike = async (postId) => {
    const postRef = firebase.database().ref(`posts/${postId}`);
    const snapshot = await postRef.get();
    const post = snapshot.val();
    postRef.update({dislikes: (post.dislikes || 0) + 1});
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  if (!post) {
    return <p>Carregando...</p>;
  }

  const {
    title,
    content,
    publishedDate,
    creatorEmail,
    keywords,
    comments,
    likes,
    dislikes,
  } = post;

  const handleDenunciaEnviada = () => {
    toast.success("Denúncia enviada com sucesso!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <AppBar />
      <div className={styles.postpage}>
        <h1>{title}</h1>
        <p>{content}</p>
        <p>Publicado em: {publishedDate}</p>
        <p>Criador: {creatorEmail}</p>
        <div className={styles.keywords}>
          {keywords
            ? keywords.map((keyword, index) => (
                <span key={index} className={styles.keyword}>
                  {keyword}
                </span>
              ))
            : ""}
        </div>
        <div className={styles.info}>
          <p>
            Quantidade de comentários:{" "}
            {post.comments ? post.comments.length : 0}
          </p>

          <LikeDislikeButton
            postId={id}
            likes={likes || 0}
            dislikes={dislikes || 0}
            onLike={handleLike}
            onDislike={handleDislike}
          />
          <CommentModal
            isOpen={isCommentModalOpen}
            onClose={handleCloseCommentModal}
            postId={id}
          />
        </div>
        <button
          onClick={() => setIsCommentModalOpen(true)}
          className={styles.commentButton}
        >
          Comentar
        </button>
        <ReportButton postId={id} onDenunciaEnviada={handleDenunciaEnviada} />
        <PostOptions postId={id} creatorEmail={creatorEmail} />
      </div>
      <ShareButtons url={currentUrl} className={styles.shareButtons} />
      <CommentList comments={comments} />
    </div>
  );
};

export default PostPage;
