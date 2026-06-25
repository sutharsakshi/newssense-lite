export default function ResultCard({ result, loading }) {
  if (loading) return <p>Processing article...</p>;
  if (!result) return <p>Results will appear here...</p>;

  if (loading) {
    return (
      <div style={styles.loadingBox}>
        <div className="spinner"></div>

        <p style={styles.loadingText}>
          AI is analyzing the news...
        </p>
      </div>
    );
  }

  if (!result) {
    return <p style={styles.empty}>No analysis yet.</p>;
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Analysis Result</h2>

      <div style={styles.section}>
        <h3>Sentiment</h3>
        <p>{result.sentiment.label}</p>
        <p>Confidence: {result.sentiment.score}</p>
      </div>

      <div style={styles.section}>
        <h3>Category</h3>
        <p>{result.category}</p>
      </div>

      <div style={styles.section}>
        <h3>Summary</h3>
        <p>{result.summary}</p>
      </div>

      <div style={styles.section}>
        <h3>Keywords</h3>

        <div style={styles.keywordContainer}>
          {result.keywords?.map((word, index) => (
            <span key={index} style={styles.keyword}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3>Entities</h3>

        <div style={styles.entityContainer}>
          {result.entities?.map((entity, index) => (
            <span key={index} style={styles.entity}>
              {entity.text} ({entity.label})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#111827",
    padding: "24px",
    borderRadius: "16px",
    marginTop: "20px",
    color: "white",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)"
  },

  heading: {
    marginBottom: "20px"
  },

  section: {
    marginBottom: "24px"
  },

  keywordContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  keyword: {
    background: "#2563eb",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px"
  },

  entityContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  entity: {
    background: "#1e293b",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px"
  },

  loading: {
    marginTop: "20px",
    color: "#94a3b8"
  },

  empty: {
    marginTop: "20px",
    color: "#94a3b8"
  },

  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px"
  },

  loadingText: {
    marginTop: "16px",
    color: "#94a3b8",
    fontSize: "16px"
  },
};