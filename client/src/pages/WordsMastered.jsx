import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWordsStats } from "../actions/authActions";
import styles from "../css/WordsMastered.module.css";

const WordsMastered = () => {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.auth?.wordsStats);
  const [sortedWords, setSortedWords] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to ascending order
  const [sortCriterion, setSortCriterion] = useState("timesEncountered"); // Default to alphabetical
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState(0); // Filter threshold for times encountered

  useEffect(() => {
    dispatch(getWordsStats());
  }, [dispatch]);

  useEffect(() => {
    if (words) {
      const filteredWords = words.filter(
        (word) =>
          word.word.toLowerCase().includes(searchQuery.toLowerCase()) &&
          word.timesEncountered >= filterValue
      );

      const sorted = [...filteredWords].sort((a, b) => {
        if (sortCriterion === "alphabetical") {
          return sortOrder === "asc"
            ? a.word.localeCompare(b.word)
            : b.word.localeCompare(a.word);
        }
        if (sortCriterion === "timesEncountered") {
          return sortOrder === "asc"
            ? a.timesEncountered - b.timesEncountered
            : b.timesEncountered - a.timesEncountered;
        }
        return 0;
      });

      setSortedWords(sorted);
    }
  }, [words, sortOrder, sortCriterion, searchQuery, filterValue]);

  const handleSortChange = (e) => {
    const [criterion, order] = e.target.value.split("-");
    setSortCriterion(criterion);
    setSortOrder(order);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(Number(e.target.value));
  };

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.label}>
          <div className={styles.anotherlabel}>
            <p>Sort by:</p>
            <p>Search:</p>
            <p>Filter by Interactions</p>
          </div>
        </div>
        <div className={styles.anothercontrols}>

        <select
          value={`${sortCriterion}-${sortOrder}`}
          onChange={handleSortChange}
          className={styles.sortDropdown}
        >
          <option value="alphabetical-asc">Alphabetical (A-Z)</option>
          <option value="alphabetical-desc">Alphabetical (Z-A)</option>
          <option value="timesEncountered-asc">Times Encountered (Low to High)</option>
          <option value="timesEncountered-desc">Times Encountered (High to Low)</option>
        </select>
        <input
          type="text"
          placeholder="Search words..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <input
          type="number"
          placeholder="Min Times Encountered"
          value={filterValue}
          onChange={handleFilterChange}
          className={styles.filterInput}
          min={0}
        />

        </div>
      </div>
      <div className={styles.wordsContainer}>
        {sortedWords.map((wordData, index) => (
          <div className={styles.wordCard} key={index}>
            <h3 className={styles.word}>{wordData.word}</h3>
            <p><strong>Times Encountered:</strong> {wordData.timesEncountered}</p>
            <p><strong>Interactions:</strong> {wordData.interactions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsMastered;
