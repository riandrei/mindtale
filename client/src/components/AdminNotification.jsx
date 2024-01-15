import React from 'react'
import Logo from '../assets/mindtale.png'
import styles from '../css/AdminNotification.module.css'

function AdminNotification() {
    return (
        <div className={ styles.admin_notification }>
            <img className={ styles.mindtale } src={ Logo } />
            <div className={ styles.admin_inner }>
                <div className={ styles.mind }>
                    <div>MindTale</div>
                    <span>1hr</span>
                </div>
                <p>Congratulations! you unlock 10 different stories</p>
            </div>
        </div>
    )
}

export default AdminNotification
