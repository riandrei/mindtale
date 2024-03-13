import React from 'react'
//same na lang sila css ng saved kasi same styling naman iba lang content
import styles from '../css/Saved.module.css'

import Story from '../assets/artwork8.jpg'

export default function Completed(props) {
    

    return (
        <div className={styles.User_saved}>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
            <img src={Story}/>
        </div>
    )
}
