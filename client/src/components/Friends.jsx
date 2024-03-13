import React from 'react'
import styles from '../css/Friends.module.css'
import User1 from '../assets/jem.jpg'

export default function Friends(props) {
    

    return (
        <div className={styles.Friends}>
            <div className={styles.Specific_friend}>
                <img src={User1}/>
                <div className={styles.Friends_inner}> 
                    <h3>Jem Andrei</h3>
                    <span>19 mutual friends</span>
                </div>
            </div>

            <div className={styles.Specific_friend}>
                <img src={User1}/>
                <div className={styles.Friends_inner}> 
                    <h3>Jem Andrei</h3>
                    <span>19 mutual friends</span>
                </div>
            </div>

            <div className={styles.Specific_friend}>
                <img src={User1}/>
                <div className={styles.Friends_inner}> 
                    <h3>Jem Andrei</h3>
                    <span>19 mutual friends</span>
                </div>
            </div>

            <div className={styles.Specific_friend}>
                <img src={User1}/>
                <div className={styles.Friends_inner}> 
                    <h3>Jem Andrei</h3>
                    <span>19 mutual friends</span>
                </div>
            </div>
            <div className={styles.Specific_friend}>
                <img src={User1}/>
                <div className={styles.Friends_inner}> 
                    <h3>Jem Andrei</h3>
                    <span>19 mutual friends</span>
                </div>
            </div>
        </div>
    )
}
