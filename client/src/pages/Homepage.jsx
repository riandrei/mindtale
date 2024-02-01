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

import Filter from '../assets/filter.png'
import Search from '../assets/search.png'
import Art from '../assets/artwork3.jpg'
import Save from '../assets/save.png'


function Homepage() {

    

    const buttonLabels = ["For you", "Scifi", "Sports", "Top Rated", "Adventure", "Fantasy", "Action", "Horror", "Mystery", "Romance"];
    const [activeButton, setActiveButton] = useState(0);
  
    const handleButtonClick = (index) => {
      setActiveButton(index);
    };

    const [isOpenFilter, setOpenFilter] = useState(false);

    const handleFilterClick = () => {
        setOpenFilter( !isOpenFilter)
    }

    return (

        <div className={styles.Homepage}>
            <Nav/>
            <TopBar/>
            <section id="top-con" className={ styles.topstory_container }>
                <TopStory/>
                <TopStory/>
                <TopStory/>
                <TopStory/>
                <TopStory/>
            </section>



            <section className={ styles.main_body}>
                <LastRead/>
                <DailyRead/>
                <h1 style={{color:"#fff"}}>helloe</h1>
            </section>

        </div>
    )
}

export default Homepage
