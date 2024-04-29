import React, { useState, useEffect, useRef } from 'react';
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
import Thriller from '../components/Thriller';
import NameInput from '../components/NameInput';

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


    const [isOpenFilter, setOpenFilter] = useState(false);

    const handleFilterClick = () => {
        setOpenFilter( !isOpenFilter)
    }

    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
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
                <Thriller />
                <DailyRead/>
                
            </section>
            {/* <NameInput /> */}
            <Footer/>

        </div>
    )
}

export default Homepage
