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
            <SpecificStory image={Story1}/>
            <SpecificStory image={Art1}/>
            <SpecificStory image={Art2}/>
            <SpecificStory image={Art3}/>
            <SpecificStory image={Art4}/>
            <SpecificStory image={Art5}/>
            <SpecificStory image={Story1}/>
            <SpecificStory image={Story1}/>
            <SpecificStory image={Story1}/>
            <SpecificStory image={Story1}/>
        </div>
    )
}
