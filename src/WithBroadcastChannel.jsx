import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./App.css";

function WithBroadcastChannel() {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [microphoneStarted, setMicrophoneStarted] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "voiceToTextStatus") {
        if (event.newValue === "start" && !microphoneStarted) {
          handleStartListening();
        } else if (event.newValue === "stopAll") {
          handleStopListening();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [microphoneStarted]);

  useEffect(() => {
    const handleError = (error) => {
      console.error("Speech Recognition Error:", error);
      // Automatically stop the microphone when an error occurs
      handleStopListening();
    };

    SpeechRecognition.onEnd = () => {
      // Reset transcript when recognition ends
      resetTranscript();
    };

    SpeechRecognition.onError = handleError;

    return () => {
      SpeechRecognition.onEnd = null;
      SpeechRecognition.onError = null;
    };
  }, [resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>The Browser does not support Voice recognition</span>;
  }

  function handleStartListening() {
    if (!microphoneStarted) {
      localStorage.setItem("voiceToTextStatus", "start");
      SpeechRecognition.startListening({ continuous: true, language: "en-us" });
      setMicrophoneStarted(true);
    }
  }

  function handleStopListening() {
    SpeechRecognition.stopListening();
    localStorage.setItem("voiceToTextStatus", "stopAll");
    setMicrophoneStarted(false);
  }

  return (
    <div className="container">
      <h2>Speech To Text Converter</h2>
      <br />
      <p>
        A React hook that converts speech from the microphone to text and makes
        it available to your React components.
      </p>
      <div className="main-content">{transcript}</div>
      <div className="btn-style">
        <button onClick={handleStartListening} disabled={microphoneStarted}>
          Start Listening
        </button>
        <button onClick={handleStopListening}>Stop Listening</button>
      </div>
    </div>
  );
}

export default WithBroadcastChannel;
