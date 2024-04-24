import React, {useState} from 'react'
import styles from '../css/People.module.css'

import Dowelle from '../assets/Dowelle.jpg'
import Line from '../assets/People_line.png'

export const People = () => {



    const [Friend, sentFriend] = useState(false)
    const handleFriendClick = () => {
        sentFriend( !Friend )
    }
    return(
        <div className={styles.People}>
            <div className={styles.Name_con}>
                <img className={styles.User} src={Dowelle}/>
                <img className={styles.Line} src={Line} />
                {
                    Friend ? <button onClick={handleFriendClick} className={styles.Sent}>Sent request</button> : <button onClick={handleFriendClick}>Add friend</button>
                }
            </div>
            <div className={styles.Bottom_con}>
                <span>Dowelle Dayle</span>
                <span>#DDM</span>
            </div>
        </div>
    )
}

export default People;