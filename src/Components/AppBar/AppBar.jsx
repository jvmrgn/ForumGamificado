import style from "./AppBar.module.css";
import img from "../../assets/logo.jpeg";

function AppBar() {
  return (
    <div className={style.container}>
      <a className={style.appNameAnchor}>
        <div>
          <img src={img} className={style.logo} />
        </div>
        <div>
          <p className={style.projectName}>PB</p>
        </div>
      </a>

      <nav className={style.containerAppBar}>
        <div className={style.containerBotoes}>
          <a className={style.botaoApp}>Posts</a>
          <a className={style.botaoApp}>Página Inicial</a>
        </div>
      </nav>
    </div>
  );
}

export default AppBar;
