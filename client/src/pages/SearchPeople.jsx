import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/SearchPeople.module.css'

import Back from '../assets/back.png'

import People from '../components/People'

export function SearchPeople(props) {
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    }

    return (
        <div className={styles.SearchPeople}>
            <div className={styles.Top}>
                <img src={Back} onClick={goBack} />
                <input type="text" placeholder='Search bookworms...'/>
                <input type="text" placeholder='Enter tagline'/>
                <button>Search</button>
            </div>
            <div className={styles.People}>
                <People />
                <People />
                <People />
                <People />
            </div>
        </div>
    )
}
