import React from 'react'
import styles from '../css/Nav.module.css'

import { Link } from 'react-router-dom'

import Book from '../assets/book.png'
import Save from '../assets/save.png'
import Search from '../assets/search.png'
import Quest from '../assets/quest.png'
import Profile from '../assets/account.png'
import SearchPeople from '../assets/search-profile.png'

function Nav() {
    return (
        <div className={styles.Nav}>
            <Link to="/Homepage"> <img src={Book} /> </Link>
            <Link> <img src={Search} /> </Link>
            <Link to="/SearchPeople"> <img src={SearchPeople} /> </Link>
            <Link> <img src={Save} /> </Link>
            <Link to="/Profile"> <img src={Profile} /> </Link>
            <div className={styles.title}>
                <span>M</span>
                <span>I</span>
                <span>N</span>
                <span>D</span>
                <span>T</span>
                <span>A</span>
                <span>L</span>
                <span>E</span>
            </div>
        </div>
    )
}

export default Nav
