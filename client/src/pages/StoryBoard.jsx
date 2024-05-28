import React, { useState } from 'react';
import styles from '../css/StoryBoard.module.css';

import { Choices } from '../components/Choices';
import ChaptersNav from '../components/ChaptersNav';
import Story from '../components/Story';
import StoryNav from '../components/StoryNav';

export function StoryBoard({ openNav, handleNavClick, isLight, handleThemeClick }) {

    const [fontSize, setFontSize] = useState(1);

    const handleIncreaseFontSize = () => {
        setFontSize(prevFontSize => prevFontSize + 1);
        console.log(fontSize)
    }

    const handleDecreaseFontSize = () => {
        setFontSize(prevFontSize => Math.max(prevFontSize - 1, 1));
        console.log(fontSize)
    }

    if (fontSize === 4 || fontSize <= 0){
        setFontSize(1)
    }

    return (
        <div className={isLight? styles.StoryBoard2 : styles.StoryBoard}>
            <div className={styles.Storyboard_inner}>
                <StoryNav fontSize={fontSize} handleIncreaseFontSize={handleIncreaseFontSize} handleDecreaseFontSize={handleDecreaseFontSize} openNav={openNav} handleNavClick={handleNavClick} isLight={isLight} handleThemeClick={handleThemeClick}/>
                <Story isLight={isLight} fontSize={fontSize}/>
            </div>
            {
                openNav && <ChaptersNav handleNavClick={handleNavClick}/>
            }
        </div>
    );
}
