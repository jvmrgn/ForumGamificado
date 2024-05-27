import React, {useState} from "react";
import Modal from "react-modal";
import CommentForm from "../CommentForm/CommentForm.jsx";

const CommentModal = ({isOpen, onClose, postId}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <CommentForm postId={postId} />
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
};

export default CommentModal;
