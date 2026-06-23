import "../styles/app.css";

export default function TextInput({ value, setValue, onAnalyze, loading, mode }) {
    return (
        <div>
            <textarea
                className="news-input"
                placeholder={
                    mode === "text"
                        ? "Paste news text here..."
                        : "Paste news URL here..."
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button
                className="analyze-btn"
                onClick={onAnalyze}
                disabled={loading}
            >
                {loading ? "Analyzing..." : "Analyze"}
            </button>
        </div>
    );
}
