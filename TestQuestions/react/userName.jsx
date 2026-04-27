import React, { useState }from 'react';
import { createRoot } from 'react-dom/client';

const Username = ({ value }) => {
  return <h1>{value}</h1>;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");

  function clickHandler() {
    setUsername(inputValue);
  }

  return (
    <div>
      <button onClick={clickHandler}>Change Username</button>
      <input type="text" value= {inputValue}onChange={(e)=> setInputValue(e.target.value)}/>
      <Username value={username}/>
    </div>
  );
}

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));
root.render(<App />);