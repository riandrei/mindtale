import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

import Nav from '../components/Nav';
import NameTag from '../components/NameTag';
import Notification from '../components/Notification';
import GemContainer from '../components/GemContainer';

import Search from '../assets/search.png';

import styles from '../css/TopBar.module.css';

export function TopBar(props) {
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate('/SearchBook');
        }
    };

    const [searchBook, setSearchBook] = useState('');
    const handleSearchBook = (e) => {
        setSearchBook(e.target.value)
    }

    return (
        <div className={styles.TopBar}>
            <div className={styles.TopBar_inner}>
                <NameTag />
                <Notification />
            </div>
            <div className={styles.TopInput}>
                <img src={Search} alt="" />
                <input onChange={handleSearchBook} maxLength={30} type="text" placeholder="Search story..." onKeyPress={handleKeyPress} />
            </div>
        </div>
    );
}

export default TopBar;
