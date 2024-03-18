import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Profile.module.css'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

import Setting from '../assets/settings.png'
import Off from '../assets/turn-off.png'
import Tiktok from '../assets/profile_tiktok.png'
import FB from '../assets/profile_fb.png'
import IG from '../assets/profile_ig.png'
import Telegram from '../assets/telegram.png'
import Twitter from '../assets/profile_twitter.png'
import User from '../assets/Dowelle.jpg'
import Artwork6 from '../assets/artwork6.jpg'
import Shadow from '../assets/shadow.png'
import Pinned from '../assets/Pinned.jpeg'
import Menu from '../assets/menu.png'
import Fav1 from '../assets/fav1.jpg'
import Fav2 from '../assets/fav2.jpg'
import Fav3 from '../assets/fav3.jpg'
import Save from '../assets/save.png'
import Book from '../assets/book.png'

export function Profile(props) {
    
    const [isPinned, setIsPinned] = useState(false);
    const handlePinnedClick = () => {
        setIsPinned( !isPinned )
    }


    const [isClickFinished, setIsClickFinished] = useState(true);
    const handleFinishedClick = () => {
        setIsClickSavedStory(false);
        setIsClickFinished(true);
    };
    
    const [isClickSavedStory, setIsClickSavedStory] = useState(false);
    const handleSavedFinishedClick = () => {
        setIsClickFinished(false);
        setIsClickSavedStory(true);
    };
    
    return (
        <div className={styles.Profile}>
            <Nav/>
            <div className={styles.Profile_container}>
                <div className={styles.top_first}>
                    <Link to="/Settings">hello</Link>
                    <img src={Off} />
                </div>
                <h1 className={ styles.Mindtale }>MINDTALE</h1>
                <div className={styles.center}>
                    <div className={`${styles.center_left} ${styles.center_child}`}>
                        <div className={`${styles.about_me} ${styles.left_child}`}>
                            <h2>About me</h2>
                            <p>Hello! I am Dowelle Dayle Mon and I love reading books, especially mystery stories that involves mind games and detective stuffs.</p>
                            <div className={styles.socials}>
                                <img src={ FB } />
                                <img src={ IG } />
                                <img src={ Twitter } />
                                <img src={ Telegram } />
                                <img src={ Tiktok } />
                            </div>
                        </div>

                        <div className={`${styles.Pinned} ${styles.left_child}`}>
                            <img className={styles.Pinned_pic} src={Pinned} />
                            <div className={styles.Pinned_inner}>
                                <div className={styles.Pinned_text}>
                                    <p>How About me?</p>
                                    <span>Drama | Adventure</span>
                                </div>
                                <img src={Menu} onClick={handlePinnedClick}/>
                                {isPinned && <Link className={styles.Change}><p >Change pinned story?</p></Link>}
                            </div>

                        </div>
                    </div>

                    <div className={`${styles.center_middle} ${styles.center_child}`}>
                        <img className={styles.User} src={ User } />
                        <h3>Dowelle Dayle</h3>
                        <select>
                            <option>Add Friend</option>
                            <option className={styles.block}>Block User</option>
                        </select>
                    </div>
                    <div className={`${styles.Last_read} ${styles.center_child}`}>
                        <div className={styles.lastRead_first}>
                            <div className={styles.last_spans}>
                                <span>D</span>
                                <span>A</span>
                                <span>E</span>
                                <span>R</span>
                                <span style={{visibility:"hidden"}}>m</span>
                                <span>T</span>
                                <span>S</span>
                                <span>A</span>
                                <span>L</span>
                            </div>
                            <img src={Artwork6} />
                        </div>
                        <div className={styles.lastRead_second}>
                            <h2>Where The Flower Blooms</h2>
                            <span>Drama</span>
                        </div>
                    </div>
                </div>

                <div className={styles.Profile_bottom}>
                    <div className={styles.bottom_left}>
                        <h2>Favorite Genre</h2>
                        <div className={styles.genre_pics}>
                            <img src={Fav1} />
                            <img src={Fav3} />
                            <img src={Fav2} />
                        </div>
                    </div>

                    <div className={styles.bottom_stats}>
                        <div className={styles.stats_container}>
                            <div className={styles.stats}>
                                <h3>Book Finished</h3>
                                <span>23</span>
                            </div>
                            <div className={styles.stats}>
                                <h3>Avg. Reading Duration</h3>
                                <span>10:03 mins</span>
                            </div>
                        </div>
                        <div className={styles.stats_container}>
                            <div className={styles.stats}>
                                <h3>Book Finished</h3>
                                <span>23</span>
                            </div>
                            <div className={styles.stats}>
                                <h3>Book Finished</h3>
                                <span>23</span>
                            </div>
                        </div>        
                    </div>
                </div>
                
                <div className={styles.content_container}>
                    <div className={styles.title_container}>
                        <div onClick={handleFinishedClick}className={ styles.title_inner}>
                            <img src={Book} />
                            <h2 >Books I've Finished</h2>
                        </div>
                        <div onClick={handleSavedFinishedClick} className={styles.title_inner}>
                            <img src={Save} />
                            <h2 >Saved Stories</h2>
                        </div>
                    </div>

                                    {
                    isClickFinished ? (
                        <div className={styles.Books_finished}>
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                            <img src={Fav1} />
                        </div>
                    ) : (
                        <div className={styles.Books_finished}>
                            <img src={Fav2} />
                            <img src={Fav2} />
                            <img src={Fav2} />
                            <img src={Fav2} />
                        </div>
                    )
                }

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Profile;
