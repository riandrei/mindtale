import { useState, useEffect } from "react";

const WordReadingScore = ({ passage, onContinue }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Initialize MediaRecorder when component mounts
    if (!navigator.mediaDevices) {
      alert("Your browser does not support audio recording.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        setRecorder(mediaRecorder);

        mediaRecorder.ondataavailable = async (event) => {
          const blob = new Blob([event.data], { type: "audio/wav" });
          const base64 = await convertBlobToBase64(blob);
          setAudioData(base64);
          setAudioURL(URL.createObjectURL(blob));
        };
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone.");
      });
  }, []);

  const startRecording = () => {
    if (recorder) {
      recorder.start();
      setIsRecording(true);
    } else {
      alert("Recorder is not ready yet.");
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const handleContinue = () => {
    if (!audioData) {
      alert("Please finish the recording before continuing.");
      return;
    }
    onContinue(audioData); // Pass the audio Blob to the next component
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract only the base64 string
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>Phil-IRI Reading Passage</h1>
      <p
        style={{ fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-line" }}
      >
        {passage}
      </p>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          margin: "20px",
          padding: "10px 20px",
          backgroundColor: isRecording ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <br />
      {audioURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Playback</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )}
      <button
        onClick={handleContinue}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default WordReadingScore;
