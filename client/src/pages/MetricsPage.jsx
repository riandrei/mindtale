import React from 'react'
import styles from '../css/MetricsPage.module.css'
import SampleChart from '../components/SampleChart'
import LineChart from '../components/LineChart'

export const MetricsPage = () => {
    return(
        <div className={styles.MetricsPage}>
            <div className={styles.Mid_left}>
                <SampleChart />
                {/* <LineChart/> */}
            </div>
            <div className={styles.Mid_right}>
                <SampleChart />
            </div>
        </div>
    )
}
export default MetricsPage;