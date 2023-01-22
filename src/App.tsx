import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import dallEcat from "./assets/dallE-cat.png";

function App() {
  const [prompt, setPrompt] = useState("");
  const [generatedImageResultSrc, setGeneratedImageResultSrc] = useState<
    string | undefined
  >(undefined);

  const config = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(config);

  const generateImage = async () => {
    if (!prompt) {
      alert("Gotta add a prompt first...");
      return;
    }

    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      setGeneratedImageResultSrc(response.data.data[0].url);
    } catch (error) {
      console.error(
        "Something went wrong generating the image with OpenAI:",
        error
      );
    }
  };

  return (
    <div className="App">
      <h1>ChatGPT Clone</h1>
      <div className="app-main">
        <h2>Generate an image with AI</h2>
        <h4>
          Just add a prompt for anything you can possibly think of (literally
          anything...), and OpenAI's "DALL-E" will do the rest.
        </h4>
        <h3>Input 👇</h3>
        <input
          className="app-input"
          type="text"
          placeholder="A very fluffy cat wearing sunglasses on the beach, in the style of Salvador Dalí."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage}>Make AI Art</button>

        <div className="output-container">
          <h3>Output 👇</h3>
          <img
            className="result-image"
            src={
              !generatedImageResultSrc && !prompt
                ? dallEcat
                : generatedImageResultSrc
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default App;
