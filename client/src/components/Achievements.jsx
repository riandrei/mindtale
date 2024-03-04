import React from 'react'
import styles from '../css/Achievements.module.css'

import Wizard from '../assets/wizard.png'

export default function Achievements(props) {
    

    return (
        <div className={styles.Achievements_container}>
            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>

            <div className={styles.Specific_achievement}>
                <img src={Wizard} />
                <h3>Book Wizard</h3>
                <p>Read 10 different books</p>
                <span>9 / 10</span>
            </div>
        </div>
    )
}
