import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Story.module.css';

import Choices from '../components/Choices';
import Recommend from '../components/Recommend';

import Sample1 from '../assets/photocard1.png';
import Art from '../assets/artwork11.jpg';
import Back from '../assets/back.png';
import Menu from '../assets/menuu.png';


export function Story({ openNav, handleNavClick, isLight }) {
    


    return (
        <div className={styles.Story}>
            <img className={styles.Picture} src={Sample1} />
            <div className={styles.Story_inner}>
                <p className={isLight?styles.Text2:styles.Text}>Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus.Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. </p>
                <Choices />
            </div>

            {/* <div className={styles.Next}>
                <Link className={styles.Prev}>Previous</Link>
                <Link className={styles.Prev}>Next</Link>
            </div>
            <div className={styles.StoryBoard_recommend}>
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
                <Recommend photo={Art} genre="Mystery" title="Naruto Shipddpuden" />
            </div> */}

        </div>
    );
}


export default Story;
