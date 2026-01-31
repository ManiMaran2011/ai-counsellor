export async function enhanceWithGemini(
  text: string
): Promise<string> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) return text;

    const data = await res.json();
    return data.text || text;
  } catch {
    return text; // graceful fallback
  }
}
