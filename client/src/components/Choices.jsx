import React, {useState} from 'react'
import styles from '../css/Choices.module.css'

export function Choices(props) {
    const [selectedButton, setSelectedButton] = useState(null);

    function handleClick(index) {
        setSelectedButton(index);
    }

    return (
        <div className={styles.Choices}>
            <button
                onClick={() => handleClick(1)}
                style={{ backgroundColor: selectedButton === 1 ? '#2395A5' : '' }}
            >Drive at the gas station</button>
            <button
                onClick={() => handleClick(2)}
                style={{ backgroundColor: selectedButton === 2 ? '#2395A5' : '' }}
            >Take a break at the Beach</button>
            <button
                onClick={() => handleClick(3)}
                style={{ backgroundColor: selectedButton === 3 ? '#2395A5' : '' }}
            >Sleep in the Car</button>
            <button
                onClick={() => handleClick(4)}
                style={{ backgroundColor: selectedButton === 4 ? '#2395A5' : '' }}
            >Play mobile games</button>
        </div>
    )
}

export default Choices;
