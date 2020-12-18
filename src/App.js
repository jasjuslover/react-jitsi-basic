import { useEffect, useState } from "react";
import "./App.css";

/**
 *
 * Interviewer
 * ["microphone", "camera", "recording", "fullscreen", "hangup"]
 *
 * Candidate
 * ["microphone", "camera", "recording", "fullscreen"]
 *
 */

function App() {
  const [counter, setCounter] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const containerStyle = {
    width: "800px",
    height: "400px",
    position: "relative",
    alignSelf: "center",
  };

  const jitsiContainerStyle = {
    display: "block",
    width: "100%",
    height: "100%",
    zIndex: 2,
  };

  const timerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    background: "black",
    zIndex: 3,
    width: "100%",
    height: "100%",
  };

  const timerChildStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    fontSize: 24,
    color: "white",
  };

  const finishedConferenceCallStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    background: "black",
    zIndex: 3,
    width: "100%",
    height: "100%",
  };

  const finishedConferenceChildStyle = {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 24,
    color: "white",
  };

  const startMeeting = () => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "1beb4680",
      height: 400,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        email: "husnikamal3@gmail.com",
        displayName: "John Doe",
      },
      configOverwrite: {
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "recording", "fullscreen", "hangup"],
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListener("videoConferenceJoined", () => {
      console.log("Local User Joined");
      // setLoading(false);
      api.executeCommand("displayName", "MyName");
      api.executeCommand("toggleLobby", false);
    });

    api.addEventListener("participantLeft", () => {
      console.log("huwiw participantLeft");
      setIsFinished(true);
      api.dispose();
    });
  };

  useEffect(() => {
    const embedJitsi = () => {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.onload = () => startMeeting();
      document.body.appendChild(script);
    };

    setTimeout(() => {
      embedJitsi();
    }, 4000);

    setCounter(5);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setCounter(null);
    }

    if (!counter) return;

    const intervalId = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className="App">
      <div style={containerStyle}>
        <div id="jitsi-container" style={jitsiContainerStyle} />
        {counter > 0 && (
          <div style={timerStyle}>
            <div style={timerChildStyle}>{counter}</div>
          </div>
        )}
        {isFinished && (
          <div style={finishedConferenceCallStyle}>
            <div style={finishedConferenceChildStyle}>Conference Finished</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
