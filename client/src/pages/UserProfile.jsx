import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/Profile.module.css';
import Cover from '../assets/sample.jpg'
import Settings from '../assets/settings.png'
import Off from '../assets/turn-off.png'
import Dowelle from '../assets/Dowelle.jpg'
import Friend from '../assets/friends.png'
import Check from '../assets/completed.png'
import Saves from '../assets/saved.png'
import Invite from '../assets/invite.png'
import Info from '../assets/info.png'
import Story from '../assets/artwork9.jpg'
import Back from '../assets/back.png'
import Logo from '../assets/mindtale.png'
import Photocard from '../assets/photocard1.png'

import Footer from '../components/Footer'
import Saved from '../components/Saved'
import Completed from '../components/Completed';
import Friends from '../components/Friends';
import Achievements from '../components/Achievements';
import About from '../components/About'
import Nav from '../components/Nav'

function UserProfile() {
    const [activeIndex, setActiveIndex] = useState(0); // State to keep track of active index, initialized to 0

    const handleDivClick = (index) => {
      setActiveIndex(index === activeIndex ? null : index); // Toggle active index
    };
    return (
        <div className={styles.Profile}>
            <Nav />
            <div className={styles.Top}>
                <img src={Back} />
                <div className={styles.Top_inner}>
                    <img src={Settings} />
                    <img src={Off} />
                </div>
            </div>

            <div className={styles.Middle}>
                <div className={styles.Middle_top}>
                    <div className={styles.Middle_line}></div> <img src={Logo} /><div className={styles.Middle_line}></div>
                </div>
                <img className={styles.Photocard} src={Photocard} />
                <span className={styles.Name}>Dowelle Dayle</span>
                <div className={styles.Round}>
                    <span>#MonD</span>
                </div>
            </div>

            <div className={styles.User_details}>
                <div className={styles.User_head}>
                                <div className={activeIndex === 0 ? styles.UserHead_click2 : styles.UserHead_click} onClick={() => handleDivClick(0)}>
                                        <img src={Check} />
                                        <span>Completed</span>
                                    </div>
                                    <div className={activeIndex === 1 ? styles.UserHead_click2 : styles.UserHead_click} onClick={() => handleDivClick(1)}>
                                        <img src={Saves} />
                                        <span>Saved</span>
                                    </div>
                                    <div className={activeIndex === 2 ? styles.UserHead_click2 : styles.UserHead_click} onClick={() => handleDivClick(2)}>
                                        <img src={Invite} />
                                        <span>Achievements</span>
                                    </div>
                                    <div className={activeIndex === 3 ? styles.UserHead_click2 : styles.UserHead_click} onClick={() => handleDivClick(3)}>
                                        <img src={Friend} />
                                        <span>Friends</span>
                                    </div>
                                    <div className={activeIndex === 4 ? styles.UserHead_click2 : styles.UserHead_click} onClick={() => handleDivClick(4)}>
                                        <img src={Info} />
                                        <span>About</span>
                                    </div>
                </div>
                                {
                                    activeIndex === 0 ? <Completed /> :
                                    activeIndex === 1 ? <Saved /> : 
                                    activeIndex === 2 ? <Achievements /> :
                                    activeIndex === 3 ? <Friends /> :
                                    activeIndex === 4 ? <About /> : null
                                }
            </div>
            <Footer />
        </div>
    );
}

export default UserProfile;
