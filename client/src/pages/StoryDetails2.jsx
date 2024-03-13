import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Comment from '../components/Comment';
import styles from '../css/StoryDetails.module.css';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import Story from '../assets/artwork4.jpg';
import View from '../assets/view.png';
import Invite from '../assets/invite.png';
import Save from '../assets/save.png';
import Star from '../assets/star.png';
import Back from '../assets/previous.png';
import User from '../assets/Dowelle.jpg';
import Sort from '../assets/sort.png';

export function StoryDetails() {
  const [maxLength, setMaxLength] = useState(window.innerWidth <= 431 ? 100 : 50);
  const fullText = "Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny. Black Torch unfolds the journey of Jiro, a reluctant wielder of enigmatic powers, navigating the blurred realm between humans and supernatural beings. Fueled by captivating discoveries and lurking dangers, Jiro's tale explores the delicate balance of coexistence. Faced with unforeseen challenges, he grapples with identity, friendship, and the intricate threads connecting his world to the mystical forces that shape his destiny.";
  
  useEffect(() => {
    const handleResize = () => {
      setMaxLength(window.innerWidth <= 1023 ? 375 : 600);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncatedText = fullText.substring(0, maxLength);
  const [isRead, useIsRead] = useState(true);

  const handleReadClick = () => {
    useIsRead(false);
    setTimeout(() => {
      window.location.href = "/LoadingScreen";
    }, 500);
  };

  return (
    <div className={isRead ? styles.Story_details : styles.Story_details2}>
      <Nav />
      <TopBar />
      <div className={styles.Details_top}>
        <div className={styles.Details_left}>
          <img className={styles.main_pic} src={Story} />
          <div className={styles.Details_buttons}>
            <button onClick={handleReadClick}>
              <Link className={styles.read}>
                &#9658;<span>Read</span>
              </Link>
            </button>
            <button>
              <img src={Invite} alt="" />
              Invite
            </button>
          </div>
        </div>
        <div className={styles.Details_right}>
          <div className={styles.Story_top}>
            <img src={Back} className={styles.back} alt="" />
            <div className={styles.Story_title}>
              <h1>BLACKTORCH</h1>
              <p>Mystery | Thriller</p>
              <div className={styles.Star_container}>
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <img src={Star} alt="" />
                <span>(4.6 Ratings)</span>
              </div>
            </div>
            <img className={styles.save} src={Save} alt="" />
          </div>
          <div className={styles.Synopsis}>
            <h2>Synopsis</h2>
            <div className={styles.Truncated}>{truncatedText}<span className={styles.text}>...</span></div>
          </div>
          {/* <div className={styles.Views}>
            <span>2.1k Reads</span>
            <img src={View} alt="" />
          </div> */}
        </div>
      </div>
      <div className={styles.comment_text}>
        <h3>Comments</h3>
        <div className={styles.Sort}>
          <img src={Sort} alt="" />
          <span label="sort">Sort by</span>
          <select name="sort" id="sort" for="sort">
            <option value="">Newest</option>
            <option value="">Oldest</option>
          </select>
        </div>
      </div>
      <div className={styles.Details_bottom}>
        <img src={User} alt="" />
        <div className={styles.input_comment}>
          <input maxLength={50} type="text" placeholder=" Write your review for this book!" />
          <button>Submit</button>
        </div>
      </div>
      <h3 className={styles.Review}>Reviews <span>(289)</span></h3>
      <div className={styles.Actual_comments}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <Footer />
    </div>
  );
}

export default StoryDetails;
