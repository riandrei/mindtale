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

  // New state for interpretations
  const [interpretations, setInterpretations] = useState({
    scoreInterpretation: "",
    performanceInterpretation: "",
    genreInterpretation: "",
    progressInterpretation: "",
  });

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

  // Function to generate interpretations
  const generateInterpretations = (
    avgScore,
    performance,
    favoriteGenre,
    completedCount
  ) => {
    let scoreInterpretation = "";
    let performanceInterpretation = "";
    let genreInterpretation = "";
    let progressInterpretation = "";

    // Score interpretation
    if (avgScore >= 4) {
      scoreInterpretation =
        "Excellent! You're consistently scoring high on your assessments. This shows strong comprehension and engagement with the stories.";
    } else if (avgScore >= 3) {
      scoreInterpretation =
        "Good work! Your average score shows you're understanding the stories well. There's room for improvement to reach excellent levels.";
    } else if (avgScore >= 2) {
      scoreInterpretation =
        "You're making progress! Focus on reading more carefully and taking time to think about the story elements to improve your scores.";
    } else {
      scoreInterpretation =
        "Keep practicing! Try reading stories multiple times and discussing them with others to improve your understanding.";
    }

    // Performance interpretation
    switch (performance) {
      case "Improving":
        performanceInterpretation =
          "Great job! Your assessment scores are getting better over time. This shows you're learning and developing your reading skills.";
        break;
      case "Declining":
        performanceInterpretation =
          "Don't worry! Everyone has ups and downs. Try reviewing stories you found challenging and ask for help when needed.";
        break;
      case "Stable":
        performanceInterpretation =
          "You're maintaining consistent performance. Consider challenging yourself with different types of stories to continue growing.";
        break;
      default:
        performanceInterpretation =
          "Keep reading to build your performance trend!";
    }

    // Genre interpretation
    if (favoriteGenre) {
      genreInterpretation = `You seem to enjoy ${favoriteGenre} stories the most! This is great - having a favorite genre can motivate you to read more. Consider exploring similar genres to expand your interests.`;
    } else {
      genreInterpretation =
        "You're exploring different genres equally. This is wonderful for developing diverse reading skills!";
    }

    // Progress interpretation
    if (completedCount >= 10) {
      progressInterpretation =
        "Amazing! You've completed many stories. You're building strong reading habits and expanding your knowledge.";
    } else if (completedCount >= 5) {
      progressInterpretation =
        "Well done! You're on your way to becoming a regular reader. Keep up the good momentum!";
    } else if (completedCount >= 1) {
      progressInterpretation =
        "You've started your reading journey! Each story you complete helps improve your skills.";
    } else {
      progressInterpretation =
        "Ready to start? Choose your first story and begin your reading adventure!";
    }

    setInterpretations({
      scoreInterpretation,
      performanceInterpretation,
      genreInterpretation,
      progressInterpretation,
    });
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

    let currentRemarks = "Stable";
    if (secondHalfAvg > firstHalfAvg) {
      currentRemarks = "Improving";
    } else if (secondHalfAvg < firstHalfAvg) {
      currentRemarks = "Declining";
    }
    setRemarks(currentRemarks);

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

    // Generate interpretations after all calculations
    const favoriteGenre = getHighestCountTag(tagCounts).maxTag;
    generateInterpretations(
      avg,
      currentRemarks,
      favoriteGenre,
      completedStories?.length || 0
    );
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
      </div>

      <div className={styles.Middle_left}>
        {/* Summary Interpretation Section */}
        <div className={styles.SummarySection}>
          <h3>📊 Your Reading Journey Summary</h3>
          <div className={styles.InterpretationCard}>
            <p>{interpretations.progressInterpretation}</p>
          </div>
        </div>

        <div className={styles.Detail}>
          <div className={styles.Avg} onClick={() => handleDetail(2)}>
            <span>Avg. Assessment Score</span>
            <span>{assessmentScore ? assessmentScore.toFixed(1) : 0}</span>
            <div className={styles.InterpretationHint}>
              {assessmentScore >= 4
                ? "🌟 Excellent!"
                : assessmentScore >= 3
                ? "👍 Good!"
                : assessmentScore >= 2
                ? "📚 Keep practicing!"
                : "💪 You can do it!"}
            </div>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(3)}>
            <span>Favorite Genre</span>
            <span>{getHighestCountTag(tagCounts).maxTag || "Exploring"}</span>
            <div className={styles.InterpretationHint}>
              {getHighestCountTag(tagCounts).maxTag
                ? "🎭 Your go-to choice!"
                : "🌈 Try different genres!"}
            </div>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(4)}>
            <span>Overall Performance</span>
            <span>{remarks}</span>
            <div className={styles.InterpretationHint}>
              {remarks === "Improving"
                ? "📈 Getting better!"
                : remarks === "Declining"
                ? "🔄 Need focus!"
                : "⚖️ Staying steady!"}
            </div>
          </div>
          <div className={styles.Avg} onClick={() => handleDetail(4)}>
            <span>Completed Stories</span>
            <span>{completedStories?.length || 0}</span>
            <div className={styles.InterpretationHint}>
              {(completedStories?.length || 0) >= 10
                ? "🏆 Reading champion!"
                : (completedStories?.length || 0) >= 5
                ? "🚀 Great progress!"
                : "🌱 Just starting!"}
            </div>
          </div>
        </div>

        {/* Detailed Interpretations */}
        <div className={styles.InterpretationsSection}>
          <div className={styles.InterpretationCard}>
            <h4>🎯 Assessment Score Insights</h4>
            <p>{interpretations.scoreInterpretation}</p>
          </div>

          <div className={styles.InterpretationCard}>
            <h4>📈 Performance Trend</h4>
            <p>{interpretations.performanceInterpretation}</p>
          </div>

          <div className={styles.InterpretationCard}>
            <h4>🎭 Genre Preferences</h4>
            <p>{interpretations.genreInterpretation}</p>
          </div>
        </div>

        <div className={styles.ChartDiv}>
          <div className={styles.ChartSection}>
            <h4>📊 Score Progress Over Time</h4>
            <p className={styles.ChartExplanation}>
              This chart shows how your assessment scores have changed over
              time.
              {remarks === "Improving"
                ? " Notice the upward trend - you're getting better!"
                : remarks === "Declining"
                ? " The recent dip is normal - everyone has challenging periods!"
                : " Your scores are consistent - try new challenges to see more growth!"}
            </p>
            <LineChart chartData={chartData} />
          </div>
          <div className={styles.ChartSection}>
            <h4>🎯 Your Favorite Story Types</h4>
            <p className={styles.ChartExplanation}>
              This pie chart shows which types of stories you read most. Having
              a favorite genre is great, but exploring others can broaden your
              skills!
            </p>
            <PieChart chartData={pieChartData} />
          </div>
        </div>
      </div>

      <div className={styles.TagMetrics}>
        <h3>📚 Your Reading History by Genre</h3>
        <p className={styles.SectionExplanation}>
          Here you can see your performance in each genre. Look for patterns -
          which genres help you score higher? Which ones might need more
          practice?
        </p>
        {Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .map((entry) => entry[0])
          .slice(0, completedStories?.length < 3 ? completedStories?.length : 3)
          .map((tag) => {
            const tagStories =
              completedStories?.filter((story) => story.tags.includes(tag)) ||
              [];
            const avgTagScore =
              tagStories.reduce(
                (sum, story) => sum + Number(story.assesmentScore),
                0
              ) / tagStories.length;

            return (
              <div className={styles.TagContainer} key={tag}>
                <div className={styles.TagHeader}>
                  <h2>{tag}</h2>
                  <div className={styles.TagInsight}>
                    <span>
                      Average Score: {avgTagScore ? avgTagScore.toFixed(1) : 0}
                    </span>
                    <span className={styles.TagTip}>
                      {avgTagScore >= 4
                        ? "🌟 You excel at this genre!"
                        : avgTagScore >= 3
                        ? "👍 You're doing well here!"
                        : avgTagScore >= 2
                        ? "📚 Room for improvement!"
                        : "💪 Keep practicing this genre!"}
                    </span>
                  </div>
                </div>
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
                  {completedStories
                    ?.toReversed()
                    .map((completedStory, index) => {
                      return completedStory.tags.includes(tag) ? (
                        <div className={styles.TagStoriesContainer} key={index}>
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
                            <p
                              className={`${styles.ScoreDisplay} ${
                                Number(completedStory.assesmentScore) >= 4
                                  ? styles.HighScore
                                  : Number(completedStory.assesmentScore) >= 3
                                  ? styles.GoodScore
                                  : Number(completedStory.assesmentScore) >= 2
                                  ? styles.FairScore
                                  : styles.LowScore
                              }`}
                            >
                              {completedStory.assesmentScore}
                            </p>
                          </div>
                        </div>
                      ) : null;
                    })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Quick Tips Section */}
      <div className={styles.TipsSection}>
        <h3>💡 Tips to Improve Your Reading</h3>
        <div className={styles.TipsList}>
          <div className={styles.Tip}>
            <span className={styles.TipIcon}>📖</span>
            <p>
              Read stories multiple times to catch details you might have missed
            </p>
          </div>
          <div className={styles.Tip}>
            <span className={styles.TipIcon}>🤔</span>
            <p>
              Take your time with assessments - think carefully about each
              question
            </p>
          </div>
          <div className={styles.Tip}>
            <span className={styles.TipIcon}>🎭</span>
            <p>
              Try different genres to discover new interests and improve various
              skills
            </p>
          </div>
          <div className={styles.Tip}>
            <span className={styles.TipIcon}>👥</span>
            <p>
              Discuss stories with friends or teachers to gain new perspectives
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = { getUser, getStories };
export default connect(null, mapDispatchToProps)(MetricsPage);
