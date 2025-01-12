import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../css/Start.module.css';
import { submitUserPreference } from "../actions/authActions";

const StoryPreference = () => {
    const [selectedGenres, setSelectedGenres] = useState([]); 

    const toggleGenre = (genre) => {
        const isSelected = selectedGenres.includes(genre);

        if (isSelected) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else if (selectedGenres.length < 5) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmitClick = () => {
        dispatch(submitUserPreference(selectedGenres, navigate))
    }

    return (
        <div className={styles.StoryPreference}>
            <div className={styles.Pick}>
                <h1>PICK YOUR INTEREST</h1>
                <span>AT LEAST 3</span>
            </div>

            <div className={styles.Genres}>
                <div
                    className={`${styles.Fable} ${
                        selectedGenres.includes("Fables") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Fables")}
                >
                    Fables
                </div>
                <div
                    className={`${styles.Mythology} ${
                        selectedGenres.includes("Mythology") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Mythology")}
                >
                    Mythology
                </div>
                <div
                    className={`${styles.FolkTale} ${
                        selectedGenres.includes("Folk Tale") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Folk Tale")}
                >
                    Folk Tale
                </div>
                <div
                    className={`${styles.Fantasy} ${
                        selectedGenres.includes("Fantasy") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Fantasy")}
                >
                    Fantasy
                </div>
                <div
                    className={`${styles.Adventure} ${
                        selectedGenres.includes("Adventure") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Adventure")}
                >
                    Adventure
                </div>
                <div
                    className={`${styles.Scifi} ${
                        selectedGenres.includes("Sci-Fi") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Sci-Fi")}
                >
                    Sci-Fi
                </div>
                <div
                    className={`${styles.Mystery} ${
                        selectedGenres.includes("Mystery") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Mystery")}
                >
                    Mystery
                </div>
                <div
                    className={`${styles.Thriller} ${
                        selectedGenres.includes("Thriller") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Thriller")}
                >
                    Thriller
                </div>
                <div
                    className={`${styles.Comedy} ${
                        selectedGenres.includes("Comedy") ? styles.Selected : ""
                    }`}
                    onClick={() => toggleGenre("Comedy")}
                >
                    Comedy
                </div>
                <button onClick={handleSubmitClick} className={selectedGenres.length <= 2 ? styles.Pickmore : ""}>GET STARTED</button>

            </div>
        </div>
    );
};

export default StoryPreference;
