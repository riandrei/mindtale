import React from 'react'
import styles from '../css/Metrics.module.css'

export const Metrics = (props) => {
    

    return (
        <div className={styles.Metrics}>
            <div className={styles.left}></div>
            <div className={styles.right}>
                <h3>{props.Metric_name}: </h3>
                <span>{props.Metric_value}</span>
                <div></div>
            </div>
        </div>
    )
}
export default Metrics;
