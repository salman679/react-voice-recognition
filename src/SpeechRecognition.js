// SpeechRecognition.js
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionComponent = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListeningHandler = () => {
    SpeechRecognition.startListening();
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <h2>Speech Recognition Example</h2>
      <button onClick={startListeningHandler}>Start Listening</button>
      <button onClick={stopListeningHandler}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
