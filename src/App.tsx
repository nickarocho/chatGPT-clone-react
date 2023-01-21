import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const config = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(config);

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: "a very fat and fluffy cat wearing sunglasses on the beach",
      n: 1,
      size: "1024x1024",
    });

    console.log(response.data);
  };

  return (
    <div className="App">
      <h1>ChatGPT Clone</h1>
      <button onClick={generateImage}>Do the thing</button>
    </div>
  );
}

export default App;
