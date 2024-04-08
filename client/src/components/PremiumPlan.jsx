import React from 'react'
import styles from '../css/SettingComponents.module.css'

import Premium from '../assets/premium-bg.png'
import Lock from '../assets/unlock.png'

export function PremiumPlan(props) {
    

    return (
        <div className={styles.Premium}>
            <div className={styles.Premium_inner}>
                <img className={styles.Premium_pic} src={Premium} />
                <div className={styles.Premium_feats}>
                    <span> • Access to exclusive stories </span>
                    <span> • Ad-Free Experrience </span>
                    <span> • Share Stories with Friends </span>
                    <span> • Custom Username </span>
                    <span> • Unlock Additional Photocards </span>
                    <span> • Expanded Friend Count Limit </span>
                </div>
                <button>
                    <img src={Lock} />
                    <span>Unlock Premium Access</span>
                </button>
            </div>
        </div>
    )
}
export default PremiumPlan;