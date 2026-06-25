from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from newspaper import Article
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
import spacy
import os
import yake

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("vader_lexicon")

nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)

sia = SentimentIntensityAnalyzer()

# -------------------------
# NLP FUNCTIONS
# -------------------------


def extract_article_from_url(url):
    article = Article(url)
    article.download()
    article.parse()
    return article.text

def extract_keywords(text):

    kw_extractor = yake.KeywordExtractor(
        lan="en",
        n=2,
        dedupLim=0.7,
        top=5
    )

    keywords = kw_extractor.extract_keywords(text)

    cleaned_keywords = [kw[0] for kw in keywords]

    return cleaned_keywords

def summarize_text(text, sentence_count=3):

    parser = PlaintextParser.from_string(
        text,
        Tokenizer("english")
    )

    summarizer = LsaSummarizer()

    summary = summarizer(
        parser.document,
        sentence_count
    )

    return " ".join(
        str(sentence)
        for sentence in summary
    )

def analyze_sentiment(text):

    blob = TextBlob(text)

    polarity = blob.sentiment.polarity

    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {
        "label": sentiment,
        "score": round(polarity, 2)
    }
    

def classify_category(text):

    text = text.lower()

    if any(word in text for word in [
        "election", "government", "minister",
        "bjp", "congress", "parliament"
    ]):
        return "Politics"

    elif any(word in text for word in [
        "stock", "market", "economy",
        "business", "startup"
    ]):
        return "Business"

    elif any(word in text for word in [
        "cricket", "football", "sports",
        "olympics"
    ]):
        return "Sports"

    elif any(word in text for word in [
        "ai", "technology", "software",
        "google", "microsoft"
    ]):
        return "Technology"

    else:
        return "General"

def extract_entities(text):

    doc = nlp(text)

    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    return entities

# -------------------------
# API ROUTE
# -------------------------

@app.route("/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    
    data = request.json or {}
    text = data.get("text", "")
    url = data.get("url", "")

    if url.strip():
        text = extract_article_from_url(url)

    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = {
        "sentiment": analyze_sentiment(text),
        "keywords": extract_keywords(text),
        "summary": summarize_text(text),
        "category": classify_category(text),
        "entities": extract_entities(text)
    }

    return jsonify(result)


if __name__ == "__main__":
    if __name__ == "__main__":

        port = int(os.environ.get("PORT", 5000))

    app.run(host="0.0.0.0", port=port)