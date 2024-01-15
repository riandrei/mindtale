import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Login.module.css'

import Open from '../assets/openeye.png';
import Close from '../assets/closeeye.png';
import FB from '../assets/fb.png'
import Google from '../assets/google.png'
import Logo from '../assets/mindtale.png'
import Wrong from '../assets/remove.png'

function Login() {

    //pang reveal password
    const [isShowPass, setIsShowPass] = useState(false);
    const handleShowClick = () => {
        setIsShowPass( !isShowPass )
    }

    //alam mo na to
    const [email, setEmail] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    //Pang pop up sa "log in with google/facebook" text since logo lang nilagay ko 
    const [hoveredButton, setHoveredButton] = useState(null);
    const handleMouseOver = (button) => {
      setHoveredButton(button);
    };
  
    const handleMouseOut = () => {
      setHoveredButton(null);
    };


    // pang catch kapag mali credentials ng user di ko alam pano mo siya maaapply sayo
    const [wrongAcc, setWrongAcc] = useState(false);
    const handleWrongClick = () => {
        setWrongAcc( !wrongAcc );
        console.log("hello")
    }
    return (
        <div className={ styles.Login }>
            <div className={ styles.inputs }>
                <div className={ styles.email }>
                    <input maxLength={35} type="email" placeholder='Email address' 
                    value={email}
                    onChange={handleEmailChange}
                    />
                    <p className={  `${styles.usog} ${styles.usoggg}`}>Don't have an account? <Link to="/Signin" className={ styles.link }>Sign up</Link></p>
                </div>

                <div className={ styles.password }>
                    <div className={ styles.show }>
                    <input
                            maxLength={25}
                            type={isShowPass ? "text": "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                    />

                    {/*toggle to para sa image ng close/open na mata kapag nirereveal yung password */}
                    {password ?(
                        <img onClick={handleShowClick} src={isShowPass ? Open : Close} />
                    ) : (
                        <img style={{visibility:"hidden"}} onClick={handleShowClick} src={isShowPass ? Close : Open} />
                    )}
                    </div>
                    <Link className={ `${styles.link} ${styles.usog}` }>Forgot password?</Link>
                </div>
                <button
                    // onClick para sa kapag mali cred ng user di ko knows pano mo siya ibahin kapag may backed na
                    //Hindi clickable yung submit button unless meron na values both inputs and yung password meron na dapat 7 characters
                    onClick={handleWrongClick}
                    style={
                        password === '' || password.length < 7 || email === ''
                        ? { pointerEvents: 'none', filter:"brightness(.5)" }
                        : {}
                    }
                    type='submit'
                    >
                    Log in
                </button>
                <p className={ styles.usogg}>Don't have an account? <Link to="/Signin" className={ styles.link }>Sign up</Link></p>
            </div>

            <div className={ styles.bottom }>
                <div className={ styles.title }>
                    <h1>MINDTALE</h1>
                    <p>Gamified Interactive Stories Powered by AI</p>
                </div>

                <div className={ styles.socials }>
                    <img className={ styles.logo} src={ Logo } alt="" />
                    <div className={ styles.media } >
                    <div className={styles.sign}>
                        <span style={{ visibility: hoveredButton === 'facebook' ? 'visible' : 'hidden' }}>Log in with Facebook</span>
                        <img
                        loading="lazy"
                        onMouseOver={() => handleMouseOver('facebook')}
                        onMouseOut={handleMouseOut}
                        src={FB}
                        />
                    </div>

                    <div className={styles.sign}>
                        <span style={{ visibility: hoveredButton === 'google' ? 'visible' : 'hidden' }}>Log in with Google <span></span></span>
                        <img
                        loading="lazy"
                        onMouseOver={() => handleMouseOver('google')}
                        onMouseOut={handleMouseOut}
                        src={Google}
                        />
                    </div>


                        
                    </div>
                </div>
            </div>

            {
                wrongAcc && (
                    <div className={styles.catch}>
                    <img src={ Wrong }/>
                    <p>Incorrect login details, please verify and try again</p>
                        
                </div>
                )
            }
        </div>
    )
}

export default Login
