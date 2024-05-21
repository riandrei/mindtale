import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ViewAll.module.css'

import Back from '../assets/back.png'
import Sample from '../assets/goth.jpg'

import SpecificStory from '../components/SpecificStory';

export const ViewAll = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }

    return(
        <div className={styles.ViewAll}>
            <div className={styles.Back_con}>
                <img onClick={goBack} src={Back} />
            </div>
            <div className={styles.Stories}>
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
                <SpecificStory image={Sample} title="Goth Girl" />
            </div>
        </div>
    )
}

export default ViewAll;