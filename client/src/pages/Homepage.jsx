import React, { useState } from 'react';
import styles from '../css/Homepage.module.css'

import NameTag from '../components/NameTag'
import GemContainer from '../components/GemContainer'
import Notification from '../components/Notification'
import Nav from '../components/Nav'
import TopStory from '../components/TopStory'
import TopBar from '../components/TopBar'
import LastRead from '../components/LastRead'
import DailyRead from '../components/DailyRead'
import Recommendation from '../components/Recommendation.jsx'

import Filter from '../assets/filter.png'
import Search from '../assets/search.png'
import Art from '../assets/artwork3.jpg'
import Save from '../assets/save.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

function Homepage() {

    // const buttonLabels = ["For you", "Scifi", "Sports", "Top Rated", "Adventure", "Fantasy", "Action", "Horror", "Mystery", "Romance"];
    // const [activeButton, setActiveButton] = useState(0);
  
    // const handleButtonClick = (index) => {
    //   setActiveButton(index);
    // };

    const [isOpenFilter, setOpenFilter] = useState(false);

    const handleFilterClick = () => {
        setOpenFilter( !isOpenFilter)
    }

    return (

        <div className={styles.Homepage}>
                <Nav />
            <TopBar/>
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
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>
        <SwiperSlide><TopStory/></SwiperSlide>

      </Swiper>



            <section className={ styles.main_body}>
                <Recommendation/>
                <LastRead/>
                <DailyRead/>
                <h1 style={{color:"#fff"}}>helloe</h1>
            </section>

        </div>
    )
}

export default Homepage
