import React, { useState } from 'react';

function CharacterPoints({ totalPoints }) {
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);

  const availablePoints = totalPoints - (strength + speed);

  const increaseStrength = () => {
    setStrength(strength + 1);
    if(availablePoints === 0) {
    	setSpeed(speed - 1)
    }
  };

  const decreaseStrength = () => {
    if (strength > 0) {
      setStrength(strength - 1);
    }
  };

  const increaseSpeed = () => {
    setSpeed(speed + 1);
    if (availablePoints === 0) {
      setStrength(strength - 1);
    }
  };

  const decreaseSpeed = () => {
    if (speed > 0) {
      setSpeed(speed - 1);
    }
  }

  return (
    <div>
      Character stats: <span>{availablePoints}</span> points
      <div>
        <button onClick={decreaseStrength}>-</button>
        <input
          type="number"
          step="1"
          value={strength}
          style={{width: "50px", textAlign: "center"}}
          readOnly
        />
        <button
          onClick={increaseStrength}
        >+</button>
        Strength
      </div>
      <div>
        <button onClick={decreaseSpeed}>-</button>
        <input
          type="number"
          step="1"
          value={speed}
          style={{width: "50px", textAlign: "center"}}
          readOnly
        />
        <button onClick={increaseSpeed}>+</button>
        Speed
      </div>
    </div>
  );
}