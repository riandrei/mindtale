import { useSelector, useDispatch } from "react-redux";

import { deleteStory } from "../actions/storyActions";

import styles from "../css/StoryModal.module.css";

const StoryModal = ({ activeStory, toggleStoryModal }) => {
  const dispatch = useDispatch();

  const averageScores = useSelector((state) => state.auth.averageScores);
  const bookmarkCounts = useSelector((state) => state.auth.bookmarkCounts);
  const visitCounts = useSelector((state) => state.auth.visitCounts);

  const handleDeleteClick = () => {
    dispatch(deleteStory(activeStory._id));
    toggleStoryModal(null);
  };

  return (
    <div className={styles.Modal}>
      <div className={styles.LeftDiv}>
        <img
          src={activeStory?.imgURL}
          alt="story cover photo"
          className={styles.CoverPicture}
        />
        <div className={styles.StoryDetails}>
          <h2>{activeStory?.title}</h2>
          <div className={styles.StoryData}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#ffffff"
                width="30"
                height="30"
              >
                <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
              </svg>
              <p>
                {`Total Views: ${
                  visitCounts.find((story) => story._id === activeStory?._id)
                    ?.visitCount || 0
                }`}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="30"
                height="30"
              >
                <path
                  fill="#ffffff"
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                />
              </svg>
              <p>
                {`Average Assesment Score: ${
                  averageScores.find((story) => story._id === activeStory?._id)
                    ?.averageScore || 0
                }`}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="#ffffff"
                width="30"
                height="30"
              >
                <path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z" />
              </svg>
              <p>{`Total Bookmarks: ${
                bookmarkCounts.find((story) => story._id === activeStory?._id)
                  ?.bookmarkCount || 0
              }`}</p>
            </div>
          </div>
          <div className={styles.DeleteButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="#ff0000"
              width="30"
              height="30"
              onClick={handleDeleteClick}
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.RightDiv}>
        <div>
          <h2>Summary: </h2>
          <button onClick={() => toggleStoryModal(null)}>X</button>
        </div>
        <p>{activeStory?.synopsis.slice(0, 463) + "..."}</p>
      </div>
    </div>
  );
};

export default StoryModal;
