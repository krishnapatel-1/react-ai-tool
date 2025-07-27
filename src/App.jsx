import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);
  const URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    response = await response.json();
    // console.log(response.candidates[0].content.parts[0].text);
    setResult(response.candidates[0].content.parts[0].text);
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 bg-zinc-800 h-screen"></div>

      <div className="col-span-4 p-10">
        <div className="container h-140 overflow-auto">
          <div className="text-white"> {result}</div>
        </div>
        <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-2xl border border-zinc-600 flex ">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
