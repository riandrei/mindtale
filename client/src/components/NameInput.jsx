import React from 'react'
import styles from '../css/NameInput.module.css'

export function NameInput(props) {
    

    return (
        <div className={styles.NameInput}>
            <div className={styles.GetName}>
                <h2>Enter your name:</h2>
                <input type="text" maxLength={15}/>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default NameInput;
