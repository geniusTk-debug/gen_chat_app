import { useState } from 'react'
import './style/modelSelector.css'


export default function ModelSelector() {
    const [ model, setModel ] = useState('openai/gpt-oss-20b');
    const [ choosing, isChoosing ] = useState(false);
const allowedModels = [
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b",
    "qwen/qwen3.8-27b"
];
    return (
        <>
        <div className="current-model">
            <span>Current Model: {model} </span>
        </div>
         <div className="model-selector">
          <button onClick={()=> isChoosing(!choosing)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 10l5 5 5-5H7z"/>
            </svg>
          </button>

          {choosing && (
            <ul>
              {allowedModels.map((model, i) => (
                <li key={i}>
                  <button
                    className="clickable-btn"
                    onClick={() => {
                      setModel(model);
                      isChoosing(false);
                    }}
                  >
                    {model}
                  </button>
                </li>
              ))}
            </ul>

          )}
        </div>
        </>
    )
}