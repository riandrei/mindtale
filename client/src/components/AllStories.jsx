import React from 'react'
import styles from '../css/AllStories.module.css'
import SpecificStory from '../components/SpecificStory'

import Story1 from '../assets/artwork8.jpg'
import Line from '../assets/line3.png'

export function AllStories(props) {
    

    return (
        <div className={styles.AllStories}>
            <div className={styles.Stories_top}>
                <span>All stories</span>
                <select>
                    <option value="Newest">Newest</option>
                    <option value="Newest">Oldest</option>
                </select>
                <input type="text" placeholder='Search story...' />
            </div>
            <div className={styles.Stories_con}>
                <SpecificStory image={Story1} title="Sample title" />
                <SpecificStory image={Story1} title="Sample title" />
                <SpecificStory image={Story1} title="Sample title" />
                <SpecificStory image={Story1} title="Sample title" />
                <SpecificStory image={Story1} title="Sample title" />
            </div>
            
        </div>
    )
}
export default AllStories;