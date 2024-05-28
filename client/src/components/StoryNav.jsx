import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/StoryNav.module.css'



import Back from '../assets/back.png'
import Book from '../assets/book-icon.png'
import Theme from '../assets/themes.png'
import Dark from '../assets/dark.png'
import Light from '../assets/book-icon-dark.png'

export const StoryNav = ({handleThemeClick, isLight, handleNavClick, openNav, fontSize, handleIncreaseFontSize, handleDecreaseFontSize}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className={styles.StoryNav}>
            <img onClick={goBack} className={styles.Back} src={Back} />
            <div className={styles.StoryNav_inner}>
                <span className={isLight?styles.Light : styles.Dark} onClick={handleDecreaseFontSize}>A-</span>
                <span className={isLight?styles.Light : styles.Dark} onClick={handleIncreaseFontSize}>A+</span>
                <img onClick={handleThemeClick} src={isLight? Dark:Theme} />
                {
                    openNav ? "" : <img onClick={handleNavClick} src={isLight ? Light :Book} />
                }
            </div>
        </div>
    )
}

export default StoryNav;