import React from 'react';
import styles from '../css/Intro.module.css'

import Metrics from '../components/Metrics'

export const About = () => {
    return (
        <div>
            <div className={styles.Intro}>
                <h1>Introduction:</h1> {/*Bio */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius unde recusandae maiores ipsa pariatur accusamus, obcaecati animi amet nobis deserunt nihil, facilis, sit ratione explicabo. Repellat libero accusantium debitis facilis natus nemo veniam ad molestias, ab, exercitationem facere temporibus tempore quas totam esse. Natus velit placeat voluptates tenetur quo quasi suscipit, ea ullam, atque, quod reprehenderit voluptatibus impedit! Beatae inventore aliquam rem nam, voluptate hic ea maxime eius vel sed eaque porro eveniet atque minus?</p>
            </div>
            <div className={styles.Metrics}>
                <Metrics Metric_name="Books Finished" Metric_value="23" />
                <Metrics Metric_name="Avg. Assessment Score" Metric_value="55.56%"/>
                <Metrics Metric_name="Daily Read Streak" Metric_value="3"/>
                <Metrics Metric_name="Avg. Reading Duration" Metric_value="5:26 mins"/>
                <Metrics Metric_name="Most Read Genre" Metric_value="Mysteries" />
                <Metrics />
                <Metrics />
                <Metrics />
                <Metrics />
            </div>
        </div>
    );
};

export default About;
