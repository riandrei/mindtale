import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Signin.module.css'

import Google from '../assets/google.png'
import Facebook from '../assets/fb.png'
import Logo from '../assets/mindtale.png'
import Wrong from '../assets/remove.png'

function Signin() {
    const [createEmail, setCreateEmail] = useState('')
    const handleCreateEmail = (e) => {
        setCreateEmail(e.target.value)
    }

    const [createPassword, setCreatePassword] = useState('')
    const handleCreatePassword = (e) => {
        setCreatePassword(e.target.value)
    }

    const [confirmPassword, setConfirmPassword] = useState('')
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    //if they agree to terms and policy shits
    const [isAgree, setIsAgree] = useState(false)
    const handleAgreeClick = (e) => {
        setIsAgree(e.target.checked)
    }

    //para makita kung lahat ng inputs and checkbox may value else hindi clickable yung submit button
    const isDisabled = createEmail === '' || createPassword === '' || (confirmPassword === '' || !isAgree);

    const isPasswordMatch = createPassword === confirmPassword;
    const [notMatch, setNotMatch] = useState(false);
    const [shortPassword, setShortPassword] = useState(false)

    const handleSubmitClick = () => {
        if (!isPasswordMatch) {
            setNotMatch(!notMatch);

        } if(isPasswordMatch) {
            if(createPassword.length < 7){
                setShortPassword(!shortPassword)
            }
            else{
                setNotMatch(false);
                alert("Login successfully");
            }
        }
    };

    return (
        <div className={ styles.Signin }>
            <div className={ styles.extra}></div>


            <div className={ styles.middle }>
                <h2>Create an account</h2>
                <div className={ styles.socials }>
                    <div className={ styles.google }>
                        <img src={ Google }/>
                        <p>Sign up with Google</p>
                    </div>
                    <div className={ styles.facebook }>
                        <img src={ Facebook }/>
                        <p>Sign up with Facebook</p>
                    </div>
                </div>

                <div className={ styles.or }>
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                <div className={ styles.inputs }>
                    <input value={ createEmail } onChange={ handleCreateEmail } type="text" placeholder='Sign up your email'/>
                    <input value={ createPassword } onChange={ handleCreatePassword }  type="password" placeholder='Sign up your password'/>
                    <input value={confirmPassword } onChange={ handleConfirmPassword } type="password" placeholder='Confirm your password'/>
                </div>
                <div className={ styles.terms_container }>
                    <input type="checkbox" checked={ isAgree } onChange={ handleAgreeClick }/>
                    <p>I agree to the <Link className={ styles.terms }>terms and conditions</Link> </p>
                </div>

                {/* hindi clickable yung submit button unless nasatisfy niya yung requirements */}
                <div className={ styles.already }>
                    <button onClick={ handleSubmitClick } style={{ pointerEvents: isDisabled && 'none',filter: isDisabled && "brightness(.5)"}}>Create account</button>
                    <p>Already have an account? <Link to="/Homepage" className={ styles.link }>Log in</Link></p>
                </div>
                <p className={ styles.arrow }>ARROW FUNK-TION</p>
            </div>


            <div className={ styles.bottom }>
                <h1>CREATE ACCOUNT</h1>
                <p>Gamified Interactive Stories Powered by AI</p>
            </div>
            <img className={ styles.logo } src={ Logo } alt="" />

            {/* Pop up either masyadong maikli password ng user( <7 ) o hindi nagmamatch yung password sa confirm pass */}
            {
                notMatch && (
                    <div className={ styles.wrong }>
                        <img src={ Wrong }/>
                        <p>Passwords don't match. Try again!</p>
                    </div> 
                )
            }

            {
                shortPassword && (
                    <div className={ styles.wrong }>
                        <img src={ Wrong }/>
                        <p>Password too short. Try again!</p>
                    </div> 
                )
            }




            
        </div>
    )
}

export default Signin
