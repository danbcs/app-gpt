import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
const API_URL = 'http://localhost:3003/generate';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    console.log(inputText);
    const outputText = await generateOutputText(inputText);
    setOutputText(outputText);
  };

  return (
    <div className="App">
      <h1>Gerador de histórias</h1>
      <div>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Enviar</button>
      </div>
      {outputText && <p>{outputText}</p>}
    </div>
  );
}

const generateOutputText = async (inputText) => {
  const response = await axios.get(API_URL, {
    params: {
      prompt: inputText,
    },
  });

  console.log(response.data.text);

  return response.data.text;
};

export default App;