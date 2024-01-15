import React, { useState } from 'react';
import styles from '../css/Homepage.module.css'

import NameTag from '../components/NameTag'
import GemContainer from '../components/GemContainer'
import Notification from '../components/Notification'
import Nav from '../components/Nav'
import TopStory from '../components/TopStory'

import Filter from '../assets/filter.png'
import Search from '../assets/search.png'


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
            
            <section className={styles.top_container}>
                <div className={styles.top_inner}>
                    <NameTag/>
                    <div className={styles.top_right}>
                        {/* <GemContainer/> */}
                        <Notification/>
                    </div>
                </div>
                <div className={styles.search}>
                    <button><img src={ Search } /></button>
                    <input maxLength={30} type="text" placeholder="   Search stories" />
                    <img onClick={handleFilterClick} className={ styles.filter } src={Filter} />

                    {isOpenFilter && (
                        <div className={ styles.filter_open}>
                            <h1>Filter</h1>
                        </div>
                    )}
                </div>
            </section>

            <section id="top-con" className={ styles.topstory_container }z>
                <TopStory/>
                <TopStory/>
                <TopStory/>
                <TopStory/>
                <TopStory/>
            </section>

            <section className={ styles.categories_container }>
                <div className={ styles.story_button }>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                <div className={styles.categories}>
                {buttonLabels.map((label, index) => (
                    <button
                        key={index}
                        style={{
                            backgroundColor: activeButton === index ? "#940000" : "",
                        }}
                        onClick={() => handleButtonClick(index)}
                        >
                        {label}
                    </button>
                ))}
                </div>
            </section>

        </div>
    )
}

export default Homepage
