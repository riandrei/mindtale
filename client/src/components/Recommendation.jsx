import React from 'react'
import styles from '../css/Recommendation.module.css'

import SpecificStory from '../components/SpecificStory'

export function Recommendation(props) {
    

    return (
        <div className={ styles.Recommendation }>
            <h1>Recommended for you</h1>
            <div className={ styles.Story_container}>
                <SpecificStory />
                <SpecificStory />

            </div>
        </div>
    )
}
export default Recommendation;
