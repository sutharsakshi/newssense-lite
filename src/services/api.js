import { getSentiment } from "../utils/sentiment";
import { extractKeywords } from "../utils/keywords";
import { generateSummary } from "../utils/summary";

export async function analyzeNews(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const sentiment = getSentiment(text);
        const keywords = extractKeywords(text);
        const summary = generateSummary(text);

        resolve({
          sentiment,
          keywords,
          summary,
        });
      } catch (error) {
        reject("Analysis failed");
      }
    }, 1200);
  });
}