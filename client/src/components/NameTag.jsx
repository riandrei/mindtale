import React from 'react'
import styles from '../css/NameTag.module.css'

import Dowelle from '../assets/Dowelle.jpg'

function NameTag() {
    return (
        <div className={styles.NameTag}>
            <img src={ Dowelle } />
            <div className={styles.NameTag_names}>
                <p>Dowelle Dayle</p>
                <p>Free</p>
            </div>
        </div>
    )
}

export default NameTag
