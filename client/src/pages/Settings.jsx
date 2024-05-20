import React, {useState} from 'react'
import styles from '../css/Settings.module.css'
import SettingNav from '../components/SettingNav'
import Logo from '../assets/mindtale.png'

import EditProfile from '../components/EditProfile'
import Footer from '../components/Footer'
import PremiumPlan from '../components/PremiumPlan'
import PrivacySetting from '../components/PrivacySetting'


export function Settings({settingClick, handleSettingClick}) {


    return (
        <div className={styles.Settings}>
            <SettingNav settingClick={settingClick} handleSettingClick={handleSettingClick} />
            <div className={styles.Main_body}>
                <div className={styles.Main_content}>
                    {settingClick === 1 && <EditProfile />}
                    {settingClick === 3 && <PrivacySetting />}
                    {settingClick === 4 && <PremiumPlan />}
                </div>
            </div>
        </div>
    )
}
export default Settings;
