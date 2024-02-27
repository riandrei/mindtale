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
import Recommendation from '../components/Recommendation'
import Footer from '../components/Footer'
import RecentExploration from '../components/RecentExploration';

import Filter from '../assets/filter.png'
import Search from '../assets/search.png'
import Art from '../assets/artwork3.jpg'
import Save from '../assets/save.png'
import Art1 from '../assets/goth.jpg'
import Art2 from '../assets/artwork10.jpg'
import Art3 from '../assets/artwork6.jpg'
import Art4 from '../assets/Pinned.jpeg'
import Art5 from '../assets/artwork8.jpg'

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
        <SwiperSlide><TopStory Story_image={Art1} /></SwiperSlide>
        <SwiperSlide><TopStory Story_image={Art2}/></SwiperSlide>
        <SwiperSlide><TopStory Story_image={Art3}/></SwiperSlide>
        <SwiperSlide><TopStory Story_image={Art4} /></SwiperSlide>
        <SwiperSlide><TopStory Story_image={Art5}/></SwiperSlide>

      </Swiper>



            <section className={ styles.main_body}>

                <RecentExploration/>
                <LastRead/>
                <Recommendation/>
                <DailyRead/>
            </section>
            <Footer/>

        </div>
    )
}

export default Homepage
