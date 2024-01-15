import React from 'react'
import styles from '../css/Gem.module.css'

import Gem from '../assets/Gem.png'

function GemContainer() {
    return (
        <div className={styles.Gem}>
            <img src={ Gem }/>
            <input type="number" value="50" />
            <button>&#43;</button>
        </div>
    )
}

export default GemContainer
