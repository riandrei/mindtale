import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/Intro.module.css";

import {getWordsStats} from "../actions/authActions"

import Metrics from "../components/Metrics";

export const About = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth?.user);
  const wordStats = useSelector((state) => state.auth?.wordsStats)
  const completedStories = useSelector(
    (state) => state.auth?.user?.completedStories
  );

  const [assesmentScore, setAssesmentScore] = useState(0);
  const [mostReadGenre, setMostReadGenre] = useState("");

  useEffect(() => {
    dispatch(getWordsStats())
  }, [])

  useEffect(() => {
    setAssesmentScore(
      user?.completedStories?.reduce(
        (acc, story) => acc + story.assesmentScore,
        0
      ) / user?.completedStories?.length
    );

    const tagCounts = user?.completedStories?.reduce(
      (acc, story) => {
        story.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          if (acc[tag] > acc.highestCount || !acc.highestCount) {
            acc.highestCount = acc[tag];
            acc.highestTag = tag;
          }
        });
        return acc;
      },
      { highestCount: 0, highestTag: null }
    );

    setMostReadGenre(tagCounts?.highestTag);
  }, [user]);

  return (
    <div>
      <div className={styles.Intro}>
        <h1>Introduction:</h1> {/*Bio */}
        <p>{user?.bio}</p>
      </div>
      <h1 style={{width: "100%", textAlign: 'center', marginTop: '2rem'}}>Statistics: </h1>
      <div className={styles.Statistics}>
        <div className={styles.statisticsBox}>
          <h2>Words Encountered</h2>
          <div style={{display: 'flex', justifyContent: "space-between", marginTop: "1rem"}}>
            <p>{wordStats?.length}</p>
            <p onClick={() => navigate('/WordsMastered')}style={{borderBottom: '1px solid white'}}>{"See more ->"}</p>
          </div>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Favorite Genre</h2>
          <p style={{marginTop: '1rem'}}>{mostReadGenre || 'NA'}</p>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Completed Stories</h2>
          <p style={{marginTop: '1rem'}}>{completedStories?.length}</p>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Average Scores</h2>
          <p style={{marginTop: '1rem'}}>{assesmentScore || 'NA'}</p>
        </div>
      </div>
      <div className={styles.Metrics}>
        <Link className={styles.Metricss} to="/MetricsPage">
          View metrics
        </Link>
        <div className={styles.Metrics_inner}>
        </div>
      </div>
    </div>
  );
};

export default About;
