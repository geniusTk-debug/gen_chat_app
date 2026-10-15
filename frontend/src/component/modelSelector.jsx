import { useState } from 'react'
import './style/modelSelector.css'


export default function ModelSelector({ model, setModel }) {

  console.log(model, 'model in ModelSelector')
    
  const [ choosing, isChoosing ] = useState(false);

  const modelsSelectorHandler = (e) => {

        e.preventDefault();
        setModel(e.currentTarget.value)
        isChoosing(!choosing)
        
  }

  const allowedModels = [
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b",
    "qwen/qwen3.8-27b"
  ];

    return (
        <div className="model-selector-container">
        
              <div className="model-selector">{choosing ? 'Choose model' : 'Current model'} --
                
                <div className="model">{model}

                  <svg onClick={()=> isChoosing(!choosing)}
                    className='model-selector-btn'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={choosing ? "yellowGreen" : "currentColor"}>
                   <path d="M7 10l5 5 5-5H7z"/>
                 </svg>
                </div>

              </div>

          {choosing && (
            <ul className='ul'>
              {allowedModels.filter((m) => m !== model )
              .map((mo, i) => (
                <li className='li' key={i}>
                  <button
                    className="clickable-btn"
                    onClick={modelsSelectorHandler}
                    value={mo}
                  >
                    {mo}
                  </button>
                </li>
              ))
              }
            </ul>

          )}
        
        </div>
    )
}