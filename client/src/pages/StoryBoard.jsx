import React, {useState} from 'react'
import styles from '../css/StoryBoard.module.css'

import Back from '../assets/back.png'
import Theme from '../assets/themes.png'
import Dark from '../assets/dark.png'
import Sample1 from '../assets/sample1.png'

import Footer from '../components/Footer'
import { Choices } from '../components/Choices'


export function StoryBoard(props) {
    

    return (
        <div className={styles.StoryBoard} >
            <div>
                <div className={styles.StoryBoard_top}>
                    <img src={Back} />
                    <div className={styles.StoryBoard_left}>
                        <button >A+</button>
                        <button>A-</button>
                        <img src={Theme} />
                    </div>
                </div>
                <div className={styles.Main_Story}>
                    <h1>Prologue: To Where it All Started</h1>
                    <img className={styles.Illustration} src={Sample1} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi atque dolore expedita obcaecati nostrum fugiat id aut quidem aliquam perferendis! Error sapiente et quo qui, vel unde impedit optio blanditiis eveniet officiis nam dolores natus nulla illum ratione similique eum ut ea, eaque voluptas voluptatem at asperiores fugit! Voluptas exercitationem hic vitae, repudiandae tenetur deleniti veniam facilis ea rerum doloribus harum ipsam commodi amet, mollitia libero culpa esse delectus ducimus iusto ipsa autem minima temporibus. Dicta consequuntur iste recusandae quidem deserunt voluptatem suscipit distinctio praesentium, alias, nesciunt, nulla ullam nobis possimus amet placeat similique atque ipsam aliquam repudiandae soluta velit?</p>
                    <Choices />   
                    <div className={styles.Next}>
                        <button className={styles.Prev}><img src={Back} />Previous chapter</button>
                        <button className={styles.Nextt}><img src={Back} /> Next chapter</button>
                    </div>             
                </div>
            </div>
            <Footer />
        </div>
    )
}
