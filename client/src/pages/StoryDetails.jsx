import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { getStories, postReview, getReviews } from "../actions/storyActions";
import { toggleBookmark, getUser } from "../actions/authActions";

import Nav from "../components/Nav";
import Comment from "../components/Comment";

import styles from "../css/StoryDetails.module.css";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Story from "../assets/artwork4.jpg";
import View from "../assets/view.png";
import Invite from "../assets/invite.png";
import Save from "../assets/save.png";
import Saved from "../assets/saved.png";
import Star from "../assets/star.png";
import Back from "../assets/previous.png";
import User from "../assets/Dowelle.jpg";
import Sort from "../assets/sort.png";

export function StoryDetails({
  getStories,
  toggleBookmark,
  postReview,
  getReviews,
  getUser,
}) {
  const [maxLength, setMaxLength] = useState(
    window.innerWidth <= 431 ? 100 : 50
  );

  useEffect(() => {
    const handleResize = () => {
      setMaxLength(window.innerWidth <= 1023 ? 375 : 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isRead, useIsRead] = useState(true);

  const handleReadClick = () => {
    useIsRead(false);
    setTimeout(() => {
      window.location.href = "/LoadingScreen";
    }, 500);
  };

  const { storyId } = useParams();
  const stories = useSelector((state) => state.story.stories);

  const story = stories?.find((story) => story._id === storyId);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (stories.length === 0) {
      getStories();
    }

    if (!user.id) {
      if (localStorage.getItem("token")) {
        getUser();
      }
    }
  }, []);

  const handleBookmarkClick = () => {
    const token = localStorage.getItem("token");
    toggleBookmark(token, storyId);
  };

  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    setReviewText("");
    postReview(storyId, 5, reviewText);
  };

  const checkExistingReview = () => {
    // console.log(
    //   story?.reviews.filter((review) => review.userId === user._id).length > 0
    // );
    return (
      story?.reviews.filter((review) => review.userId === user.id).length > 0
    );
  };

  const [selectedSort, setSelectedSort] = useState("newest");

  return (
    <div className={isRead ? styles.Story_details : styles.Story_details2}>
      <Nav />
      <TopBar />
      <div className={styles.Details_top}>
        <div className={styles.Details_left}>
          <img className={styles.main_pic} src={story?.imgURL} />
          <div className={styles.Details_buttons}>
            <button onClick={handleReadClick}>
              <Link className={styles.read}>
                &#9658;<span>Read</span>
              </Link>
            </button>
            <button>
              <img src={Invite} alt="" />
              Invite
            </button>
          </div>
        </div>
        <div className={styles.Details_right}>
          <div className={styles.Story_top}>
            <img src={Back} className={styles.back} alt="" />
            <div className={styles.Story_title}>
              <h1>{story?.title || "Loading..."}</h1>
              <p>{story?.tags.join(" | ")}</p>
              <div className={styles.Star_container}>
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <span>{`(${
                  story?.reviews.reduce(
                    (total, currVal) => total + currVal.reviewStar,
                    0
                  ) / story?.reviews.length || "No"
                } Ratings)`}</span>
              </div>
            </div>
            <img
              onClick={handleBookmarkClick}
              className={styles.save}
              src={
                user?.savedStories?.findIndex((id) => id === storyId) !== -1
                  ? Saved
                  : Save
              }
              alt="bookmark"
            />
          </div>
          <div className={styles.Synopsis}>
            <h2>Synopsis</h2>
            <div className={styles.Truncated}>
              {story?.synopsis}
              <span className={styles.text}>...</span>
            </div>
          </div>
          {/* <div className={styles.Views}>
            <span>2.1k Reads</span>
            <img src={View} alt="" />
          </div> */}
        </div>
      </div>
      <div className={styles.comment_text}>
        <h3>Comments</h3>
        <div className={styles.Sort}>
          <img src={Sort} alt="" />
          <span label="sort">Sort by</span>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            name="sort"
            id="sort"
            for="sort"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className={styles.Details_bottom}>
        <img src={User} alt="" />
        <div className={styles.input_comment}>
          <input
            maxLength={50}
            type="text"
            placeholder={
              user.id
                ? checkExistingReview()
                  ? "You've already written a review."
                  : "Write your review for this story!"
                : "Sign in to write a review"
            }
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={checkExistingReview()}
          />
          <button onClick={handleReviewSubmit}>Submit</button>
        </div>
      </div>
      <h3 className={styles.Review}>
        Reviews <span>{`(${story?.reviews.length})`}</span>
      </h3>
      <div className={styles.Actual_comments}>
        {story?.reviews.length > 0 ? (
          story?.reviews
            .toSorted((a, b) => {
              return selectedSort === "newest"
                ? new Date(b.dateAdded) - new Date(a.dateAdded)
                : new Date(a.dateAdded) - new Date(b.dateAdded);
            })
            .map((review) => (
              <Comment key={review._id} storyId={storyId} review={review} />
            ))
        ) : (
          <h3>No reviews yet</h3>
        )}
        {/* <Comment /> */}
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = {
  getStories,
  toggleBookmark,
  postReview,
  getReviews,
  getUser,
};

export default connect(null, mapDispatchToProps)(StoryDetails);
