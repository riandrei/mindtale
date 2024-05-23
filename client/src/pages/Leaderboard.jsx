import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Leaderboard.module.css'

import Nav from '../components/Nav'
import Rank from '../components/Rank'

import Back from '../assets/back.png'

export const Leaderboard = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className={styles.Leaderboard}>
            <Nav/>
            <img className={styles.Back} src={Back} />
            <Rank />
            
        </div>
    )
}

export default Leaderboard;