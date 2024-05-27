import React, {useState} from "react";
import {firebase} from "../../../firebaseConfig.js";
import "firebase/compat/database";
import styles from "./ReportButton.module.css";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportButton = ({postId}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isReasonValid, setIsReasonValid] = useState(false);

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleReport = async () => {
    try {
      if (!isReasonValid) {
        toast.error("Por favor, forneça um motivo para a denúncia.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const reportRef = firebase.database().ref(`reports`).push({
        postId: postId,
        reason: reportReason,
      });

      setReportReason("");
      setIsReportModalOpen(false);

      console.log("Denúncia enviada com sucesso!");

      toast.success("Denúncia enviada com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Erro ao enviar denúncia:", error);
    }
  };

  const handleReasonChange = (e) => {
    setReportReason(e.target.value);
    setIsReasonValid(!!e.target.value.trim());
  };

  return (
    <div>
      <button onClick={handleOpenReportModal} className={styles.reportButton}>
        Denunciar
      </button>
      <div
        className={styles.reportModal}
        style={{display: isReportModalOpen ? "block" : "none"}}
      >
        <textarea
          value={reportReason}
          onChange={handleReasonChange}
          placeholder="Descreva o motivo da denúncia..."
        ></textarea>
        {!isReasonValid && (
          <p className={styles.warning}>
            Por favor, forneça um motivo para a denúncia.
          </p>
        )}
        <button
          onClick={handleReport}
          className={`${styles.sendButton} ${
            !isReasonValid && styles.disabled
          }`}
          disabled={!isReasonValid}
        >
          Enviar Denúncia
        </button>
        <button
          onClick={handleCloseReportModal}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ReportButton;
