// An HTML div element contains a list of the most endangered species for each continent.
// <div>
// <ul>
// ‹li data-continent="North
// America">California condor</li>
// ‹li data-continent="Europe">Cave
// bear</li>
// </ul>
// </div>
// Implement the function endangeredSpecies that returns the species's name for a particular continent.
// For example, endangeredSpecies ("North America") should return "California condor".

function endangeredSpecies(continent) {
  // Your code goes here
  let dataContinent = document.querySelector(`li[data-continent="${continent}"]`);
    
  return dataContinent ? dataContinent.textContent : null;
}

// Example case
document.body.innerHTML =
`<div>
    <ul>
        <li data-continent="North America">California condor</li>
        <li data-continent="Europe">Cave bear</li>
    </ul>
</div>`;

console.log(endangeredSpecies("North America")); // should print 'California condor'