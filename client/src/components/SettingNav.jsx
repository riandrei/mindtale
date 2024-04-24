import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Settings.module.css'

import Back from '../assets/back.png'
import Account from '../assets/account.png'
import Security from '../assets/security.png'
import Privacy from '../assets/privacy.png'
import Premium from '../assets/premium.png'

export default function SettingNav(props) {
    
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    }

    return (
        <div className={styles.Setting_nav}>
            <div className={styles.Back}>
                <img src={Back} onClick={goBack} />
                <h2>Settings</h2>

            </div>
            <div className={styles.Nav_inner}>
                <div className={styles.Setting_click}>
                    <img src={Account} alt="" />
                    <span>Edit Profile</span>
                </div>

                <div className={styles.Setting_click}>
                    <img src={Security} alt="" />
                    <span>Security setting</span>
                </div>

                <div className={styles.Setting_click}>
                    <img src={Privacy} alt="" />
                    <span>Privacy setting</span>
                </div>

                <div className={styles.Setting_click}>
                    <img src={Premium} alt="" />
                    <span>Premium plan</span>
                </div>
            </div>
        </div>
    )
}
