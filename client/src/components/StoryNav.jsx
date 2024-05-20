import React from 'react';
import styles from '../css/StoryNav.module.css'



import Back from '../assets/back.png'
import Book from '../assets/book-icon.png'
import Theme from '../assets/themes.png'
import Dark from '../assets/dark.png'

export const StoryNav = ({handleThemeClick, isLight, handleNavClick, openNav}) => {
    return(
        <div className={styles.StoryNav}>
            <img className={styles.Back} src={Back} />
            <div className={styles.StoryNav_inner}>
                <img onClick={handleThemeClick} src={isLight?Theme:Dark} />
                {
                    openNav ? "" : <img onClick={handleNavClick} src={Book} />
                }
            </div>
        </div>
    )
}

export default StoryNav;