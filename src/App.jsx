import { useState } from "react";
import TextInput from "./components/TextInput";
import ResultCard from "./components/ResultCard";
import { getSentiment } from "./utils/sentiment";
import { extractKeywords } from "./utils/keywords";
import { generateSummary } from "./utils/summary";
import { analyzeNews } from "./services/api";
import { processUrl } from "./utils/urlHandler";
import "./styles/app.css";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("text"); // text | url

  const analyzeText = async () => {
    if (!input.trim()) {
      alert("Please enter some text first");
      return;
    }

    if (mode === "url" && !input.startsWith("http")) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const content =
        mode === "url"
          ? processUrl(input)
          : input;

      const response = await fetch("https://newssense-lite-api.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">NewsSense Lite 🧠</h1>

      <div className="toggle-box">
        <button
          className={`toggle-btn ${mode === "text" ? "active" : ""}`}
          onClick={() => setMode("text")}
        >
          Text
        </button>

        <button
          className={`toggle-btn ${mode === "url" ? "active" : ""}`}
          onClick={() => setMode("url")}
        >
          URL
        </button>
      </div>

      <TextInput
        value={input}
        setValue={setInput}
        onAnalyze={analyzeText}
        loading={loading}
        mode={mode}
      />

      <div className="result-box">
        <ResultCard result={result} loading={loading} />
      </div>

      <div className="footer">
        <a
          href="https://digitalheroes.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="dh-button">
            Made for DigitalHeroes
          </button>
        </a>
      </div>

    </div>
  );
}

export default App;