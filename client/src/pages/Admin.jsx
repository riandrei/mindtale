import React from 'react'
import styles from '../css/Admin.module.css'

import Nav from '../components/Nav'
import AllStories from '../components/AllStories'

import Back from '../assets/back.png'
import Lucy from '../assets/Luvy.jpg'
import Prev from '../assets/prev.png'
import Lock from '../assets/padlock.png'
import Line from '../assets/line3.png'

export function Admin() {
    

    return (
        <div className={styles.Admin}>
            <Nav />
            <img className={styles.Back} src={Back} />
            <div className={styles.Middle}>
                <div className={styles.Middle_left}>
                    <img className={styles.Cover} src={Lucy} />
                    <div className={styles.Middle_left_down}>
                        <img src={Prev} />
                        <button>Generate</button>
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
                        <button>Free access</button>
                        <button className={styles.Premium}>
                            <img src={Lock} />
                            <span>Premium access</span>
                        </button>
                    </div>
                    <button className={styles.Create}>Create Story</button>
                </div>
            </div>
            <img className={styles.Line} src={Line}/>
            <div className={styles.All_stories}>
                <AllStories />
            </div>
        </div>
    )
}

export default Admin;
