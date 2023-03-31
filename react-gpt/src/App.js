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
    const outputText = await generateOutputText(inputText);
    setOutputText(outputText);
  };

  const handleInputEnter = async (event) => {
    if(event.key === 'Enter') {
      const outputText = await generateOutputText(inputText);
      setOutputText(outputText);
    }
  };

  return (
    <div className="App">
      <h1>O Gênio</h1>
      <div>
        <input type="text" value={inputText} onChange={handleInputChange} placeholder="Peça ou pergunte o que desejar" onKeyUp={handleInputEnter}/>
        <button onClick={handleButtonClick}>Enviar</button>
      </div>
      <div className='output-text'>
     {outputText.split('\n').map(str =>  <p key={str.length}>{str} </p>)}
      </div>
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