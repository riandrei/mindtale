import React, {useState} from 'react'
import styles from '../css/Comment.module.css'
import User from '../assets/Dowelle.jpg'
import Star from '../assets/star.png'
import Trash from '../assets/trash-can.png'
import TrashOpen from '../assets/trash-can-open.png'
import Close from '../assets/close.png'

export function Comment(props) {
    
    const [isEdit, setIsEdit] = useState(false);

    const handleEditClick = () => {
        setIsEdit( !isEdit );
    }

    return (
        <div className={ styles.Comment}>
            {/* <h2>Reviews</h2> */}
            <div className={styles.Comment_container}>
                <img className={styles.User} src={ User } />
                <div className={ styles.Comment_details}>
                    <div className={ styles.Comment_name}>
                        <h3>Dowelle Dayle</h3>
                        <p>2 weeks ago</p>
                        <img onClick = {handleEditClick} src={ isEdit? TrashOpen : Trash } />
                        {
                            isEdit && (
                                <div className={styles.edit_button}>
                                    <div className={styles.edit_inner}>
                                        <span>Are you sure?</span>
                                        <img className={styles.close} src={Close} onClick={handleEditClick} />
                                    </div>
                                    <button>Delete comment</button>
                                </div>
                            )
                        }
                    </div>
                    <div className={ styles.Star_container}>
                        <img src={ Star } alt="" />
                        <img src={ Star } alt="" />
                        <img src={ Star } alt="" />
                        <img src={ Star } alt="" />
                    </div>
                    <p className={styles.Comment_text}>I love this shit so much this makes me wanna kill myself!!!</p>
                </div>
            </div>
        </div>
    )
}
export default Comment;
