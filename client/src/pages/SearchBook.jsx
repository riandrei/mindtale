import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../css/SearchBook.module.css'

import Back from '../assets/back.png'
import Story1 from '../assets/artwork7.jpg'

import SpecificStory from '../components/SpecificStory'

export function SearchBook(props) {
    
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className={styles.SearchBook}>
            <div className={styles.Top}>
                <img src={Back} onClick={goBack} />
                <input type="text" placeholder='Search bookworms...'/>
                <button>Search</button>
            </div>
            <div className={styles.Stories_con}>
                <SpecificStory title="Magic and Mascles" image={Story1}/>
            </div>
        </div>
    )
}

export default SearchBook;
