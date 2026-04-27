// An RPG game lets you assign points to the strength and speed attributes of your character. 
// The video below shows how 5 points are supposed to be assigned. Character stats: 2 points 0 + Strength 3 + Speed 
// The available points are passed in the totalPoints parameter to initialize the Ul. 
// Complete the initialize function so that the Ul behaves as shown in the video. When initialized, all points should be available, 
// and both attributes should start at 0

function initialize(totalPoints) {
  let strength = 0;
  let speed = 0;
  let remainingPoints = totalPoints;

  const pointsElement = document.getElementById('points');

  const strengthInput = document.getElementById('strength');
  const strengthPlus = document.getElementById('strength-plus');
  const strengthMinus = document.getElementById('strength-minus');

  const speedInput = document.getElementById('speed');
  const speedPlus = document.getElementById('speed-plus');
  const speedMinus = document.getElementById('speed-minus');

  function updateUI() {
    pointsElement.textContent = remainingPoints;
    strengthInput.value = strength;
    speedInput.value = speed;
  }

  // Strength +
  strengthPlus.addEventListener('click', () => {
    if (remainingPoints > 0) {
      strength += 1;
      remainingPoints -= 1;
      updateUI();
    }
  });

  // Strength -
  strengthMinus.addEventListener('click', () => {
    if (strength > 0) {
      strength -= 1;
      remainingPoints += 1;
      updateUI();
    }
  });

  // Speed +
  speedPlus.addEventListener('click', () => {
    if (remainingPoints > 0) {
      speed += 1;
      remainingPoints -= 1;
      updateUI();
    }
  });

  // Speed -
  speedMinus.addEventListener('click', () => {
    if (speed > 0) {
      speed -= 1;
      remainingPoints += 1;
      updateUI();
    }
  });

  updateUI();
}

// Do not modify the HTML below
document.body.innerHTML = `
  <div>
    Character stats: <span id="points">0</span> points
    <div>
      <button id="strength-minus">-</button>
      <input
        type="number"
        id="strength"
        step="1"
        style="width: 50px; text-align: center;"
        readonly
      />
      <button id="strength-plus">+</button>
      Strength
    </div>
    <div>
      <button id="speed-minus">-</button>
      <input
        type="number"
        id="speed"
        step="1"
        style="width: 50px; text-align: center;"
        readonly
      />
      <button id="speed-plus">+</button>
      Speed
    </div>
  </div>
`;

initialize(5);

//Example as shown in the video: Wrong answer
// Assigning up to total points: Correct answer
// Assigning beyond total points: Wrong answer



function initialize(totalPoints) {
  let strength = 0;
  let speed = 0;
  let remainingPoints = totalPoints;

  const pointsElement = document.getElementById('points');

  const strengthInput = document.getElementById('strength');
  const strengthPlus = document.getElementById('strength-plus');
  const strengthMinus = document.getElementById('strength-minus');

  const speedInput = document.getElementById('speed');
  const speedPlus = document.getElementById('speed-plus');
  const speedMinus = document.getElementById('speed-minus');

  function setInputValue(input, value) {
    input.value = value;
    input.setAttribute('value', value);
  }

  function updateUI() {
    pointsElement.textContent = remainingPoints;

    setInputValue(strengthInput, strength);
    setInputValue(speedInput, speed);
  }

  strengthPlus.onclick = function () {
    if (remainingPoints > 0) {
      strength++;
      remainingPoints--;
      updateUI();
    }
  };

  strengthMinus.onclick = function () {
    if (strength > 0) {
      strength--;
      remainingPoints++;
      updateUI();
    }
  };

  speedPlus.onclick = function () {
    if (remainingPoints > 0) {
      speed++;
      remainingPoints--;
      updateUI();
    }
  };

  speedMinus.onclick = function () {
    if (speed > 0) {
      speed--;
      remainingPoints++;
      updateUI();
    }
  };

  updateUI();
}

// Do not modify the HTML below
document.body.innerHTML = `
  <div>
    Character stats: <span id="points">0</span> points
    <div>
      <button id="strength-minus">-</button>
      <input
        type="number"
        id="strength"
        step="1"
        style="width: 50px; text-align: center;"
        readonly
      />
      <button id="strength-plus">+</button>
      Strength
    </div>
    <div>
      <button id="speed-minus">-</button>
      <input
        type="number"
        id="speed"
        step="1"
        style="width: 50px; text-align: center;"
        readonly
      />
      <button id="speed-plus">+</button>
      Speed
    </div>
  </div>
`;

initialize(5);