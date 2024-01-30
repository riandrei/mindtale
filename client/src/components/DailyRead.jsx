import React from 'react'
import styles from '../css/DailyRead.module.css'

import Save from '../assets/save.png'
import Daily from '../assets/DailyStory.avif'

export function DailyRead(props) {
    

    return (
        <div className={ styles.DailyRead }>
            <div className={ styles.Daily_Top }>
                <h1>Daily Story</h1>
                <img src={ Save } />
            </div>
            <div className={ styles.Daily_Content }>
                <img src={ Daily } alt="" />
                <h2>Love of Tomorrow</h2>
                <p>Romance | Mystery</p>
                <div className={ styles.Daily_button }>
                    <button>&#9658; Read</button>
                    <button>&#9755;  Explore</button>
                </div>
            </div>
        </div>
    )
}
export default DailyRead;
