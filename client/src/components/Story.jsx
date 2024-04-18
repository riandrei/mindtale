import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Story.module.css'

import Choices from '../components/Choices'

import Sample1 from '../assets/sample1.png'

export function Story(props) {
    

    return (
        <div className={styles.Story}>
            <h1 className={styles.Main_title}>Prologue: Where it All Started</h1>
            <img src={Sample1} />

            <div className={styles.Next}>
                <Link className={styles.Prev}>Previous</Link>
                <Link className={styles.Prev}>Next</Link>
            </div>
        </div>
    )
}

export default Story
