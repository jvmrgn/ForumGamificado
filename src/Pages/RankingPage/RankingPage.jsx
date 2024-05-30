import React, {useState, useEffect} from "react";
import {firebase} from "../../../firebaseConfig.js";
import AppBar from "../../Components/AppBar/AppBar.jsx";
import styles from "./RankingPage.module.css";

const RankingPage = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankingRef = firebase
          .database()
          .ref("users")
          .orderByChild("points");
        rankingRef.on("value", (snapshot) => {
          const rankingData = snapshot.val();
          if (rankingData) {
            const rankingArray = Object.values(rankingData).sort(
              (a, b) => b.points - a.points
            );
            setRanking(rankingArray);
          } else {
            console.log("Nenhum usuário encontrado no ranking");
          }
        });
      } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
      }
    };

    fetchRanking();

    return () => {
      firebase.database().ref("users").off();
    };
  }, []);

  return (
    <div>
      <AppBar />
      <div className={styles.rankingContainer}>
        <h1>Ranking de Usuários</h1>
        <table className={styles.rankingTable}>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Email</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingPage;
