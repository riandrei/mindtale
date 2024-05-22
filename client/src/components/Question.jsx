import React, {useEffect} from 'react';
import styles from '../css/Question.module.css'

export const Question = ({Question, handleQuestionCount, questionCount, isLight}) => {
    useEffect(() => {
        
        const timer = setTimeout(() => {
            handleQuestionCount();
        }, 20000);

        
        return () => clearTimeout(timer);
    }, [handleQuestionCount, questionCount]);
    return(
        <div className={styles.Question}>
            <div className={isLight?styles.SpecificQuestion2:styles.SpecificQuestion}>
            {Question}
            </div>
            <div className={styles.Choices}>
                <button onClick={handleQuestionCount}>
                    <span>A</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button onClick={handleQuestionCount}>
                    <span>B</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button onClick={handleQuestionCount}>
                    <span>C</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button onClick={handleQuestionCount}>
                    <span>D</span>
                    <span>Lorem Ipsum Lorem IpsumLorem Ipsum</span>
                </button>
            </div>
            <div className={styles.Time}>
                
            </div>
        </div>
    )
}

export default Question;