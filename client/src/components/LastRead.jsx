import React, {useState, useEffect} from 'react'
import styles from '../css/LastRead.module.css'

import Art from '../assets/artwork3.jpg'
import Save from '../assets/save.png'

export function LastRead(props) {

    const [maxLength, setMaxLength] = useState(window.innerWidth <= 431 ? 100 : 50);
    const fullText = "Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny."; // Your full text here
  
    useEffect(() => {
      const handleResize = () => {
        setMaxLength(window.innerWidth <= 1023 ? 125 : 450);
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const truncatedText = fullText.substring(0, maxLength);
    return (
        <div className={ styles.continue_reading }>
                        <h1>Continue Reading</h1>
                        <div className={ styles.continue_inner }>
                            <img className={ styles.continue_main_pic } src={ Art } alt="" />
                            <div className={ styles.continue_details }>
                                <div className={ styles.continue_title_container }>
                                    <div className={ styles.continue_title }>
                                        <h2>Bella Blues</h2>
                                        <p>Action | Mystery</p>
                                    </div>
                                    <img className={styles.save} src={ Save } alt="" />
                                </div>
                                <div className={ styles.story_description }>
                                    {truncatedText}
                                    <div></div>
                                </div>
                                <div className={ styles.explore}>
                                    <button>&#9658; Read</button>
                                    <button>&#9755;  Explore</button>
                                </div>

                            </div>
                        </div>

                    </div>
    )
}
export default LastRead;
