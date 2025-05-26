import 'dotenv/config';
export async function getAIPrediction({
  symbol,
  timeframe,
  confidence,
  technicalIndicators,
  sentimentAnalysis,
}: {
  symbol: string;
  timeframe: string;
  confidence: number;
  technicalIndicators: boolean;
  sentimentAnalysis: boolean;
}): Promise<string> {
  try {
    // Replace with your actual AI API endpoint and key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a crypto prediction assistant." },
          {
            role: "user",
            content: `Predict the price trend for ${symbol} in the next ${timeframe}. Confidence threshold: ${confidence}%. Technical Indicators: ${technicalIndicators}. Sentiment Analysis: ${sentimentAnalysis}.`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No prediction available.";
  } catch (error) {
    return "No prediction available.";
  }
}