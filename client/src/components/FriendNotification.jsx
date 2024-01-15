import React from 'react'
import styles from '../css/FriendNotification.module.css'
import Dowelle from '../assets/Dowelle.jpg'

function FriendNotification() {
    return (
        <div className={ styles.friend_request }>
            <img src={ Dowelle }/>
                <div className={ styles.friend_right }>
                    <div className={ styles.sent_request }>
                        <div className={ styles.sent_inner}>
                            <span>Dowelle Dayle</span>
                            <span>Sent you a friend request</span>
                        </div>
                        <p>1hr</p>
                    </div>
                    <div className={styles.friend_button}>
                        <button>Accept</button>
                        <button>Decline</button>
                    </div>
            </div>
        </div>
    )
}

export default FriendNotification
