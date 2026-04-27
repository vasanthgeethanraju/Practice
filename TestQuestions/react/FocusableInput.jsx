// Finish the Focusablelnput component so that the input element automatically receives focus on the first render if the shouldFocus prop is true.

import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const FocusableInput = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // 👈 important: only on first render

  return <input ref={inputRef} />;
};

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));
root.render(<FocusableInput shouldFocus={true} />);
setTimeout(() => console.log(document.getElementById("root").innerHTML), 300);