function assignTeams(players, numTeams) {
  // Step 1: Sort players by their nickname
  players.sort((a, b) => a.nickname.localeCompare(b.nickname));

  // Step 2: Use reduce to distribute players into teams
  return players.reduce((teams, player, index) => {
    // Calculate the team index using modulo to cycle through teams
    const teamIndex = index % numTeams;
    
    teams[teamIndex] = teams[teamIndex] ?? [];

    // Assign player to the appropriate team
    teams[teamIndex].push(player);

    return teams;
  }, []); // Initialize empty teams array
}

// Example Input
let players = [ { nickname: "Alex" }, { nickname: "Mike" }, { nickname: "Alex" }, { nickname: "John" }, { nickname: "Mike" }, { nickname: "Alex" }, { nickname: "John" } ];

// Call function with desired number of teams
let numTeams = 2;
let result = assignTeams(players, numTeams);

// Output the teams
console.log(result);
