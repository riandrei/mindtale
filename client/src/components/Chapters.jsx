import React from 'react'
import styles from '../css/Chapters.module.css'

import Book from '../assets/book-icon.png'


export const Chapters = (props) => {
    return(
        <div className={styles.Chapters}>
            <img className={styles.Book} src={Book} />
            <span>{props.title}</span>
        </div>
    )
}

export default Chapters;