export function generateSummary(text) {
  if (!text) return "";

  const sentences = text.split(".").filter(s => s.trim().length > 20);

  return sentences.slice(0, 2).join(". ") + ".";
}