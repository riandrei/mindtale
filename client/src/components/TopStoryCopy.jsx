import React from 'react'
import styles from '../css/TopStoryCopy.module.css'
import Artwork3 from '../assets/artwork3.jpg'
import Save from '../assets/save.png'

function TopStoryCopy() {
    return (
        <div className={styles.TopStory}>
            <div className={ styles.story_left }>
                <h1>Top Stories</h1>
                <img src={ Artwork3 } />
            </div>
            <div className={ styles.story_right }>
                <div className={ styles.book_title }>
                    <div>
                        <h2>Black Torch</h2>
                        <p>Mystery | Drama</p>
                    </div>
                    <img src={ Save } />
                </div>

                <p>Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny.</p>

                <button>Explore</button>
            </div>
        </div>
    )
}

export default TopStoryCopy
