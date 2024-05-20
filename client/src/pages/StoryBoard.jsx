import React, { useState } from 'react';
import styles from '../css/StoryBoard.module.css';

import { Choices } from '../components/Choices';
import ChaptersNav from '../components/ChaptersNav';
import Story from '../components/Story';
import StoryNav from '../components/StoryNav';

export function StoryBoard({ openNav, handleNavClick, isLight, handleThemeClick }) {

    

    return (
        <div className={isLight? styles.StoryBoard2 : styles.StoryBoard}>
            <div className={styles.Storyboard_inner}>
                <StoryNav openNav={openNav} handleNavClick={handleNavClick} isLight={isLight} handleThemeClick={handleThemeClick}/>
                <Story isLight={isLight}/>
            </div>
            {
                openNav && <ChaptersNav handleNavClick={handleNavClick}/>
            }
        </div>
    );
}
