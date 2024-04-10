import React, { useState } from "react";
import { connect, useSelector } from "react-redux";

import { deleteReview } from "../actions/storyActions";

import styles from "../css/Comment.module.css";
import User from "../assets/Dowelle.jpg";
import Star from "../assets/star.png";
import Trash from "../assets/trash-can.png";
import TrashOpen from "../assets/trash-can-open.png";
import Close from "../assets/close.png";

export function Comment({ storyId, review, deleteReview }) {
  const user = useSelector((state) => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteClick = () => {
    deleteReview(storyId);
  };

  return (
    <div className={styles.Comment}>
      {/* <h2>Reviews</h2> */}
      <div className={styles.Comment_container}>
        <img className={styles.User} src={review.userImg} />
        <div className={styles.Comment_details}>
          <div className={styles.Comment_name}>
            <h3>{review.userName}</h3>
            <p>{review.dateAdded.slice(0, 10)}</p>
            {user.id === review.userId ? (
              <img onClick={handleEditClick} src={isEdit ? TrashOpen : Trash} />
            ) : null}
            {isEdit && (
              <div className={styles.edit_button}>
                <div className={styles.edit_inner}>
                  <span>Are you sure?</span>
                  <img
                    className={styles.close}
                    src={Close}
                    onClick={handleEditClick}
                  />
                </div>
                <button onClick={handleDeleteClick}>Delete comment</button>
              </div>
            )}
          </div>
          <div className={styles.Star_container}>
            <img src={Star} alt="" />
            <img src={Star} alt="" />
            <img src={Star} alt="" />
            <img src={Star} alt="" />
          </div>
          <p className={styles.Comment_text}>{review.reviewText}</p>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  deleteReview,
};

export default connect(null, mapDispatchToProps)(Comment);
