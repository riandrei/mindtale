import React from 'react';
import styles from '../css/Quiz.module.css'
import Question from '../components/Question';

export const Quiz = () => {
    return(
        <div className={styles.Quiz}>
            <Question/>
        </div>
    )
}

export default Quiz;