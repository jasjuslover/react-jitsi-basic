import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
  };

  const startMeeting = () => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "1beb4680",
      height: 400,
      parentNode: document.getElementById("jitsi-container"),
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListener("videoConferenceJoined", () => {
      console.log("Local User Joined");
      setLoading(false);
      api.executeCommand("displayName", "MyName");
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    // script.onload = () => startMeeting();
    document.body.appendChild(script);

    // if (window.JitsiMeetExternalAPI) startMeeting();
    // else alert("Jitsi Meet API script not loaded");
  }, []);

  return (
    <div className="App">
      <div style={containerStyle}>
        <div id="jitsi-container" style={jitsiContainerStyle} />
      </div>
    </div>
  );
}

export default App;
