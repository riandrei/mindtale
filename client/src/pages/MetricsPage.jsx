import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, connect } from "react-redux";

import { getUser } from "../actions/authActions";

import styles from "../css/MetricsPage.module.css";
import SampleChart from "../components/SampleChart";
import LineChart from "../components/LineChart";
import Dowelle from "../assets/Dowelle.jpg";

import Back from "../assets/back.png";

export const MetricsPage = ({ getUser }) => {
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

  const [chartData, setChartData] = useState([["Date", "Assesment Score"]]);

  // const test = [
  //   { date: "2021-09-01", assesmentScore: 50 },
  //   { date: "2021-09-02", assesmentScore: 40 },
  // ];
  // test.forEach((story) => {
  //   chartData.push([story.date, story.assesmentScore]);
  // });

  const [tagCounts, setTagCounts] = useState({});

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

    const reversedStories = completedStories?.toReversed();

    reversedStories?.forEach((story) => {
      tempChartData.push([
        story.date.slice(0, story.date.indexOf("T")),
        Number(story.assesmentScore),
      ]);
    });

    setChartData(tempChartData);

    reversedStories?.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tagCounts[tag]) {
          tagCounts[tag] += 1;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });

    console.log(tagCounts);
  }, [completedStories]);

  useEffect(() => {
    getUser();
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
      {console.log(completedStories)}

      <div className={styles.Middle}>
        <div className={styles.Middle_left}>
          <div className={styles.Detail}>
            {/* <div className={styles.Avg} onClick={() => handleDetail(1)}>
              <span>Avg. Usage</span>
              <span>1hr 20mins</span>
            </div> */}
            <div className={styles.Avg} onClick={() => handleDetail(2)}>
              <span>Avg. Assessment Score</span>
              <span>40.7%</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(3)}>
              <span>Favorite Genre</span>
              {console.log(tagCounts)}
              <span>{getHighestCountTag(tagCounts).maxTag}</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(4)}>
              <span>Overall Performance</span>
              <span>Developing</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(4)}>
              <span>Completed Stories</span>
              <span>{completedStories?.length}</span>
            </div>
          </div>
          {/* {chooseDetail === 1 && <LineChart chartData={chartData} />} */}
          {chooseDetail === 2 && <LineChart chartData={chartData} />}
          {/* {chooseDetail === 3 && <LineChart />}
          {chooseDetail === 4 && <SampleChart />} */}
        </div>
        {/* 
        <div className={styles.Middle_right}>
          <div className={styles.Blue_top}></div>
          <div className={styles.Finished}>
            <div className={styles.Finished_inner}>
              <span>Books Finished</span>
              <span>23</span>
            </div>
            <div className={styles.Top5}>
              <span className={styles.Top_head}>
                Top 5 Longest Book Duration
              </span>
              <div className={styles.Longest_con}>
                <div className={styles.Specific}>
                  <span>Harry Potter</span>
                  <span>1hr 3mins</span>
                </div>
                <div className={styles.Specific}>
                  <span>Harry Potter</span>
                  <span>1hr 3mins</span>
                </div>
                <div className={styles.Specific}>
                  <span>Harry Potter</span>
                  <span>1hr 3mins</span>
                </div>
                <div className={styles.Specific}>
                  <span>Harry Potter</span>
                  <span>1hr 3mins</span>
                </div>
                <div className={styles.Specific}>
                  <span>Harry Potter</span>
                  <span>1hr 3mins</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = { getUser };
export default connect(null, mapDispatchToProps)(MetricsPage);
