import React from 'react';
import styles from '../css/StoryNav.module.css'



import Back from '../assets/back.png'
import Book from '../assets/book-icon.png'
import Theme from '../assets/themes.png'

export const StoryNav = ({handleThemeClick, isLight}) => {
    return(
        <div className={styles.StoryNav}>
            <img className={styles.Back} src={Back} />
            <div className={styles.StoryNav_inner}>
                <img onClick={handleThemeClick} src={Theme} />
                <img src={Book} />
            </div>
        </div>
    )
}

export default StoryNav;