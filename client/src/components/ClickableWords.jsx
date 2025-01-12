import styles from "../css/ClickableWords.module.css"

const ClickableWords = ({handleWordClick, currentNarrative}) => {
    const renderParagraph = () =>
        currentNarrative.split(" ").map((word, index) => (
          <span
            key={index}
            onClick={() => handleWordClick(word)}
            style={{ cursor: "pointer", marginRight: "5px" }}
            className={styles.SpanUnderline}
          >
            {word}
          </span>
        ));

    return <>{renderParagraph()}</>
}

export default ClickableWords