import React from 'react'
import styles from '../css/Profile.module.css'

import Nav from '../components/Nav'

import Setting from '../assets/settings.png'
import Off from '../assets/turn-off.png'
import Tiktok from '../assets/profile_tiktok.png'
import FB from '../assets/profile_fb.png'
import IG from '../assets/profile_ig.png'
import Telegram from '../assets/telegram.png'
import Twitter from '../assets/profile_twitter.png'
import User from '../assets/Dowelle.jpg'

export function Profile(props) {
    

    return (
        <div className={styles.Profile}>
            <Nav/>
            <div className={styles.top_first}>
                <img src={Setting} />
                <img src={Off} />
            </div>
            <h1 className={ styles.Mindtale }>MINDTALE</h1>
            <div className={styles.center}>
                <div className={styles.center_left}>
                    <div className={styles.about_me}>
                        <h2>About me</h2>
                        <p>Hello! I am Dowelle Dayle Mon and I love reading books, especially mystery stories that involves mind games and detective stuffs.</p>
                        <div className={styles.socials}>
                            <img src={ FB } />
                            <img src={ IG } />
                            <img src={ Twitter } />
                            <img src={ Telegram } />
                            <img src={ Tiktok } />
                        </div>
                    </div>
                </div>

                <div className={styles.center_middle}>
                    <img className={styles.User} src={ User } />
                    <h3>Dowelle Dayle</h3>
                    <select>
                        <option>Add Friend</option>
                        <option className={styles.block}>Block User</option>
                    </select>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Profile;
