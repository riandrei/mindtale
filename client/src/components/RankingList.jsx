import React from 'react';
import styles from '../css/RankingList.module.css'
import Dowelle from '../assets/Dowelle.jpg'

export const RankingList = () => {
    return(
        <div className={styles.RankingList}>
            <div className={styles.Specific_Ranklist}>
                <div className={styles.Specific_Ranklist_inner}>
                    <span className={styles.RankNum}>4</span>
                    <img className={styles.User} src={Dowelle} />
                    <div className={styles.Specific_Ranklist_inner_inner}>
                        <span>Dowelle Dayle</span>
                        <span>#DDM</span>
                    </div>
                </div>

                <div className={styles.Percent}>
                    <span>98.432%</span>
                </div>
            </div>
        </div>
    )
}

export default RankingList;