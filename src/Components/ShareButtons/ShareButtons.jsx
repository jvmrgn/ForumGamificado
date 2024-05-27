import React, {useState} from "react";
import styles from "./ShareButtons.module.css";

const ShareButtons = ({url}) => {
  const customMessage =
    "Confira agora este artigo interessantíssimo que encontrei no Website do João Vinicius!: ";

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(customMessage)}`;
    window.open(facebookShareUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(customMessage)}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(customMessage)}`;
    window.open(linkedinShareUrl, "_blank");
  };

  return (
    <div>
      <div className={styles.container}>
        <button onClick={shareOnFacebook} className={styles.shareButtons}>
          Compartilhar no Facebook
        </button>
        <button onClick={shareOnTwitter} className={styles.shareButtons}>
          Compartilhar no Twitter
        </button>
        <button onClick={shareOnLinkedIn} className={styles.shareButtons}>
          Compartilhar no LinkedIn
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
