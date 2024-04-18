import React from 'react'
import styles from '../css/Chapters.module.css'

import Book from '../assets/book-icon.png'


export const Chapters = (props) => {
    return(
        <div className={styles.Chapters}>
            <div className={styles.Chapter_inner}>
                <img className={styles.Book} src={Book} />
                <span>{props.title}</span>
            </div>
            <span className={styles.Progress}>
                <span className={styles.Progress_inner}></span>
            </span>
        </div>
    )
}

export default Chapters;