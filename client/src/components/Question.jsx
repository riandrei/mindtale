import React from 'react';
import styles from '../css/Question.module.css'

export const Question = () => {
    return(
        <div className={styles.Question}>
            <div className={styles.SpecificQuestion}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque minima doloribus consectetur optio architecto pariatur placeat voluptates molestiae ipsum!
            </div>
            <div className={styles.Choices}>
                <button>
                    <span>A</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button>
                    <span>B</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button>
                    <span>C</span>
                    <span>Lorem Ipsum</span>
                </button>
                <button>
                    <span>D</span>
                    <span>Lorem Ipsum</span>
                </button>
            </div>
        </div>
    )
}

export default Question;