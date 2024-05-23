import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Leaderboard.module.css'

import Nav from '../components/Nav'
import Rank from '../components/Rank'
import RankingList from '../components/RankingList'

import Back from '../assets/back.png'

export const Leaderboard = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return(
        <div className={styles.Leaderboard}>
            <Nav/>
            <img onClick={goBack} className={styles.Back} src={Back} />
            <Rank />
            <div className={styles.Ranklist_con}>
                <RankingList/>
                <RankingList/>
                <RankingList/>
                <RankingList/>
                <RankingList/>
                <RankingList/>
                <RankingList/>
            </div>
        </div>
    )
}

export default Leaderboard;