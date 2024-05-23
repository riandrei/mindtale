import React from 'react'
import styles from '../css/Rank.module.css'

import Dowelle from '../assets/Dowelle.jpg'

export const Rank = () => {
    return(
        <div className={styles.Rank}>
            <div className={styles.SpecificRank}>
                <span className={styles.Runner}>Dowelle Dayle</span>
                <img className={styles.Rank1} src={Dowelle} />
                <div className={styles.Rank_details2}>
                    <span>94.982%</span>
                    <span className={styles.Number}>3</span>
                </div>
            </div>

            <div className={styles.SpecificRank}>
                <span>Dowelle Dayle</span>
                <img className={styles.Rank1} src={Dowelle} />
                <div className={styles.Rank_details}>
                    <span>94.982%</span>
                    <span className={styles.Number}>1</span>
                </div>
            </div>

            <div className={styles.SpecificRank}>
                <span className={styles.Runner}>Dowelle Dayle</span>
                <img className={styles.Rank1} src={Dowelle} />
                <div className={styles.Rank_details2}>
                    <span>94.982%</span>
                    <span className={styles.Number}>2</span>
                </div>
            </div>

        </div>
    )
}

export default Rank;