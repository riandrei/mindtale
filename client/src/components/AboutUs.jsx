import styles from '../css/AboutUs.module.css'
import Close from '../assets/close.png'

const AboutUs = ({handleAboutClick, aboutClose}) => {
    return(
        <div className={styles.AboutUs}>
            <div className={styles.Top}>
                <div></div>
                <div className={styles.Top_inner}>
                    <span>ABOUT MINDTALE</span>
                    <span>“Transforming screentime into learning time.”</span>
                </div>
                <img src={Close} onClick={handleAboutClick} />
            </div>

            <div className={styles.Middle}>
                <div className={styles.Box}>
                    <span>Our Mission</span>
                    <span>Helping students improve reading skills through fun, interactive learning.</span>
                </div>

                <div className={styles.Box}>
                    <span>What We Do?</span>
                    <span>Gamified stories that adapt to choices, tracking student progress.</span>
                </div>

                <div className={styles.Box}>
                    <span>How it Works?</span>
                    <span>AI-generated stories with multiple outcomes, encouraging critical thinking.</span>
                </div>

                <div className={styles.Box}>
                    <span>Why it Maatters?</span>
                    <span>Improving reading comprehension to empower students for academic success.</span>
                </div>

            </div>

            <div className={styles.Bottom}>
                <span>Join Us on this Journey!</span>
                <span>At MindTale, we believe every student deserves the chance to thrive in reading. Our platform turns traditional exercises into engaging adventures, fostering a love for reading that lasts. Together, we can unlock every learner's potential and build a brighter future through improved literacy skills!</span>
            </div>
        </div>
    )
}

export default AboutUs;