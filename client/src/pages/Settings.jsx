import React, {useState} from 'react'
import styles from '../css/Settings.module.css'
import SettingNav from '../components/SettingNav'
import Logo from '../assets/mindtale.png'

import EditProfile from '../components/EditProfile'


export function Settings(props) {

    return (
        <div className={styles.Settings}>
            <SettingNav />
            <div className={styles.Main_body}>
                <img className={styles.Logo} src={Logo} />
                <div className={styles.Main_content}>
                    <EditProfile/>
                </div>
            </div>
        </div>
    )
}
export default Settings;
