import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/Intro.module.css";

import { getPHILIRIResults, getWordsStats } from "../actions/authActions";

import Metrics from "../components/Metrics";
import Achievements from "../components/Achievements";

import fantasy5 from "../assets/fantasy5.png";
import fantasy10 from "../assets/fantasy10.png";
import fantasy15 from "../assets/fantasy15.png";
import books5 from "../assets/books5.png";
import books10 from "../assets/books10.png";
import books15 from "../assets/books15.png";
import masterofgenres from "../assets/masterofall.png";
import perfect5 from "../assets/perfect5.png";

export const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  const wordStats = useSelector((state) => state.auth?.wordsStats);
  const completedStories = useSelector(
    (state) => state.auth?.user?.completedStories
  );
  // const philIRIResults = useSelector((state) => state.auth?.philIRI);

  const [assesmentScore, setAssesmentScore] = useState(0);
  const [mostReadGenre, setMostReadGenre] = useState("");
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    dispatch(getWordsStats());
    dispatch(getPHILIRIResults());
  }, []);

  useEffect(() => {
    if (user?.completedStories?.length) {
      // Calculate average score
      setAssesmentScore(
        user.completedStories.reduce(
          (acc, story) => acc + Number(story.assesmentScore),
          0
        ) / user.completedStories.length
      );

      // Calculate most read genre
      const tagCounts = user.completedStories.reduce(
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

      // Determine achievements
      const achievementsList = [];
      let completedCount = user.completedStories.length;

      // REMOVE THIS CODE
      completedCount = 10;

      if (completedCount >= 5)
        achievementsList.push({
          name: `Novice Reader`,
          subtitle: "(Read 5 books)",
          image: books5,
        });
      if (completedCount >= 10)
        achievementsList.push({
          name: `Avid Reader`,
          subtitle: "(Read 10 books)",
          image: books10,
        });
      if (completedCount >= 15)
        achievementsList.push({
          name: `Proficient Reader`,
          subtitle: "(Read 15 books)",
          image: books15,
        });

      let fantasyCount =
        user?.completedStories?.filter((story) =>
          story.tags.includes("Fantasy")
        ).length || 0;

      // REMOVE THIS CODE
      fantasyCount = 15;

      if (fantasyCount >= 5)
        achievementsList.push({
          name: `Dreamer of Worlds`,
          subtitle: "(Read 5 fantasy books)",
          image: fantasy5,
        });
      if (fantasyCount >= 10)
        achievementsList.push({
          name: `Enchanter of Tales`,
          subtitle: "(Read 10 fantasy books)",
          image: fantasy10,
        });
      if (fantasyCount >= 15)
        achievementsList.push({
          name: `Keeper of Myths`,
          subtitle: "(Read 15 fantasy books)",
          image: fantasy15,
        });

      let perfectScoreCount =
        user?.completedQuizzes?.filter((quiz) => quiz.score === 100).length ||
        0;

      // REMOVE THIS CODE
      perfectScoreCount = 5;

      if (perfectScoreCount >= 5)
        achievementsList.push({
          name: `Flawless Reader`,
          subtitle: "(Earn 5 perfect quiz scores)",
          image: perfect5,
        });
      if (perfectScoreCount >= 10)
        achievementsList.push({
          name: `Quiz Master`,
          subtitle: "(Earn 10 perfect quiz scores)",
          image: perfect10,
        });
      if (perfectScoreCount >= 15)
        achievementsList.push({
          name: `Perfectionist`,
          subtitle: "(Earn 15 perfect quiz scores)",
          image: perfect15,
        });

      let genresCompleted = new Set(
        user.completedStories.flatMap((story) => story.tags)
      );

      // REMOVE THIS CODE
      genresCompleted = new Set([
        "Fantasy",
        "Mystery",
        "Adventure",
        "Romance",
        "Horror",
      ]);

      if (genresCompleted.size >= 5)
        achievementsList.push({
          name: "Genre Master",
          subtitle: "(Read one of every genre)",
          image: masterofgenres,
        });

      if (user.completedStories.every((story) => story.assesmentScore === 100))
        achievementsList.push({
          name: "Perfectionist (Perfect scores)",
          image: "/images/perfectionist.png",
        });

      setAchievements(achievementsList);
    }
  }, [user]);

  return (
    <div>
      <div className={styles.Intro}>
        <h1>Introduction:</h1>
        <p>{user?.bio}</p>
      </div>
      <Achievements achievements={achievements} />
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
        Statistics:
      </h1>
      <div className={styles.Statistics}>
        <div className={styles.statisticsBox}>
          <h2>Words Encountered</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <p>{wordStats?.length}</p>
            <p
              onClick={() => navigate("/WordsMastered")}
              style={{ borderBottom: "1px solid white" }}
            >
              {"See more ->"}
            </p>
          </div>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Favorite Genre</h2>
          <p style={{ marginTop: "1rem" }}>{mostReadGenre || "NA"}</p>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Completed Stories</h2>
          <p style={{ marginTop: "1rem" }}>{completedStories?.length}</p>
        </div>
        <div className={styles.statisticsBox}>
          <h2>Average Scores</h2>
          <p style={{ marginTop: "1rem" }}>{assesmentScore || "NA"}</p>
        </div>
      </div>
      <div className={styles.Metrics}>
        <Link className={styles.Metricss} to="/MetricsPage">
          View metrics
        </Link>
        <Link className={styles.Metricss} to="/PostTest">
          Take PHIL-IRI Post-Test
        </Link>
        <div className={styles.Metrics_inner}></div>
      </div>
    </div>
  );
};

export default About;
