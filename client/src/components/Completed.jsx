import React from 'react'
//same na lang sila css ng saved kasi same styling naman iba lang content
import styles from '../css/Saved.module.css'
import SpecificStory from '../components/SpecificStory'
import Story1 from '../assets/artwork4.jpg'
import Art1 from '../assets/goth.jpg'
import Art2 from '../assets/artwork10.jpg'
import Art3 from '../assets/artwork6.jpg'
import Art4 from '../assets/Pinned.jpeg'
import Art5 from '../assets/artwork8.jpg'
import Story from '../assets/artwork8.jpg'

export default function Completed(props) {
    

    return (
        <div className={styles.User_saved}>
            <SpecificStory image={Story1} title="Hello"/>
            <SpecificStory image={Art1} title="Hello"/>
            <SpecificStory image={Art2} title="Hello"/>
            <SpecificStory image={Art3} title="Hello"/>
            <SpecificStory image={Art4} title="Hello"/>
            <SpecificStory image={Art5} title="Hello"/>
            <SpecificStory image={Story1} title="Hello"/>
            <SpecificStory image={Story1} title="Hello"/>
            <SpecificStory image={Story1} title="Hello"/>
            <SpecificStory image={Story1} title="Hello"/ >
        </div>
    )
}
