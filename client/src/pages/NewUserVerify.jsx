import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/NewUserVerify.module.css'

import Back from '../assets/back.png'

export default function NewUserVerify(props) {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const [isMatch, setIsMatch] = useState(false)
    const handleMatchClick = () => {
        setIsMatch( !isMatch )
    }
    return (
        <div className={styles.NewUserVerify}>
            <div className={styles.Verification}>
                <div className={styles.Back}>
                    <img onClick={goBack} className={styles.back} src={Back} />
                    <h2>Account verification</h2>
                </div>
                <input type="text" placeholder='Enter the verification code' />
                {
                    isMatch && (
                        <p className={styles.Wrong}>
                            The verification code does not match
                        </p>
                    )
                }
                <p>We've sent a verification code to your email; if not received, click 'Resend’.</p>
                <div className={styles.Buttons}>
                    <button onClick={handleMatchClick}>Submit</button>
                    <button>Resend</button>
                </div>
            </div>
        </div>
    )
}
