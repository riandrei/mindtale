import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../css/Homepage.module.css";

import NameTag from "../components/NameTag";
import GemContainer from "../components/GemContainer";
import Notification from "../components/Notification";
import Nav from "../components/Nav";
import TopStory from "../components/TopStory";
import TopBar from "../components/TopBar";
import LastRead from "../components/LastRead";
import DailyRead from "../components/DailyRead";
import Recommendation from "../components/Recommendation";
import Footer from "../components/Footer";
import RecentExploration from "../components/RecentExploration";
import Thriller from "../components/Thriller";
import SliderTags from "../components/SliderTags";

import { getUser } from "../actions/authActions";
import { getStories } from "../actions/storyActions";
import NameInput from "../components/NameInput";

import Filter from "../assets/filter.png";
import Search from "../assets/search.png";
import Art from "../assets/artwork3.jpg";
import Save from "../assets/save.png";
import Art1 from "../assets/goth.jpg";
import Art2 from "../assets/artwork10.jpg";
import Art3 from "../assets/artwork6.jpg";
import Art4 from "../assets/Pinned.jpeg";
import Art5 from "../assets/artwork8.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Homepage({ getUser, getStories }) {
  const [isOpenFilter, setOpenFilter] = useState(false);

  const handleFilterClick = () => {
    setOpenFilter(!isOpenFilter);
  };

  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Change this threshold as per your requirement
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.story.stories);
  const navigate = useNavigate();

  useEffect(() => {
    getStories();

    if (!user.id) {
      if (localStorage.getItem("token")) {
        getUser();
      }
    } else {
      if (!user.verified) {
        navigate("/NewUserVerify");
      }
    }
  }, []);

  const [topTags, setTopTags] = useState([]);
  useEffect(() => {
    const tagCounts = user?.completedStories?.reduce((acc, story) => {
      story.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    if (tagCounts) {
      const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

      // 2. Slice the first three elements (top 3 values)
      const topThreeTags = sortedTags.slice(0, 3).map(([tag]) => tag);

      if (topThreeTags.length === 0) {
        topThreeTags.push("Fantasy");
        topThreeTags.push("Exploration");
        topThreeTags.push("Cyberpunk");
      }

      setTopTags(topThreeTags);
    }
  }, [user]);

  return (
    <div className={styles.Homepage}>
      <Nav />
      <TopBar />
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className={styles.mySwiper}
      >
        {stories?.length > 0 &&
          stories.map((story) => (
            <SwiperSlide key={story?._id}>
              <TopStory
                title={story?.title}
                tags={story?.tags}
                synopsis={story.synopsis}
                imgURL={story?.imgURL}
                storyID={story?._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <section className={styles.main_body}>
        <RecentExploration />
        <LastRead />
        {/* {topTags.map((tag) => (
          <SliderTags key={tag} tag={tag} />
        ))} */}
        {user?.storyPreference?.map((storyTag) => (
          <SliderTags tag={storyTag} />
        ))}

        <DailyRead />
      </section>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = { getUser, getStories };

export default connect(null, mapDispatchToProps)(Homepage);
