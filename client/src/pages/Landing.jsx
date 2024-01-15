import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../css/Landing.module.css'
import left from '../assets/line-left.svg'
import right from '../assets/line-right.svg'

function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
      const redirectTimeout = setTimeout(() => {
        navigate('/Login');
      }, 12000); 
  
      return () => clearTimeout(redirectTimeout);
    }, [navigate]);
    return (
        <div className={ styles.Landing}>

            <section className={ styles.main}>
                <img src={left} />
                <div className={ styles.top }>
                    <h1 className={ styles.title} style={{opacity:".6"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".7"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".8"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".9"}}>MINDTALE</h1>
                </div>
                <div className={styles.main_title}>
                    <h1>MIND</h1>
                    <h1>TALE</h1>
                </div>
                {/* <h1 className={ styles.main_title}>MINDTALE</h1> */}
                <div className={ styles.bottom }>
                    <h1 className={ styles.title} style={{opacity:".9"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".8"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".7"}}>MINDTALE</h1>
                    <h1 className={ styles.title} style={{opacity:".6"}}>MINDTALE</h1>
                </div>
                
                <div className={ styles.container}>
                    <div className={ styles.box }></div>
                    
                </div>
                <p>Loading...</p>
                <img className={ styles.right } src={right} />
            </section>
        </div>
    )
}

export default Landing
