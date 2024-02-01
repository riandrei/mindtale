import React from 'react'
import Nav from '../components/Nav'
import NameTag from '../components/NameTag'
import Notification from '../components/Notification'
import Gem from '../components/GemContainer'
import GemContainer from '../components/GemContainer'

import styles from '../css/StoryDetails.module.css'
import TopBar from '../components/TopBar'

import Story from '../assets/artwork2.webp'

export function StoryDetails() {
    return (
        <div className={ styles.StoryDetails }>
            <Nav/>
            <TopBar />

            <div className={ styles.main_pic} >

            </div>



        </div>
    )
}
export default StoryDetails;
