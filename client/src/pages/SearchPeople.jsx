import React from 'react'
import styles from '../css/SearchPeople.module.css'

import Back from '../assets/back.png'

import People from '../components/People'

export function SearchPeople(props) {
    

    return (
        <div className={styles.SearchPeople}>
            <div className={styles.Top}>
                <img src={Back} />
                <input type="text" placeholder='Search bookworms...'/>
                <input type="text" placeholder='Enter tagline'/>
                <button>Search</button>
            </div>
            <div className={styles.People}>
                <People />
                <People />
            </div>
        </div>
    )
}
