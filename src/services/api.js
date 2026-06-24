export async function analyzeNews(input, mode = "text") {

  const body =
    mode === "url"
      ? { url: input }
      : { text: input };

  const response = await fetch(
    "https://newssense-lite-api.onrender.com/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
}