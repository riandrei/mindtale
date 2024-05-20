import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Congrats.module.css'

export const Congrats = () => {
    return(
        <div className={styles.Congrats}>
            <h1>Congratulations! You finish the reading the book</h1>
            <Link to="/Homepage" className={styles.Return}>Return to homepage</Link>
        </div>
    )
}

export default Congrats;