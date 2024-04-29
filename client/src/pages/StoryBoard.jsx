import React, { useState } from 'react';
import styles from '../css/StoryBoard.module.css';

import Back from '../assets/back.png';
import Theme from '../assets/themes.png';
import Dark from '../assets/dark.png';
import Sample1 from '../assets/sample1.png';

import Footer from '../components/Footer';
import { Choices } from '../components/Choices';
import ChaptersNav from '../components/ChaptersNav';
import Story from '../components/Story';

export function StoryBoard({ openNav, handleNavClick }) {


    return (
        <div className={styles.StoryBoard}>
            <Story openNav={openNav} handleNavClick={handleNavClick} />
            {
                openNav ? null : <ChaptersNav openNav={openNav} handleNavClick={handleNavClick}/> 
            }
        </div>
    );
}
