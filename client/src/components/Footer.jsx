import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Footer.module.css'

import Left from '../assets/left.png'
import Right from '../assets/right.png'
import Logo from '../assets/mindtale.png'

export function Footer(props) {
    

    return (
        <div className={ styles.Footer}>
            <img className={styles.lines} src={ Left } />
            <div className={styles.middle}>
                <img className={styles.logo} src={Logo} alt="" />
                <p>Copyright © 2024 Mindtale</p>
                <div className={styles.link_container}>
                    <Link className={styles.links}>Contact Us</Link> | <Link className={styles.links}>Privacy Policy</Link> | <Link className={styles.links}>About Us</Link>
                </div>
                <p className={styles.arrow}>Arrow Funk-tion</p>
            </div>
            <img className={styles.lines} src={ Right } />
        </div>
    )
}
export default Footer;
