import React, { useState } from 'react';
import styles from '../css/StoryBoard.module.css';

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
