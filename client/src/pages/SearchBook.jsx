import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../css/SearchBook.module.css'

import Back from '../assets/back.png'
import Story1 from '../assets/artwork7.jpg'

import SpecificStory from '../components/SpecificStory'

export function SearchBook({props, searchBook, handleBookSearch}) {
    
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
    }

    const [noBook, setNoBook] = useState(false);
    const handleSearch = () => {
        setNoBook( !noBook)
    }

    return (
        <div className={styles.SearchBook}>
            <div className={styles.Top}>
                <img src={Back} onClick={goBack} />
                <input onChange={handleBookSearch} type="text" placeholder='Search bookworms...'/>
                <button>Search</button>
            </div>
            <div className={styles.Stories_con}>
                <SpecificStory title="Magic and Mascles" image={Story1} genre="Drama"/>
                <SpecificStory title="Magic and Mascles" image={Story1} genre="Drama"/>
                <SpecificStory title="Magic and Mascles" image={Story1} genre="Drama"/>


                {/* popup if wala yung book na hinahanap niya */}
                {
                    noBook && <h1 className={styles.Oops}>Looks like the book you are looking for doesn't exist...</h1>
                }
                
            </div>
            {console.log(searchBook)}
        </div>
    )
}

export default SearchBook;
