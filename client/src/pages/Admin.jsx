import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Admin.module.css'

import Nav from '../components/Nav'
import AllStories from '../components/AllStories'

import Back from '../assets/back.png'
import Lucy from '../assets/Luvy.jpg'
import Prev from '../assets/prev.png'
import Next from '../assets/next.png'
import Lock from '../assets/padlock.png'
import Line from '../assets/line3.png'

export function Admin() {
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonType) => {
      setSelectedButton(buttonType);
    };

    const[popUp, setPopUp] = useState(false)
    const handlePopupClick = () => {
        setPopUp( !popUp)
    }
    return (
        <div className={styles.Admin}>
            <Nav />
            <img onClick={goBack} className={styles.Back} src={Back} />
            <div className={styles.Middle}>
                <div className={styles.Middle_left}>
                    <img className={styles.Cover} src={Lucy} />
                    <div className={styles.Middle_left_down}>
                        <img src={Prev} />
                        <button>Generate</button>
                        <img src={Next} />
                    </div>
                </div>

                <div className={styles.Middle_right}>
                    <div className={styles.Book_title}>
                        <label>Book Title:</label>
                        <input type="text" />
                    </div>
                    <div className={styles.Book_title}>
                        <label>Book Synopsis:</label>
                        <textarea></textarea>
                    </div>

                    <div className={styles.Genre}>
                        <span>Genre</span>
                        <div className={styles.Genre_choices}>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Mystery</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Romance</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Sci-Fi</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Fantasy</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Horror</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Fiction</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Myth</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Fable</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Fantasy</label>
                            </div>
                            <div className={styles.Choice}>
                                <input type="checkbox" name="genre"/>
                                <label for="genre">Thriller</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Story_type}>
                        <button
                            className={`${styles.button} ${selectedButton === 'free' ? styles.select : ''}`}
                            onClick={() => handleButtonClick('free')}
                        >
                            Free access
                        </button>
                        <button
                            className={`${styles.button} ${selectedButton === 'premium' ? styles.select : ''}`}
                            onClick={() => handleButtonClick('premium')}
                        >
                            <img src={Lock} />
                            <span>Premium access</span>
                        </button>
                    </div>
                    <button onClick={handlePopupClick} className={styles.Create}>Create Story</button>
                </div>
            </div>
            <div className={styles.Line_con}>
                <img className={styles.Line} src={Line}/>
            </div>
            <div className={styles.All_stories}>
                <AllStories />
            </div>
            {
                popUp && (
                    <div className={styles.Popup}>
                        <h1>Are you sure you want to publish this story?</h1>
                        <div className={styles.Sure_con}>
                            <button>Publish</button>
                            <button onClick={handlePopupClick}>Cancel</button>
                        </div>
                    </div>
                ) 
            }
        </div>
    )
}

export default Admin;
