import React from 'react'
import styles from '../css/People.module.css'

import Dowelle from '../assets/Dowelle.jpg'
import Line from '../assets/People_line.png'

export const People = () => {
    return(
        <div className={styles.People}>
            <div>
                <div className={styles.Left}></div>
                <div className={styles.Name_con}>
                    <img className={styles.User} src={Dowelle}/>
                    <img className={styles.Line} src={Line} />
                    <button>Add friend</button>
                </div>
            </div>
        </div>
    )
}

export default People;