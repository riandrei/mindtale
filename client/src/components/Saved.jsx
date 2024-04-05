import React from 'react'
import styles from '../css/Saved.module.css'

import Story from '../assets/artwork9.jpg'
import SpecificStory from './SpecificStory'
export default function Saved(props) {
    

    return (
        <div className={styles.User_saved}>
            <SpecificStory image={Story} />
            <SpecificStory image={Story} />
            <SpecificStory image={Story} />
        </div>
    )
}
