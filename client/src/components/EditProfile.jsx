import React, {useState} from 'react'
import styles from '../css/SettingComponents.module.css'

import User from '../assets/Dowelle.jpg'

export function EditProfile(props) {
    const [name, setName] = useState("");
    
    const handleNameChange = (e) => {
        const newName = e.target.value;
        console.log(newName);
        setName(newName);
    };
    const [tag, setTag] = useState("#");
    
    const handleTagChange = (e) => {
        const newTag = e.target.value;
        setTag("#" + newTag.substring(1, 5));
    };

    return (
        <div className={styles.Main_container}>
            <div className={styles.Change_profile}>
                <img className={styles.User} src={User} />
                <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput"/>
                <label htmlFor="fileInput">Change Profile Picture</label>
            </div>

            <div className={styles.Change_name}>
                <div className={styles.User_name}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name" 
                        type="text" 
                        maxLength={15} 
                        value={name} 
                        onChange={handleNameChange} 
                        style={{ borderColor: name.length === 15 ? '#ff4f4f' : '' }}
                    />
                    <span className={name.length === 15 ? styles.Length2 : styles.Length}>{name.length}/15</span>
                </div>
                <div className={styles.User_tag}>
                    <label for="tag" htmlFor="Name:">Tag:</label>
                    <input 
                        maxLength={5} 
                        id="tag" 
                        type="text"
                        value={tag} 
                        onChange={handleTagChange}  
                        style={{ borderColor: tag.length === 5 ? '#ff4f4f' : '' }}
                    />
                    <span className={tag.length === 5 ? styles.Length2 : styles.Length}>{tag.length - 1}/4</span>
                </div>
            </div>

            <div className={styles.Change_bio}>
                <label for="Bio" htmlFor="">Bio:</label>
                <textarea id="Bio" cols="10" rows="5"></textarea>
            </div>
        </div>
    )
}

export default EditProfile;
