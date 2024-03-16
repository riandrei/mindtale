import React from 'react'
import styles from '../css/Settings.module.css'

import Back from '../assets/back.png'
import Account from '../assets/account.png'

export default function SettingNav(props) {
    

    return (
        <div className={styles.Setting_nav}>
            <div className={styles.Back}>
                <img src={Back} />
                <h2>Settings</h2>
            </div>
            <div className={styles.Setting_click}>
                <img src={Account} alt="" />
                <span>Edit Profile</span>
            </div>

            <div className={styles.Setting_click}>
                <img src={Account} alt="" />
                <span>Security setting</span>
            </div>

            <div className={styles.Setting_click}>
                <img src={Account} alt="" />
                <span>Privacy setting</span>
            </div>

            <div className={styles.Setting_click}>
                <img src={Account} alt="" />
                <span>Premium plan</span>
            </div>
        </div>
    )
}
