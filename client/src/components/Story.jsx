import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Story.module.css';

import Choices from '../components/Choices';
import Recommend from '../components/Recommend';

import Sample1 from '../assets/photocard1.png';
import Art from '../assets/artwork11.jpg';
import Back from '../assets/back.png';
import Menu from '../assets/menuu.png';


export function Story({ isLight, fontSize, handleIncraseFontSize, handleDecreaseFontSize  }) {
    


    return (
        <div className={styles.Story}>
            <img className={styles.Picture} src={Sample1} />
            <div className={styles.Story_inner}>
                {
                    !isLight && <p className={` ${fontSize === 1 ? styles.Text: ''} ${fontSize === 2 ? styles.Text2 : ''} ${fontSize == 3 ? styles.Text3 : ''}`}>
                    Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus.Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. 
                </p>
                }

                {
                    isLight && <p className={`${styles.Dark} ${fontSize === 1 ? styles.Text: ''} ${fontSize === 2 ? styles.Text2 : ''} ${fontSize == 3 ? styles.Text3 : ''}`}>
                    Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus.Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. 
                </p>
                }
                <Choices />
            </div>

        </div>
    );
}


export default Story;
