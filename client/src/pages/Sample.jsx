import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from '../css/Sample.module.css'
import TopStory from '../components/TopStory';

// import required modules
import { Pagination } from 'swiper/modules';

export function Sample() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.mySwiper}
      >
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>

      </Swiper>
    </>
  );
}
export default Sample;