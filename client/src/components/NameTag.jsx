import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/NameTag.module.css'

import Dowelle from '../assets/Dowelle.jpg'

function NameTag() {
    return (
        <div className={styles.NameTag}>
            <Link to="/Profile"><img src={ Dowelle } /></Link>
            <div className={styles.NameTag_names}>
                <p>Dowelle Dayle</p>
                <p>Free</p>
            </div>
        </div>
    )
}

export default NameTag
