import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="App">
      <h1>React Voice Recognition</h1>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <div>
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
