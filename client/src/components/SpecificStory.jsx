import React from 'react'
import styles from '../css/SpecificStory.module.css'
import Star from '../assets/star.png'
import SampleStory from '../assets/DailyStory.avif'

export function SpecificStory(props) {
    

    return (
        <div className={styles.SpecificStory}>
            <img className={styles.SampleStory} src={ props.image } />
            <p className={styles.Title}>{props.title}</p>
            <div className={styles.Stars}>
                <img src={ Star } />
                <img src={ Star } />
                <img src={ Star } />
                <img src={ Star } />
            </div>
        </div>
    )
}
export default SpecificStory;
