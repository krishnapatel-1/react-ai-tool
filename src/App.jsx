import { useState } from "react";
import "./App.css";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  
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
if(localStorage.getItem('history')){
  let history=JSON.parse(localStorage.getItem('history'))
  history=[question,...history]
  localStorage.setItem('history',JSON.stringify(history))
   setRecentHistory(history)
}
else {
  localStorage.setItem('history',JSON.stringify([question]))
  setRecentHistory([question])
}
    
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

    let datastring = response.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ");
    datastring = datastring.map((item) => item.trim());

    setResult([
      ...result,
      { type: "q", text: question },
      { type: "a", text: datastring },
    ]); // <- answer come here
  };

  console.log(result);
   
 const clearhistory=()=>{
  localStorage.clear();
  setRecentHistory([])
 }

  return (
    <div className="grid grid-cols-5 h-screen text-center ">
      <div className="col-span-1 bg-zinc-800  ">
         <h1 className="p-3 text-white text-xl flex text-center justify-center  ">
          <span>Recent Search</span>
<button  onClick={clearhistory} className="cursor-pointer"  ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>

         </h1>
<ul className="text-left overflow-auto">

  {
  recentHistory && recentHistory.map((item)=>(
    <li className="p-1 pl-4 truncate  text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-white  ">{ item } 
    </li>
    ))
  }
</ul>

      </div>

      <div className="col-span-4 p-1">
        <div className="container h-140 overflow-auto p-10">
          <div className="text-white">
            <ul>
              {
              result.map((item, ind) => (
                <div
                  key={ind + Math.random()}
                  className={item.type == "q" ? 'flex justify-end' : ""}
                >
                  {item.type == "q" ? (
                    <li
                      key={ind + Math.random()}
                      className=" text-right p-1 border-5 bg-zinc-700 border-zinc-700  rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    >
                      <Answer
                        ans={item.text}
                        type={item.type}
                        totalResult={1}
                        ind={ind}
                      />
                    </li>
                  ) : (
                    item.text.map((ansItem, ansInd) => (
                      <li
                        key={ansInd + Math.random()}
                        className="text-left p-3"
                      >
                        <Answer
                          ans={ansItem}
                          totalResult={item.length}
                          type={item.type}
                          ind={ansInd}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-800  w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-600 flex h-16">
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
