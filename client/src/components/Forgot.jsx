import React,{useState} from 'react'
import styles from '../css/Forgot.module.css'

import Close from '../assets/close.png'


export function Forgot({handleForgotClick}) {
    const [isSentPass, useIsSetPass] = useState(false)
    const handleSentClick = () => {
        useIsSetPass( !isSentPass)
    }

    const [isNext, useIsNext] = useState(1);
    const handleAddClick = () => {
        useIsNext( isNext + 1)
    }

    const [isNewPass, setIsNewPass] = useState('')
    const handleNewPass = (e) => {
        setIsNewPass(e.target.value)
    }
    const [isConfirmNewPass, setIsConfirmNewPass] = useState('')
    const handleConfirmPass = (e) => {
        setIsConfirmNewPass(e.target.value)
    }

    const passMatch = isNewPass === isConfirmNewPass;

    const [isMatch, setIsMatch] = useState(false);
    const [isShortPass, setIsShortPass] = useState(false);
    
    const handleUpdateClick = () => {
        if (passMatch && isNewPass.length >= 6) {
            alert("edi wao");
        } else {
            if (!passMatch) {
                setIsMatch(!isMatch);
            }
            if (isNewPass.length < 6) {
                setIsShortPass(!isShortPass);
            }
        }
    };
    
    return (
        <div className={styles.Forgot}>
            <div className={styles.Forgot_inner}>
                <div className={styles.Close}>
                    <h1>Forgot password</h1>
                    <img src={Close} onClick={handleForgotClick} />
                </div>
                    {isNext === 1 && (
                            <div className={styles.Inputs}>
                                <input type="email" placeholder='Enter your email address' />
                                <button onClick={handleAddClick}>Send password reset email</button>
                            </div>
                    )}
                    {isNext === 2 && (
                        <div className={styles.Inputs}>
                            <input type="text" placeholder='Enter your the verification code' />
                            <p className={styles.Check}>Check your email for a password reset link to regain access and update your password.</p>
                            <button onClick={handleAddClick}>Reset Password</button>
                        </div>
                    )}
                    {isNext === 3 && (
                        <div className={styles.Inputs}>
                            <input value={isNewPass} onChange={handleNewPass} type="password" placeholder='Enter your new password' />
                            <input value={isConfirmNewPass} onChange={handleConfirmPass} type="password" placeholder='Confirm your new password' />
                            {
                                isMatch && <p className={styles.warning}>Password doesn't match</p>
                            }
                                                        {
                                isShortPass && <p className={styles.warning}>Password must be at least 7 characters</p>
                            }
                            <button onClick={handleUpdateClick}>Update password</button>
                        </div>
                    )}
            </div>
        </div>
    )
}
