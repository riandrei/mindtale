import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../css/Intro.module.css";

import Metrics from "../components/Metrics";
import { useEffect } from "react";

export const About = () => {
  const user = useSelector((state) => state.auth?.user);

  const [assesmentScore, setAssesmentScore] = useState(0);
  const [mostReadGenre, setMostReadGenre] = useState("");

  useEffect(() => {
    setAssesmentScore(
      user?.completedStories.reduce(
        (acc, story) => acc + story.assesmentScore,
        0
      ) / user?.completedStories.length
    );

    const tagCounts = user?.completedStories.reduce(
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

    console.log(tagCounts);

    setMostReadGenre(tagCounts.highestTag);
  }, [user]);

  return (
    <div>
      <div className={styles.Intro}>
        <h1>Introduction:</h1> {/*Bio */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius unde
          recusandae maiores ipsa pariatur accusamus, obcaecati animi amet nobis
          deserunt nihil, facilis, sit ratione explicabo. Repellat libero
          accusantium debitis facilis natus nemo veniam ad molestias, ab,
          exercitationem facere temporibus tempore quas totam esse. Natus velit
          placeat voluptates tenetur quo quasi suscipit, ea ullam, atque, quod
          reprehenderit voluptatibus impedit! Beatae inventore aliquam rem nam,
          voluptate hic ea maxime eius vel sed eaque porro eveniet atque minus?
        </p>
      </div>
      <div className={styles.Metrics}>
        <Metrics
          Metric_name="Books Finished"
          Metric_value={user?.completedStories.length}
        />
        <Metrics
          Metric_name="Avg. Assessment Score"
          Metric_value={assesmentScore}
        />
        <Metrics Metric_name="Daily Read Streak" Metric_value="3" />
        <Metrics Metric_name="Avg. Reading Duration" Metric_value="5:26 mins" />
        <Metrics Metric_name="Most Read Genre" Metric_value={mostReadGenre} />
      </div>
    </div>
  );
};

export default About;
