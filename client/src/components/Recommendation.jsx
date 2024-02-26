import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import View from '../assets/back.png'

import 'swiper/css';
import 'swiper/css/pagination';

import '../css/Recommendation.module.css';
import SpecificStory from '../components/SpecificStory'


import styles from '../css/Recommendation.module.css'
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <div className={styles.Recommendation}>
      <div className={styles.viewAll}>
        <h2 className={styles.Reco}>Recommendations</h2>
        <Link className={styles.View}>View all</Link>
      </div>
      <Swiper
        slidesPerView={7.5}
        spaceBetween={20}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 8,
            spaceBetween: 0,
          },

        }}
        modules={[]}
        className={styles.mySwiper}
      >
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
        <SwiperSlide> <SpecificStory/>  </SwiperSlide>
      </Swiper>
    </div>
  );
}
