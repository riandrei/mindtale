import React from 'react'
import styles from '../css/Recommend.module.css'

export function Recommend(props) {
    

    return (
        <div className={styles.Recommend}>
            <img src={props.photo} />
            <div className={styles.Recommend_inner}>
                <span>{props.genre}</span>
                <h3>{props.title}</h3>
            </div>
        </div>
    )
}
export default Recommend;
