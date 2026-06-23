export function getSentiment(text) {
  const lowerText = text.toLowerCase();

  const positiveWords = ["good", "great", "happy", "excellent", "positive", "success"];
  const negativeWords = ["bad", "sad", "worst", "poor", "negative", "fail"];

  const isPositive = positiveWords.some(word => lowerText.includes(word));
  const isNegative = negativeWords.some(word => lowerText.includes(word));

  if (isPositive && !isNegative) return "Positive";
  if (isNegative && !isPositive) return "Negative";
  return "Neutral";
}