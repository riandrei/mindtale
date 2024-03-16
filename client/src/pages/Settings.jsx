import React from 'react'
import styles from '../css/Settings.module.css'
import SettingNav from '../components/SettingNav'

export default function Settings(props) {
    
    return (
        <div className={styles.Settings}>
            <SettingNav />
        </div>
    )
}
