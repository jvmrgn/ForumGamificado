import React from "react";
import style from "./MainPage.module.css";

function MainPage() {
  return (
    <div className={style.content}>
      <h1 className={style.title}>Seja bem-vindo!</h1>
      <p>
        Espero que você se divirta utilizando nossa rede social! Para encontrar
        os posts
      </p>
      <a className={style.cliqueAqui} href="/posts">
        Clique aqui!
      </a>
    </div>
  );
}

export default MainPage;
