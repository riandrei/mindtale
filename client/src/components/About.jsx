import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../css/Intro.module.css";

import Metrics from "../components/Metrics";

export const About = () => {
  const user = useSelector((state) => state.auth?.user);

  const [assesmentScore, setAssesmentScore] = useState(0);
  const [mostReadGenre, setMostReadGenre] = useState("");

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
      <div className={styles.Metrics}>
        <Link className={styles.Metricss} to="/MetricsPage">
          View metrics
        </Link>
        <div className={styles.Metrics_inner}>
          <Metrics Metric_name="Books Finished" Metric_value="23" />
          <Metrics Metric_name="Avg. Assessment Score" Metric_value="55.56%" />
          <Metrics Metric_name="Daily Read Streak" Metric_value="3" />
          <Metrics
            Metric_name="Avg. Reading Duration"
            Metric_value="5:26 mins"
          />
          <Metrics Metric_name="Most Read Genre" Metric_value="Mysteries" />
          <Metrics />
          <Metrics />
          <Metrics />
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default About;
