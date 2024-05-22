import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../css/MetricsPage.module.css";
import SampleChart from "../components/SampleChart";
import LineChart from "../components/LineChart";
import Dowelle from "../assets/Dowelle.jpg";

import Back from "../assets/back.png";

export const MetricsPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [chooseDetail, setChooseDetails] = useState(1);

  const handleDetail = (value) => {
    setChooseDetails(value);
  };

  const completedStories = useSelector(
    (state) => state.auth?.user?.completedStories
  );

  const chartData = [["Date", "Assesment Score"]];
  const test = [
    { date: "2021-09-01", assesmentScore: 50 },
    { date: "2021-09-02", assesmentScore: 40 },
    { date: "2021-09-03", assesmentScore: 60 },
    { date: "2021-09-04", assesmentScore: 70 },
    { date: "2021-09-05", assesmentScore: 80 },
    { date: "2021-09-06", assesmentScore: 90 },
    { date: "2021-09-07", assesmentScore: 100 },
  ];
  test.forEach((story) => {
    chartData.push([story.date, story.assesmentScore]);
  });
  //   useEffect(() => {
  //     completedStories?.forEach((story) => {
  //       chartData.push([story.date, story.assesmentScore]);
  //     });
  //   }, [completedStories]);

  return (
    <div className={styles.MetricsPage}>
      <div className={styles.Metrics_inner}>
        <div className={styles.Metrics_inner_inner}>
          <img onClick={goBack} src={Back} />
          <span>MindTale Metrics Assessment</span>
        </div>
        <img className={styles.User} src={Dowelle} />
      </div>
      {console.log(completedStories)}

      <div className={styles.Middle}>
        <div className={styles.Middle_left}>
          <div className={styles.Detail}>
            <div className={styles.Avg} onClick={() => handleDetail(1)}>
              <span>Avg. Usage</span>
              <span>1hr 20mins</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(2)}>
              <span>Avg. Assessment Score</span>
              <span>40.7%</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(3)}>
              <span>Favorite Genre</span>
              <span>Mystery</span>
            </div>
            <div className={styles.Avg} onClick={() => handleDetail(4)}>
              <span>Overall Performance</span>
              <span>Developing</span>
            </div>
          </div>
          {chooseDetail === 1 && <LineChart chartData={chartData} />}
          {chooseDetail === 2 && <SampleChart />}
          {chooseDetail === 3 && <LineChart />}
          {chooseDetail === 4 && <SampleChart />}
        </div>

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
        </div>
      </div>
    </div>
  );
};
export default MetricsPage;
