import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, connect } from "react-redux";

import { getStories } from "../actions/storyActions";
import { getUser } from "../actions/authActions";

import styles from "../css/MetricsPage.module.css";
import SampleChart from "../components/SampleChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import Dowelle from "../assets/Dowelle.jpg";

import Back from "../assets/back.png";

export const MetricsPage = ({ getUser, getStories }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [chooseDetail, setChooseDetails] = useState(2);

  const handleDetail = (value) => {
    setChooseDetails(value);
  };

  const completedStories = useSelector(
    (state) => state.auth?.user?.completedStories
  );
  const stories = useSelector((state) => state?.story?.stories);

  const [chartData, setChartData] = useState([["Date", "Assesment Score"]]);
  const [pieChartData, setPieChartData] = useState([["Genre", "Count"]]);
  const [remarks, setRemarks] = useState("Loading...");
  const [tagCounts, setTagCounts] = useState({});
  const [assessmentScore, setAssessmentScore] = useState(0);

  const getHighestCountTag = () => {
    let maxCount = 0;
    let maxTag = "";

    Object.keys(tagCounts).forEach((tag) => {
      if (tagCounts[tag] > maxCount) {
        maxCount = tagCounts[tag];
        maxTag = tag;
      }
    });

    return { maxTag, maxCount };
  };

  useEffect(() => {
    const tempChartData = [["Date", "Assesment Score"]];
    const tempAssesmentScores = [];

    const reversedStories = completedStories?.toReversed();

    reversedStories?.forEach((story) => {
      tempChartData.push([
        story.date.slice(0, story.date.indexOf("T")),
        Number(story.assesmentScore),
      ]);
      tempAssesmentScores.push(Number(story.assesmentScore));
    });

    setChartData(tempChartData);

    const firstHalf = tempAssesmentScores.slice(
      0,
      Math.floor(tempAssesmentScores.length / 2)
    );
    const secondHalf = tempAssesmentScores.slice(
      Math.floor(tempAssesmentScores.length / 2),
      tempAssesmentScores.length
    );

    const firstHalfAvg =
      firstHalf.reduce((acc, curr) => acc + curr, 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((acc, curr) => acc + curr, 0) / secondHalf.length;

    const avg =
      tempAssesmentScores.reduce((acc, curr) => acc + curr, 0) /
      tempAssesmentScores.length;

    setAssessmentScore(avg);

    if (secondHalfAvg > firstHalfAvg) {
      setRemarks("Declining");
    } else if (secondHalfAvg < firstHalfAvg) {
      setRemarks("Improving");
    } else {
      setRemarks("Stable");
    }

    reversedStories?.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          tagCounts[tag] += 1;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });

    const tempPieChartData = [["Genre", "Count"]];

    Object.entries(tagCounts).forEach(([tag, count]) => {
      tempPieChartData.push([tag, count]);
    });

    setPieChartData(tempPieChartData);
    console.log(tagCounts);
  }, [completedStories]);

  useEffect(() => {
    getUser();
    getStories();
  }, []);

  return (
    <div className={styles.MetricsPage}>
      <div className={styles.Metrics_inner}>
        <div className={styles.Metrics_inner_inner}>
          <img onClick={goBack} src={Back} />
          <span>MindTale Metrics Assessment</span>
        </div>
        {/* <img className={styles.User} src={Dowelle} /> */}
      </div>

      {/* <div className={styles.Middle}> */}
      <div className={styles.Middle_left}>
        <div className={styles.Detail}>
          {/* <div className={styles.Avg} onClick={() => handleDetail(1)}>
              <span>Avg. Usage</span>
              <span>1hr 20mins</span>
            </div> */}
          <div className={styles.Avg} onClick={() => handleDetail(2)}>
            <span>Avg. Assessment Score</span>
            <span>{assessmentScore}</span>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(3)}>
            <span>Favorite Genre</span>
            {console.log(tagCounts)}
            <span>{getHighestCountTag(tagCounts).maxTag}</span>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(4)}>
            <span>Overall Performance</span>
            <span>{remarks}</span>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(4)}>
            <span>Completed Stories</span>
            <span>{completedStories?.length}</span>
          </div>
        </div>
        {/* {chooseDetail === 1 && <LineChart chartData={chartData} />} */}
        <div className={styles.ChartDiv}>
          <LineChart chartData={chartData} />
          <PieChart chartData={pieChartData} />
        </div>
        {/* {chooseDetail === 4 && <SampleChart />} */}
      </div>
      {/* </div> */}

      <div className={styles.TagMetrics}>
        {console.log(completedStories)}
        {Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .map((entry) => entry[0])
          .slice(0, completedStories?.length < 3 ? completedStories?.length : 3)
          .map((tag) => (
            <div className={styles.TagContainer}>
              <h2>{tag}</h2>
              <div className={styles.DetailHeader}>
                <div>
                  <h3>Title</h3>
                </div>
                <div>
                  <h3>Date</h3>
                  <h3>Score</h3>
                </div>
              </div>
              <div className={styles.TagStories}>
                {completedStories?.toReversed().map((completedStory) => {
                  return completedStory.tags.includes(tag) ? (
                    <div className={styles.TagStoriesContainer}>
                      <p>
                        {
                          stories[
                            stories?.findIndex(
                              (story) => story._id === completedStory.story
                            )
                          ]?.title
                        }
                      </p>
                      <div className={styles.TagScoreContainer}>
                        <p>
                          {completedStory.date.slice(
                            0,
                            completedStory.date.indexOf("T")
                          )}
                        </p>
                        <p>{completedStory.assesmentScore}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        {/* <div></div>
        <div></div>
        <div></div> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = { getUser, getStories };
export default connect(null, mapDispatchToProps)(MetricsPage);
