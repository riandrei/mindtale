import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import View from "../assets/back.png";
import Goth from "../assets/goth.jpg";
import Art1 from "../assets/artwork2.webp";
import Art2 from "../assets/artwork3.jpg";
import Art3 from "../assets/artwork4.jpg";
import Art4 from "../assets/artwork6.jpg";
import Art5 from "../assets/Pinned.jpeg";
import Art7 from "../assets/artwork7.jpg";
import Art8 from "../assets/artwork8.jpg";
import Art9 from "../assets/artwork9.jpg";
import Art10 from "../assets/artwork10.jpg";
import Art11 from "../assets/artwork11.jpg";
import Art12 from "../assets/artwork12.jpg";

import "swiper/css";
import "swiper/css/pagination";

import "../css/Recommendation.module.css";
import SpecificStory from "../components/SpecificStory";

import styles from "../css/Recommendation.module.css";
import { Pagination } from "swiper/modules";

export default function RecentExploration() {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect the observer once triggered
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  const [visitedStories, setVisitedStories] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.story.stories);

  useEffect(() => {
    if (user?.id) {
      const visitedStoriesDetails = user.visited
        .map(({ story, ...rest }) => {
          const storyDetails = stories?.find(
            (storyElement) => storyElement._id === story
          );
          return {
            storyID: story,
            imgURL: storyDetails?.imgURL,
            title: storyDetails?.title,
            ...rest,
          };
        })
        .sort((a, b) => b.date.localeCompare(a.date));

      setVisitedStories(visitedStoriesDetails);
    }
  }, [user, stories]);

  return (
    <div
      ref={targetRef}
      className={`${styles.Recommendation} ${isVisible && styles.animation}`}
    >
      <div className={styles.viewAll}>
        <h2 className={styles.Reco}>Recent Explorations</h2>
        <Link to="/ViewAll" className={styles.View}>
          View all
        </Link>
      </div>
      <Swiper
        slidesPerView={2.75}
        spaceBetween={20}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },

          1280: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        modules={[]}
        className={styles.mySwiper}
      >
        {visitedStories.map((visitedStory) => (
          <SwiperSlide key={visitedStory?._id}>
            <SpecificStory
              id={visitedStory?.storyID}
              imgURL={visitedStory?.imgURL}
              title={visitedStory?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
