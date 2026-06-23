export function extractKeywords(text) {
  const words = text
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(word => word.length > 4);

  return [...new Set(words)].slice(0, 5);
}