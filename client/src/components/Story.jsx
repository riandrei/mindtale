import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Story.module.css';

import Choices from '../components/Choices';
import Recommend from '../components/Recommend';

import Sample1 from '../assets/sample1.png';
import Art from '../assets/artwork11.jpg';
import Back from '../assets/back.png';
import Menu from '../assets/menuu.png';


export function Story({ openNav, handleNavClick }) {
    


    return (
        <div className={styles.Story}>
            <div className={styles.Top}>
                <img  src={Back} />
                {
                    openNav && <img onClick={handleNavClick} src={Menu} />
                }
            </div>
            <h1 className={styles.Main_title}>Prologue: Where it All Started</h1>
            <img src={Sample1} />
            <p>Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. </p>
            <p>
                Est velit officiis et sint libero a nisi eius ut quos omnis hic voluptatum odio qui molestias saepe. Ea magnam maxime ab dicta tempora eum amet consequatur sit rerum nulla. Est distinctio quis qui sunt rerum vel veniam nemo et eveniet quam ea beatae consequatur non nobis asperiores. Ut esse modi ut repudiandae iste in doloremque fugit.
            </p>
            <p>Est eius exercitationem in incidunt tempore ea atque odit non tenetur corrupti ut nostrum voluptatem ut rerum eius?</p>
            <Choices />
            <img src={Sample1} />
            <p>Lorem ipsum dolor sit amet. 33 nihil internos ut omnis quia nam fuga natus aut ratione incidunt. Qui fugit eius in dolorum dicta ab excepturi natus non dolorum voluptatem hic tempora quod et architecto dignissimos quo quia possimus. </p>
            <p>
                Est velit officiis et sint libero a nisi eius ut quos omnis hic voluptatum odio qui molestias saepe. Ea magnam maxime ab dicta tempora eum amet consequatur sit rerum nulla. Est distinctio quis qui sunt rerum vel veniam nemo et eveniet quam ea beatae consequatur non nobis asperiores. Ut esse modi ut repudiandae iste in doloremque fugit.
            </p>
            <p>Est eius exercitationem in incidunt tempore ea atque odit non tenetur corrupti ut nostrum voluptatem ut rerum eius?</p>
            <Choices />

            <div className={styles.Next}>
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
            </div>

        </div>
    );
}


export default Story;
