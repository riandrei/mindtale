import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import Goth from "../assets/goth.jpg";

import "swiper/css";
import "swiper/css/pagination";

import "../css/Recommendation.module.css";
import SpecificStory from "../components/SpecificStory";

import styles from "../css/Recommendation.module.css";

export default function SliderTags({ tag }) {
  const targetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const stories = useSelector((state) => state.story.stories);

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
  return (
    <div
      ref={targetRef}
      className={`${styles.Recommendation} ${isVisible && styles.animation}`}
    >
      <div className={styles.viewAll}>
        <h2 className={styles.Reco}>{tag}</h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          431: {
            height: 915,
            slidesPerView: 3,
            spaceBetween: 0,
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
        {stories.map(
          (story) =>
            story.tags.includes(tag) && (
              <SwiperSlide key={story._id}>
                <Link
                  className={styles.title}
                  to={`/StoryDetails/${story._id}`}
                >
                  <SpecificStory image={story.imgURL} title={story.title} />
                </Link>
              </SwiperSlide>
            )
        )}

        {/* <SwiperSlide> <SpecificStory image={Art8} title="Skull Bar"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art9} title="Hell's Paradise" />  </SwiperSlide>

        <SwiperSlide> <SpecificStory image={Art4} title="Sakura Misoki"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art12} title="Tanjiro Kamado"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art10} title="Nowhere"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art5} title="Pink Panther"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art11} title="Flamme"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art3} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art1} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art7} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art2} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art11} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art3} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art1} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art7} title="The Girl"/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art2} title="The Girl"/>  </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
