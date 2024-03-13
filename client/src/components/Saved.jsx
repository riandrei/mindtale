import React from 'react'
import styles from '../css/Saved.module.css'

import Story from '../assets/artwork9.jpg'

export default function Saved(props) {
    

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
