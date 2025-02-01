import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getRanking } from "../actions/authActions";
import styles from "../css/Leaderboard.module.css";

import Nav from "../components/Nav";
import Rank from "../components/Rank";
import RankingList from "../components/RankingList";

import Back from "../assets/back.png";

const Leaderboard = ({ getRanking }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const ranking = useSelector((state) => state.auth.ranking);

  useEffect(() => {
    if (ranking.length < 1) {
      getRanking();
    }
  }, []);
  return (
    <div className={styles.Leaderboard}>
      <Nav />
      <img onClick={goBack} className={styles.Back} src={Back} />
      <Rank ranking={ranking} />
      <div className={styles.Ranklist_con}>
        <RankingList ranking={ranking} />
      </div>
    </div>
  );
};

const mapDispatchToProps = { getRanking };

export default connect(null, mapDispatchToProps)(Leaderboard);
