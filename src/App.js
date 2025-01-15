import "./App.css";
import axios from "axios";
import { useState, useRef } from "react";

function App() {
  const [downloadLink, setDownloadLink] = useState(null);
  const urlInput = useRef(null);

  const handleDownload = async () => {
    const url = urlInput.current.value;
    if (!url) {
      alert("Please provide a valid URL");
      return;
    }

    const options = {
      method: "GET",
      url: "https://spotify-downloader9.p.rapidapi.com/downloadSong",
      params: { songId: url },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setDownloadLink(response.data.downloadLink);

      // Automatic download trigger
      const anchor = document.createElement("a");
      anchor.href = response.data.downloadLink;
      anchor.download = "Spotify_Song.mp3"; // Customize file name
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Error downloading the song:", error);
      alert(
        "Failed to download the song. Please check the URL or API response."
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight mb-6">
          Spotify Song Downloader
        </h1>

        <div className="flex items-center rounded-md bg-white space-x-1 outline outline-1 outline-gray-400">
          <input
            type="text"
            ref={urlInput}
            className="min-w-0 flex-grow py-2 px-3 text-base text-gray-900 focus:outline-none sm:text-sm"
            placeholder="Enter Spotify URL"
          />
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
