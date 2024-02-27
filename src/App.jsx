import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";

function App() {
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>The Browser does not support Voice recognition</span>;
  }

  function handleStartListening() {
    SpeechRecognition.startListening({ continuous: true, language: "en-us" });
  }

  function handleStopListening() {
    SpeechRecognition.stopListening();
  }

  return (
    <>
      <div className="container">
        <h2>Speech To Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>
        <div className="main-content">{transcript}</div>
        <div className="btn-style">
          <button onClick={handleStartListening}>Start Listening</button>
          <button onClick={handleStopListening}>Stop Listening</button>
        </div>
      </div>
    </>
  );
}

export default App;
