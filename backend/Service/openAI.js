import { configDotenv } from "dotenv";
configDotenv();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function openAI() {
    const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    "X-OpenRouter-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  },
  body: JSON.stringify({
    "model": "nvidia/llama-nemotron-embed-vl-1b-v2:free",
    "input": [
      {
        "content": [
          { "type": "text", "text": "What is in this image?" },
          { "type": "image_url", "image_url": { "url": "https://live.staticflickr.com/3851/14825276609_098cac593d_b.jpg" } }
        ]
      }
    ],
    "encoding_format": "float"
  })
});

const data = await response.json();
console.log(data.data[0].embedding.slice(0, 5));
return data;

};