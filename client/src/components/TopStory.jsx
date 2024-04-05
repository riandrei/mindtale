import React, { useState, useEffect } from 'react'
import styles from '../css/TopStory.module.css'
import Artwork2 from '../assets/artwork2.webp'
import Save from '../assets/save.png'
import Saved from '../assets/saved.png'
import Confetti from '../assets/confetti.png'



function TopStory(props) {
  const [maxLength, setMaxLength] = useState(window.innerWidth <= 431 ? 100 : 50);
  const fullText = "Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny."; // Your full text here

  useEffect(() => {
    const handleResize = () => {
      setMaxLength(window.innerWidth <= 1023 ? 175 : 450);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncatedText = fullText.substring(0, maxLength);

  const [isBookmark, setIsBookmark] = useState(false);
  const handleBookmarkClick = () => {
    setIsBookmark( !isBookmark )
  }

    return (

        <div className={styles.TopStory}>
            
            <div className={ styles.story_left }>
                <h1>Top Stories</h1>
                <img src={ props.Story_image } />
                
            </div>
            <div className={ styles.story_right }>
                <div className={ styles.book_title }>
                    <div className={ styles.book_inner }>
                        <h2>Black Torch</h2>
                        <p>Mystery | Drama</p>
                    </div>
                    <img onClick={handleBookmarkClick} src={isBookmark ? Saved : Save} />
                    {
                      isBookmark && (
                        <div className={styles.SavedNotif}>
                            <h3>Story successfully bookmarked!</h3>
                            <img src={ Confetti } alt="" />
                        </div>
                      )
                    }

                </div>

                <div className={styles.description}>
                    {truncatedText}
                    <span className={ styles.dots }> ...</span>
                </div>
                <button>Explore</button>
            </div>

        </div>
    )
}

export default TopStory
