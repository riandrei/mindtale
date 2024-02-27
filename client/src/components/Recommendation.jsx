import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import View from '../assets/back.png'
import Goth from '../assets/goth.jpg'
import Art1 from '../assets/artwork2.webp'
import Art2 from '../assets/artwork3.jpg'
import Art3 from '../assets/artwork4.jpg'
import Art4 from '../assets/artwork6.jpg'
import Art5 from '../assets/Pinned.jpeg'
import Art7 from '../assets/artwork7.jpg'
import Art8 from '../assets/artwork8.jpg'
import Art9 from '../assets/artwork9.jpg'
import Art10 from '../assets/artwork10.jpg'
import Art11 from '../assets/artwork11.jpg'
import Art12 from '../assets/artwork12.jpg'


import 'swiper/css';
import 'swiper/css/pagination';

import '../css/Recommendation.module.css';
import SpecificStory from '../components/SpecificStory'


import styles from '../css/Recommendation.module.css'
import { Pagination } from 'swiper/modules';

export default function Recommendation() {

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
        rootMargin: '0px',
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
    <div ref={targetRef} className={`${styles.Recommendation} ${isVisible && styles.animation}`}>
      <div className={styles.viewAll}>
        <h2 className={styles.Reco}>Recommendations</h2>
        <Link className={styles.View}>View all</Link>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
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
        <SwiperSlide> <Link className={styles.title} to="/StoryDetails"> <SpecificStory image={Goth} title="The Lost Girl"/> </Link>  </SwiperSlide>
        <SwiperSlide> <SpecificStory image={Art8} title="Skull Bar"/>  </SwiperSlide>
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
        <SwiperSlide> <SpecificStory image={Art2} title="The Girl"/>  </SwiperSlide>


      </Swiper>
    </div>
  );
}
