import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../css/SearchBook.module.css";

import { getStories } from "../actions/storyActions";

import Back from "../assets/back.png";
import Story1 from "../assets/artwork7.jpg";

import SpecificStory from "../components/SpecificStory";

function SearchBook({ getStories }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const stories = useSelector((state) => state.story.stories);

  const [searchBook, setSearchBook] = useState(
    `${localStorage.getItem("searchBook")}`
  );

  const handleSearchValueChange = (e) => {
    setSearchBook(e.target.value);
  };

  const [filteredStories, setFilteredStories] = useState([]);

  const handleSearch = () => {
    const newFilteredStories = stories.filter(({ title }) => {
      return title.toLowerCase().includes(searchBook.toLowerCase());
    });

    setFilteredStories(newFilteredStories);
  };

  useEffect(() => {
    if (stories.length === 0) {
      getStories();
    }
  }, []);

  return (
    <div className={styles.SearchBook}>
      <div className={styles.Top}>
        <img src={Back} onClick={goBack} />
        <input
          onChange={handleSearchValueChange}
          type="text"
          placeholder="Search bookworms..."
          value={searchBook}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.Stories_con}>
        {filteredStories?.length > 0 ? (
          filteredStories?.map((story) => (
            <SpecificStory
              key={story._id}
              title={story?.title}
              imgURL={story?.imgURL}
              tags={story?.tags}
              id={story?._id}
            />
          ))
        ) : (
          <h1 className={styles.Oops}>
            Looks like the book you are looking for doesn't exist...
          </h1>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = { getStories };

export default connect(null, mapDispatchToProps)(SearchBook);
