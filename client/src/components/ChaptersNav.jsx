import React from 'react'
import styles from '../css/ChaptersNav.module.css'

import Logo from '../assets/mindtale.png'
import Sample from '../assets/artwork9.jpg'
import Line from '../assets/line3.png'
import Back from '../assets/back.png'
import Close from '../assets/invisible.png'

import Chapters from '../components/Chapters'

export const ChaptersNav = () => {
    return(
        <div className={styles.Chapters}>
            <div className={styles.Top}>
                <img src={Back} />
                <img src={Close} />
            </div>
            <div className={styles.Cover}>

                <img className={styles.Sample} src={Sample} />
                <h2>Wonderer</h2>
                <img className={styles.Line} src={Line} />
                <span>Mystery | Thriller</span>
            </div>
            <div className={styles.Chapters_con}>
                <Chapters title="Prologue: Where it All Started" />
                <Chapters title="Chapter 1: The Destination" />
                <Chapters title="Chapter 1: The Destination" />
                <Chapters title="Chapter 1: The Destination" />
                <Chapters title="Chapter 1: The Destination" />
                <Chapters title="Chapter 1: The Destination" />
                <Chapters title="Chapter 1: The Destination" />
            </div>
        </div>
    )
}

export default ChaptersNav;