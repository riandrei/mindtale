import React from 'react';
import styles from '../css/Quiz.module.css'
import Question from '../components/Question';
import StoryNav from '../components/StoryNav';

export const Quiz = ({handleQuestionCount, questionCount, isLight, handleThemeClick}) => {
    return(
        <div className={isLight? styles.Quiz: styles.Quiz2}>
            <StoryNav isLight={isLight} handleThemeClick={handleThemeClick}/>
            {questionCount === 1 && (
                <Question
                    Question="What is life?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 2 && (
                <Question
                    Question="What is love?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 3 && (
                <Question
                    Question="What is the meaning of happiness?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 4 && (
                <Question
                    Question="What is the purpose of education?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 5 && (
                <Question
                    Question="What is the essence of art?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 6 && (
                <Question
                    Question="What is the importance of technology?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 7 && (
                <Question
                    Question="What is freedom?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 8 && (
                <Question
                    Question="What is justice?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 9 && (
                <Question
                    Question="What is beauty?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            {questionCount === 10 && (
                <Question
                    Question="What is friendship?"
                    handleQuestionCount={handleQuestionCount}
                    questionCount={questionCount}
                    isLight={isLight}
                />
            )}
            <span className={isLight?styles.Count:styles.Count2}>{questionCount} / 10</span>
        </div>
    )
}

export default Quiz;